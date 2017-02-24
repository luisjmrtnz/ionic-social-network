import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';

import { UserService } from '../../providers/user.service';
import { UserProfilePage } from '../user-profile/user-profile';

/*
  Generated class for the People page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-people',
  templateUrl: 'people.html'
})
export class PeoplePage {
  
  users;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userService: UserService) {}

  ionViewDidLoad() {
    this.users = this.userService.searchUser("");
  }
  
  userProfile(user, itemSliding: ItemSliding) {
    itemSliding.close();
    this.navCtrl.push(UserProfilePage, { uid: user.$key});
  }

}
