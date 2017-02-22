import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';


@Injectable()

export class SocialService {
    constructor(
        private af: AngularFire ){}
        
    getPost(postID) {
        return this.af.database.object(`/posts/${postID}`);
    }
    
    getFeed(uid) {
        return this.af.database.list(`/users/${uid}/feed`);
    }
        
}