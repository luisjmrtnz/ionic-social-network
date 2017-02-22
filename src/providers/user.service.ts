import { Injectable } from '@angular/core';
import { AngularFire  } from 'angularfire2';

@Injectable()

export class UserService {
    constructor(
        private af: AngularFire ){}
        
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

}