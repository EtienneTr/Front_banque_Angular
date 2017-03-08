import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AuthService } from './services/auth.service';
import { SecurService } from './services/secur.service';
import { UserService } from './services/user.service';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AccountComponent } from './pages/account/account.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ContactComponent } from './pages/contact/contact.component';

import { User } from './models/user.model';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    AuthService,
    SecurService,
    UserService,
    User
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
