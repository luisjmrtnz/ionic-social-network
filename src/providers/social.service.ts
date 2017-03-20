import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

import { AuthService } from './auth.service';


@Injectable()

export class SocialService {
    constructor(
        private af: AngularFire,
        private auth: AuthService){}
        
    getUid() {
        return this.auth.getAuth()
            .filter(authInfo => authInfo !== null)
            .map( authInfo => authInfo.auth.uid);
    }
    
    getPost(postID) {
        return this.af.database.object(`/posts/${postID}`);
    }
    
    getFeed() {
        return this.getUid()
            .flatMap( uid => this.af.database.list(`/users/${uid}/feed`));
    }
    
    sendPost(postData) {
        return this.getUid()
            .switchMap( uid => this.createPost(postData, uid))
            .map( post => post.key)
            .switchMap( postKey => this.updateUserFeed(postKey));
    }
    
    createPost(postData, uid) {
        let post = { 
            post: postData,
            from: uid,
            timestamp: firebase.database['ServerValue'].TIMESTAMP
        };
        
        return this.af.database.list('/posts').push(post);
    }
    
    deletePost(postID) {
       return this.getUid()
                .switchMap(uid => {
                    let userFeed = this.af.database.object(`/users/${uid}/feed/${postID}`);
                    return userFeed.remove();
                })
                .switchMap( () => {
                    return this.af.database.list('/posts').remove(postID);
                });
    }
    
    updateUserFeed(postKey) {
       return this.getUid()
            .switchMap(uid => {
                let userFeed = this.af.database.object(`/users/${uid}/feed`);
                return userFeed.update({[postKey]: true});
            });
            
    }
    
    followUser(user) {
        let toFollowID = user.$key;
        let currentUserID;
        return this.getUid()
                .do( uid => currentUserID = uid)
                .switchMap( () => this.af.database.object(`/users/${currentUserID}/following`).update({[toFollowID]: true}))
                .switchMap( () => this.af.database.object(`/users/${toFollowID}/followers`).update({[currentUserID]: true}));
    }
    
    unFollowUser(user) {
        let toUnFollowID = user.$key;
        let currentUserID;
        
        return this.getUid()
            .do(uid => currentUserID = uid)
            .switchMap( () => this.af.database.object(`/users/${currentUserID}/following/${toUnFollowID}`).remove())
            .switchMap( () => this.af.database.object(`/users/${toUnFollowID}/followers/${currentUserID}`).remove());
    }
    
}