import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

import { PostPage } from '../post/post';
/* Services */
import { SocialService } from '../../providers/social.service';
import { UserService } from '../../providers/user.service';
import { UtilService } from '../../providers/util.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  feeds;
  
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public social: SocialService,
    public userService: UserService,
    public util: UtilService) {}
    
  ionViewDidLoad() {
    this.feeds = this.social.getFeed();
  }
  
  openPost() {
    this.userService.getThisUser().take(1).subscribe(user => {
      let modal = this.modalCtrl.create(PostPage, { user: user } );
      modal.present();
    });
  }
}
