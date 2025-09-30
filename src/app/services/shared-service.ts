import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  sendMessageToApp1(value: any) {
    window.opener?.postMessage(
      { type: 'GREETING_FROM_APP2', payload: 'Hello back from App2!', process: value },
      'http://localhost:4200'
    );
  }
  
}
