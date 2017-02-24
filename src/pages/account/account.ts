import { Component } from '@angular/core';
import { 
  NavController, 
  NavParams, 
  AlertController, 
  Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

/* Services */
import { AuthService } from '../../providers/auth.service';
import { UserService } from '../../providers/user.service';
import { UtilService } from '../../providers/util.service';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthService,
    public userService: UserService,
    public alertCtrl: AlertController,
    public util: UtilService,
    public platform: Platform) {}

  ionViewDidLoad() {
    this.util.initLoader().present();
  
    this.auth.getAuth()
      .filter(userInfo => userInfo != null)
      .map(userInfo => userInfo.auth.uid)
      .switchMap(uid => this.userService.getUser(uid))
      .subscribe(user => { 
        this.user = user;
        this.util.dismissLoader();
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
  
  updateProfile() {
    this.userService.updateProfile(this.user)
      .subscribe(value => console.log(`updated ${value}`), err => console.log(err));
  }
  
}
