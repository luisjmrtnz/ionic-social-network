import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { PostPage } from '../post/post';
/* Services */
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
    public social: SocialService) {}
    
  ionViewDidLoad() {
    this.feeds = this.social.getFeed();
  }
  
  openPost() {
    let modal = this.modalCtrl.create(PostPage);
    modal.present();
  }
}
