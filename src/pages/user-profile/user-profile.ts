import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

import { UserService } from '../../providers/user.service';
import { SocialService } from '../../providers/social.service';
import { UtilService } from '../../providers/util.service';


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
  loggedID;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService,
    public socialService: SocialService,
    public util: UtilService) {}

  ionViewDidLoad() {
    let uid = this.navParams.get('uid');
    
    this.userService.getUser(uid)
        .do(user => this.user = user)
        .switchMap(() => this.userService.getThisUser())
        .subscribe(user => this.loggedID = user.$key );
  }
  
  followUser() {
    this.socialService.followUser(this.user)
      .take(1).subscribe(() => {
        this.util.getToast(`You have successfully followed ${this.user.username}`, 'success').present();
      });
  }
  
  isFollowed() {
    if(this.user.followers) {
      let followers = this.user.followers;
      let isFollowed = (this.loggedID in followers) ? true : false;
      return isFollowed;
    } else {
      return false;
    }
  }
  
  unFollowUser(user) {
    this.socialService.unFollowUser(this.user)
      .take(1).subscribe(() => {
        this.util.getToast(`You have successfully unfollowed ${this.user.username}`, 'success').present();
      });
  }

}
