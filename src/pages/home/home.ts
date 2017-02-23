import { Component } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { NavController, ModalController } from 'ionic-angular';

import { PostPage } from '../post/post';
/* Services */
import { AuthService } from '../../providers/auth.service';
import { SocialService } from '../../providers/social.service';

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
    public auth: AuthService) {}
    
  ionViewDidLoad() {
    this.feeds = this.auth.getAuth()
      .filter(userInfo => userInfo !== null)
      .map(userInfo => userInfo.auth.uid)
      .switchMap(uid => this.social.getFeed(uid));
  }
  
  openPost() {
    let modal = this.modalCtrl.create(PostPage);
    modal.present();
  }
}
