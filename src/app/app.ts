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
    if (event.origin !== 'http://localhost:4200') return; // ✅ security check
    if (event.data?.type === 'GREETING_FROM_APP1') {
        this.message.set(event.data);
        console.log('Message received in App2:', event.data);
        this.counter.set(this.counter() + 1);
    }
  };

  sendMessageToApp1() {
  window.opener?.postMessage(
    { type: 'GREETING_FROM_APP2', payload: 'Hello back from App2!' },
    'http://localhost:4200'
  );
}
}
