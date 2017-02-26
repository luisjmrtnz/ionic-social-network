import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform} from 'ionic-angular';


/* Services */
import { SocialService } from '../../providers/social.service';
import { UtilService } from '../../providers/util.service';
/*
  Generated class for the Post page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
  
  postContent: string;
  user;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public platform: Platform,
    public socialService: SocialService,
    public util: UtilService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
    this.user = this.navParams.get('user');
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  sendPost() {
    this.socialService.sendPost(this.postContent)
      .subscribe(() => {
        this.viewCtrl.dismiss();
        this.util.getToast('Your post has been successfully created!', 'success').present();
      }, err => {
        this.util.getToast(err, 'error').present();
      });
  }

}
