import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable()

export class UserService {
    constructor(
        private af: AngularFire,
        private authService: AuthService){}
        
    getUser(uid: string) {
        return this.af.database.object(`/users/${uid}`);
    }

}