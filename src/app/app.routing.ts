import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { AuthGuard } from './guard/auth.guard';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Home'} },
    { path: 'login', component: LoginComponent, data: { title: 'Login'} },
    { path: 'me', component: AccountComponent, data: { title: 'Mi cuenta'} },

    // otherwise redirect to home
    { path: '**', redirectTo: '', data: { title: 'Home'} }
];

export const routing = RouterModule.forRoot(appRoutes);
