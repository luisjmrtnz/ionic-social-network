import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { AuthService } from '../providers/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: Component;
  
  constructor(
    platform: Platform,
    public auth: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.auth.getAuth().subscribe((userInfo) => {
        this.rootPage = (userInfo) ? TabsPage : LoginPage;
      });
    });
  }
  
}
  

