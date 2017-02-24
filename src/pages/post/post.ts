import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform} from 'ionic-angular';

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
    public platform: Platform) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
    this.user = this.navParams.get('user');
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
