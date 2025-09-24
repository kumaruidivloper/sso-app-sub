import { Injectable } from '@angular/core';
import { Subject, Observable, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface PostMessage {
  type: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class PostMessageService {
  private messagesSubject = new Subject<PostMessage>();

  constructor() {
    // Listen for incoming messages
    fromEvent<MessageEvent>(window, 'message')
      .pipe(
        filter(event => this.isValidMessage(event)),
        map(event => event.data)
      )
      .subscribe(data => {
        this.messagesSubject.next(data);
      });
  }

  get messages$(): Observable<PostMessage> {
    return this.messagesSubject.asObservable();
  }

  sendMessage(message: PostMessage) {
    // Send message to parent window (opener)
    if (window.opener) {
      window.opener.postMessage(message, 'http://localhost:4200');
    }
  }

  private isValidMessage(event: MessageEvent): boolean {
    // Add origin validation for security
    const allowedOrigins = ['http://localhost:4200', 'http://localhost:4201'];
    return allowedOrigins.includes(event.origin);
  }
}