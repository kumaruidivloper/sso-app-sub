import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { PostMessageService } from './services/post-message.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  isConnectedToMain = false;
  isLoggedIn = false;
  userInfo: any = null;
  communicationLogs: string[] = [];
  
  private postMessageService = inject(PostMessageService);
  private authService = inject(AuthService);

  ngOnInit() {
    // Check for existing authentication
    this.checkCookieAuth();
    
    // Listen for messages from main application
    this.postMessageService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => {
        this.handleMessage(message);
      });

    // Notify main application that sub-app is ready
    this.notifyMainAppReady();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  requestAuthStatus() {
    this.postMessageService.sendMessage({
      type: 'REQUEST_AUTH_STATUS',
      timestamp: new Date().toISOString()
    });
    this.addLog('Sub app: Requesting auth status from main app');
  }

  performAction() {
    if (this.isLoggedIn) {
      this.addLog('Sub app: Performing authenticated action');
      // Perform some authenticated action
      alert('Authenticated action performed successfully!');
    }
  }

  private notifyMainAppReady() {
    // Try to notify main app every 1 second until connected
    const interval = setInterval(() => {
      if (!this.isConnectedToMain) {
        this.postMessageService.sendMessage({
          type: 'SUB_APP_READY',
          timestamp: new Date().toISOString()
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    // Stop trying after 30 seconds
    setTimeout(() => clearInterval(interval), 30000);
  }

  private checkCookieAuth() {
    const authToken = this.authService.getAuthTokenFromCookie();
    if (authToken) {
      this.addLog('Sub app: Found auth token in cookie');
      // In a real app, you would validate the token with your backend
      // For demo purposes, we'll just mark as potentially authenticated
    }
  }

  private handleMessage(message: any) {
    this.isConnectedToMain = true;
    
    switch (message.type) {
      case 'AUTH_STATUS':
        this.addLog('Main app: Received auth status');
        this.isLoggedIn = message.isLoggedIn;
        this.userInfo = message.userInfo;
        if (this.isLoggedIn) {
          this.addLog(`Sub app: Authenticated as ${this.userInfo?.name}`);
        }
        break;
        
      case 'LOGOUT':
        this.addLog('Main app: User logged out');
        this.isLoggedIn = false;
        this.userInfo = null;
        break;
        
      default:
        this.addLog(`Received unknown message: ${message.type}`);
    }
  }

  private addLog(message: string) {
    this.communicationLogs.unshift(`${new Date().toLocaleTimeString()}: ${message}`);
    if (this.communicationLogs.length > 10) {
      this.communicationLogs = this.communicationLogs.slice(0, 10);
    }
  }
}
