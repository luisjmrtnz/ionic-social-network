import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PeoplePage } from '../pages/people/people';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AccountPage } from '../pages/account/account';
import { PostComponent } from '../components/post/post';
import { CreateAccountPage } from '../pages/create-account/create-account';
import { PostPage } from '../pages/post/post';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { MomentModule } from 'angular2-moment';

/* Third Party */
import { AngularFireModule } from 'angularfire2';
import { FireBaseConfig } from '../config/firebase';

/* Providers */
import { AuthService } from '../providers/auth.service';
import { UserService } from '../providers/user.service';
import { SocialService } from '../providers/social.service';
import { UtilService } from '../providers/util.service';

@NgModule({
  declarations: [
    MyApp,
    PeoplePage,
    HomePage,
    TabsPage,
    LoginPage,
    AccountPage,
    CreateAccountPage,
    PostComponent,
    PostPage,
    UserProfilePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp, { swipeBackEnabled: true }),
    AngularFireModule.initializeApp(FireBaseConfig),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PeoplePage,
    HomePage,
    TabsPage,
    LoginPage,
    AccountPage,
    PostPage,
    CreateAccountPage,
    UserProfilePage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    UserService,
    SocialService,
    UtilService
  ]
})
export class AppModule {}
