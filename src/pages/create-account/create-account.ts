import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/catch';


import { UserService } from '../../providers/user.service';
import { AuthService } from '../../providers/auth.service';
import { UtilService } from '../../providers/util.service';

/*
  Generated class for the CreateAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html'
})
export class CreateAccountPage {
  private accountForm : FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public auth: AuthService,
    public util: UtilService) {
    this.accountForm =  this.formBuilder.group({
      username: ["", Validators.required ],
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      repass: ["", Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }
  
  createAccount() {
    let newUser = this.accountForm.value;
    
    this.userService.isUserFree(newUser.username)
        .switchMap(() => this.auth.createUser(newUser))
        .filter( value => {
          if(!value.auth.uid){
            this.presentToast(value, 'error');
          } else {
            return true;
          }
        }).subscribe(value => console.log(value), err => console.log(`${err} here`));
  }
  
  presentToast(msg, msgClass) {
     this.util.getToast(msg, msgClass).present();
  }
  

}
