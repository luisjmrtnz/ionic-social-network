import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { AuthService } from './auth.service';


@Injectable()

export class SocialService {
    constructor(
        private af: AngularFire,
        private auth: AuthService){}
        
    getPost(postID) {
        return this.af.database.object(`/posts/${postID}`);
    }
    
    getFeed() {
        return this.auth.getAuth()
            .filter(authInfo => authInfo !== null)
            .map( authInfo => authInfo.auth.uid)
            .switchMap( uid => this.af.database.list(`/users/${uid}/feed`));
    }
        
}