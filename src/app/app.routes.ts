import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AccountComponent } from './pages/account/account.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { AdvisorComponent } from './pages/advisor/advisor.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdvisorsComponent } from './pages/admin/advisors.component';

import { SecurService } from './services/secur.service';

export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent, canActivate: [SecurService], data: { role: ['customer', 'advisor', 'admin']} },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [SecurService], data: { role: ['customer', 'advisor', 'admin'] } },
  { path: 'account', component: AccountComponent, canActivate: [SecurService], data: { role: ['customer', 'advisor'] } },
  { path: 'transfer', component: TransferComponent, canActivate: [SecurService], data: { role: 'customer' } },
  { path: 'advisor', component: AdvisorComponent, canActivate: [SecurService], data: { role: 'advisor' } },
  { path: 'admin', component: AdminComponent, canActivate: [SecurService], data: { role: 'admin' } },
  { path: 'advisors', component: AdvisorsComponent, canActivate: [SecurService], data: { role: 'admin' } }
];

