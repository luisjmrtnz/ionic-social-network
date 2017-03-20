import { Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

/* Services */
import { SocialService } from '../../providers/social.service';
import { UserService } from '../../providers/user.service';
import { UtilService } from '../../providers/util.service';
/*
  Generated class for the Post component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent implements OnInit {

  @Input() feed;
  post;
  poster;
  
  constructor(
    private userService: UserService, 
    private socialService: SocialService,
    private util: UtilService){}

  ngOnInit() {
    let postID = this.feed.$key;
    this.post = this.socialService.getPost(postID);
    this.post.take(1).subscribe(post => {
      this.poster = this.userService.getUser(post.from);
    });
  }
  
  deletePost() {
    this.socialService.deletePost(this.feed.$key)
      .take(1).subscribe( 
        () => this.util.getToast('Your post has been deleted', 'success').present(),
        err => this.util.getToast(err, 'error').present());
  }
}
