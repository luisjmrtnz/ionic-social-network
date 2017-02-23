import { Component } from '@angular/core';
import { 
  NavController, 
  NavParams, 
  AlertController, 
  LoadingController,
  Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

/* Services */
import { AuthService } from '../../providers/auth.service';
import { UserService } from '../../providers/user.service';

/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  user = { name: '', about: ''};
  loader;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthService,
    public userService: UserService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public platform: Platform) {}

  ionViewDidLoad() {
    this.initLoader();
    this.presentLoader();
  
    this.auth.getAuth()
      .filter(userInfo => userInfo != null)
      .map(userInfo => userInfo.auth.uid)
      .switchMap(uid => this.userService.getUser(uid))
      .subscribe(user => { 
        this.user = user;
        this.closeLoader();
      });
  }
  
  logout() {
    this.auth.logout().then(() => {
      let alert = this.alertCtrl.create({
        title: 'See you soon!',
        subTitle: 'I hope you had had a great time in our app!',
        buttons: ['OK']
      });
      alert.present();
    });
  }
  
  initLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3000,
      dismissOnPageChange: true
    });
  }
  
  presentLoader() {
    this.loader.present();
  }
  
  closeLoader(){
    this.loader.dismiss();
  }
  
}
