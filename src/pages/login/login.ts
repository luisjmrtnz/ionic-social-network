import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFire } from 'angularfire2';

import { AuthService } from '../../providers/auth.service';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private userForm : FormGroup;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public af: AngularFire,
    public auth: AuthService) {
      this.userForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: [''],
      });
      
      this.af.auth.subscribe(val => console.log(val));
    }

  onLogin(){
    this.auth.signin(this.userForm.value)
      .then(()=> {
        this.userForm.reset();
      }, 
      err => console.log(err));
  }

}
