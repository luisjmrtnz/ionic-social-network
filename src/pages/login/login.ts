import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFire } from 'angularfire2';

import { CreateAccountPage } from '../create-account/create-account';
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
  public loader;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public af: AngularFire,
    public auth: AuthService,
    public toastCtrl: ToastController) {
      this.userForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: [''],
      });
    }
    
  ionViewDidLoad() {
    this.initLoader();
  }

  onLogin() {
    this.presentLoader();
    
    this.auth.signin(this.userForm.value)
      .then(()=> {
        this.userForm.reset();
      }, 
      err => { 
        this.loaderClose();
        this.presentToast(err)
        console.log(err);
      });
  }
  
  presentToast(msg) {
    if(msg.message){
      let toast = this.toastCtrl.create({
        message: msg.message,
        duration: 3000,
        showCloseButton: true,
        closeButtonText: 'Got it!',
        dismissOnPageChange: true,
        cssClass: "error",
      });
      toast.present();
    }
  }
  
  initLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3000,
      dismissOnPageChange: true
    });
  }
  
  presentLoader() {
    this.loader.present();
  }
  
  loaderClose() {
    this.loader.dismiss();
  }

  createAccount() {
    this.navCtrl.push(CreateAccountPage);
  }
}
