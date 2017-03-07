import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
  currentUser;
  searchUserStream;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userService: UserService) {
      this.searchUserStream = new BehaviorSubject("");
    }

  ionViewDidLoad() {
    this.userService.getThisUser().take(1)
      .subscribe(user => this.currentUser = user);
    this.users = this.searchUserStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((user: string) => this.userService.searchUser(user));
  }
  
  userProfile(user, itemSliding: ItemSliding) {
    itemSliding.close();
    this.navCtrl.push(UserProfilePage, { uid: user.$key});
  }
  
  search($event) {
    let username = $event.target.value;
    this.searchUserStream.next(username);
  }
  
  isThisUser($key) {
    return (this.currentUser.$key === $key) ? true : false;
  }
  
}
