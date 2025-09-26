import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit, OnDestroy {
   message = signal<any>('Waiting for message... from App1');
   counter = signal<number>(0);

  constructor() {}

  ngOnInit() {
    window.addEventListener('message', this.handleMessage);
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage = (event: MessageEvent) => {
    const expectedPath = '/sso-app-main/';
    if (event.origin + expectedPath !== 'https://kumaruidivloper.github.io/sso-app-main/') return; // ✅ security check
    if (event.data?.type === 'GREETING_FROM_APP1') {
        this.message.set(event.data);
        console.log('Message received in App2:', event.data);
        this.conterHandler(event.data.process)
    }
  };

  sendMessageToApp1(value: any) {
  window.opener?.postMessage(
    { type: 'GREETING_FROM_APP2', payload: 'Hello back from App2!', process: value },
    'https://kumaruidivloper.github.io/sso-app-main/'
  );
}

conterHandler(value: any) {
  if(value === 'minus') {
    this.counter.set(this.counter() - 1);
  } else if(value === 'pluse') {
    this.counter.set(this.counter() + 1);
  }
}

incrementApp1(value: any) {
    this.sendMessageToApp1(value);
}

decrementApp1(value: any) {
  this.sendMessageToApp1(value);
}
}
