import { Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

/* Services */
import { SocialService } from '../../providers/social.service';
import { UserService } from '../../providers/user.service';
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
    private socialService: SocialService ){}

  ngOnInit() {
    let postID = this.feed.$key;
    this.post = this.socialService.getPost(postID);
    this.post.take(1).subscribe(post => {
      this.poster = this.userService.getUser(post.from);
    });
  }
}
