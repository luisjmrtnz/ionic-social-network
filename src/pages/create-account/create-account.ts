import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  private createForm : FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
    this.createForm =  this.formBuilder.group({
      username: ["", Validators.required ],
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: [""],
      repass: ["", Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');
  }

}
