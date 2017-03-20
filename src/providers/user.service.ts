import { Injectable } from '@angular/core';
import { AngularFire  } from 'angularfire2';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
import { UtilService } from './util.service';


@Injectable()

export class UserService {
    constructor(
        private af: AngularFire,
        private auth: AuthService,
        private util: UtilService){}
        
    getUser(uid: string) {
        return this.af.database.object(`/users/${uid}`);
    }
    
    getThisUser() {
        return this.auth.getAuth()
            .filter(authInfo => authInfo !== null)
            .map( authInfo => authInfo.auth.uid)
            .flatMap( uid => this.getUser(uid));
    }

    searchUser(username) {
        let query = {
          orderByChild: 'username',
          limitToFirst: 10
        };
        // username is given
        if(username) {
          query['startAt'] = username;
          query['endAt'] = `${username}\uf8ff`;
        }
        let users = this.af.database.list('/users', {
          query: query
        });
        return users;
   }
   
   isUserFree(username) {
       let query = {
           orderByChild: 'username',
           equalTo: username,
           limitToFirst: 10
       }
       
       let users = this.af.database.list('/users', { query: query })
            .take(1)
            .filter(users => {
                if(users.length > 0) {
                    this.presentToast('This username is already taken!', 'error');
                } else {
                    return true;
                }
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
   
   presentToast(msg, msgClass) {
     this.util.getToast(msg, msgClass).present();
   }
   
   createUser(userData) {
    return this.auth.getAuth()
            .filter(authInfo => authInfo !== null)
            .map( authInfo => authInfo.auth.uid)
            .switchMap( uid => {
               let url = `/users/${uid}`;
               let user = this.af.database.object(url);
               return user.set(userData);
            });
   }
   
}