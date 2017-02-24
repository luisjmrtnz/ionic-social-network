import { Injectable } from '@angular/core';
import { AngularFire  } from 'angularfire2';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';


@Injectable()

export class UserService {
    constructor(
        private af: AngularFire,
        private auth: AuthService ){}
        
    getUser(uid: string) {
        return this.af.database.object(`/users/${uid}`);
    }

    searchUser(username) {
        let query = {
          orderByChild: 'username'
        };
        // username is given
        if(username) {
          query['equalTo'] = username;
        }
        let users = this.af.database.list('/users', {
          query: query
        });
        return users;
   }
   
   updateProfile(user) {
       return this.auth.getAuth()
        .map(authInfo => authInfo.auth.uid)
        .switchMap( uid => this.updateUser(user, uid));
   }
   
   updateUser(user, uid) {
       let newUser = { name: user.name, about: user.about };
       return this.af.database.object(`/users/${uid}`).update(newUser);
   }

}