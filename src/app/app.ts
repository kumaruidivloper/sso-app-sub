import { Component, OnInit, OnDestroy, inject, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { SharedService } from './services/shared-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit, OnDestroy {
   message = signal<any>('Waiting for message... from App1');
   counter = signal<number>(0);
   @ViewChild('myAppSize') myAppSize!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    public sharedService: SharedService
  ) {
    
  }

  ngOnInit() {
    window.addEventListener('message', this.handleMessage);
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage = (event: MessageEvent) => {
    const expectedPath = '/sso-app-main/';
  // if (event.origin + expectedPath  !== 'https://kumaruidivloper.github.io/sso-app-main/') return;
    if (event.origin !== 'http://localhost:4200') return; // ✅ security check
    if (event.data?.type === 'GREETING_FROM_APP1') {
        this.message.set(event.data);
        console.log('Message received in App2:', event.data);
        this.conterHandler(event.data.process)
        if(event.data.process === 'first' ||  event.data.process === 'second' || event.data.process === 'third') {
          this.openForms(event.data.process);
           setTimeout(() => {
          this.windowSize(event.data.process);
           },400)
        }
        if(event.data.typeOfComm === '2') {
          setTimeout(() => {
            this.windowSize(null);
            this.sharedService.appType(event.data.resize, this.myAppSize.nativeElement.scrollHeight);
          }, 400)
        }
    }
  };

  windowSize(value: any) {
    window.parent.postMessage({ type: 'FORM_SIZE', payload: 'Hello back from App2!', process: value, iframeSize: this.myAppSize.nativeElement.scrollHeight}, 'http://localhost:4200');
  }

conterHandler(value: any) {
  if(value === 'minus') {
    this.counter.set(this.counter() - 1);
  } else if(value === 'pluse') {
    this.counter.set(this.counter() + 1);
  }
}

openForms(value:any) {
  this.router.navigate(['/'+value]);
}

incrementApp1(value: any) {
    this.sharedService.sendMessageToApp1(value);
    this.windowSize('pluse')
}

decrementApp1(value: any) {
  this.sharedService.sendMessageToApp1(value);
  this.windowSize('minus')
}
}
