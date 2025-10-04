import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  typeOfcommunication!: string;
  size: any;

  sendMessageToApp1(value: any) {
    if(this.typeOfcommunication === 'tab') {
      window.opener?.postMessage(
      { type: 'GREETING_FROM_APP2', payload: 'Hello back from App2!', process: value },
      'http://localhost:4200'
      // 'https://kumaruidivloper.github.io/sso-app-main/'
      
    );
    } else {
      window.parent.postMessage({ type: 'FORM_SIZE', payload: 'Hello back from App2!', process: value, iframeSize: this.size}, 'http://localhost:4200');
    }
    
  }

  appType(value: any, size: any) {
    if(value) {
      this.typeOfcommunication = 'iframe';
      this.size = size;
    } else {
      this.typeOfcommunication = 'tab'
    }
  }
  
  
}
