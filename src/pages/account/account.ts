import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

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
  user;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthService,
    public userService: UserService) {}

  ionViewDidLoad() {
    this.auth.getAuth()
      .map(userInfo => userInfo.auth.uid)
      .subscribe((uid) => console.log(uid));
  }

}
