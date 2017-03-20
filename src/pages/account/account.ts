import { Component, ElementRef, ViewChild} from '@angular/core';
import { 
  NavController, 
  NavParams, 
  AlertController, 
  Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

/* Services */
import { AuthService } from '../../providers/auth.service';
import { UserService } from '../../providers/user.service';
import { UtilService } from '../../providers/util.service';

/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  user = { name: '', about: ''};
  @ViewChild('imageInput') imageInput: ElementRef;



  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthService,
    public userService: UserService,
    public alertCtrl: AlertController,
    public util: UtilService,
    public platform: Platform) {}

  ionViewDidLoad() {
    this.util.initLoader();
    this.util.presentLoader();
    
    this.userService.getThisUser()
      .subscribe(user =>  {
        this.user = user;
          this.util.dismissLoader(); 
      }, err => {
        console.log(err);
      });
  }
  
  logout() {
    this.auth.logout().then(() => {
      let alert = this.alertCtrl.create({
        title: 'See you soon!',
        subTitle: 'I hope you had had a great time in our app!',
        buttons: ['OK']
      });
      alert.present();
    });
  }
  
  updateProfile() {
    this.userService.updateProfile(this.user)
      .subscribe(
        () => this.util.getToast('Updated!', 'success').present(), 
        err => this.util.getToast(err, 'error'));
  }
  
  uploadImage() {
    let image = this.imageInput.nativeElement.files[0];
    
    if(image.type.match('image.*')){
        this.auth.getAuth()
            .switchMap(userInfo => this.userService.uploadImage(image, userInfo))
            .switchMap(imgRef => this.userService.updateProfilePicture(this.user, imgRef.downloadURL))
            .subscribe(() => console.log('user updated'));
    }
  }
  
}
