import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from '../../providers/user.service';

/*
  Generated class for the UserProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {

  user;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService) {}

  ionViewDidLoad() {
    let uid = this.navParams.get('uid');
    this.user = this.userService.getUser(uid);
  }

}
