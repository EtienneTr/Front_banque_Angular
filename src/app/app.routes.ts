import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ContactComponent } from './pages/contact/contact.component';

import { SecurService } from './services/secur.service';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent, canActivate: [SecurService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent }
];

