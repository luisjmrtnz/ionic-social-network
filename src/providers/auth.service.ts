import { Injectable } from '@angular/core';
import { 
  AngularFire, 
  AuthMethods,
  AuthProviders
} from 'angularfire2';

@Injectable()
export class AuthService {
  constructor(public af:AngularFire) {}
  
  getAuth() {
    return this.af.auth; 
  };
  
  signin(credentails) {   
    return this.af.auth.login(
      credentails, 
      {
       provider: AuthProviders.Password,
       method: AuthMethods.Password
      });
  }
  
  createUser(credentails) {
   return this.af.auth.createUser(credentails);
  };
  
  logout() {
     return this.af.auth.logout();
  }
}