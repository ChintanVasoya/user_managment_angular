import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './auth/header/header.component';
import {AuthModule } from './auth/auth.module'
import { AuthGuard } from "./guard/auth.guard";
import { UserlistComponent } from './dashboard/userlist/userlist.component';

const authModule = () => import('./auth/auth.module').then(x => x.AuthModule);
const routes: Routes = [                                                   
  
  { path: '',  
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
      {
        path: 'auth', loadChildren: authModule }
    ]
     
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'userlist', component: UserlistComponent, canActivate: [AuthGuard] },
  { path: 'header', component: HeaderComponent },
  
  // {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
