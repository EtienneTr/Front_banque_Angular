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
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ContactComponent } from './pages/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent
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
    UserService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
