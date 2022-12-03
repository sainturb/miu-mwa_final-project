import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/guard.auth';
import { NoAuthGuard } from './core/guards/guard.no-auth';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'property',
    loadChildren: () => import('./pages/property/property.module').then(m => m.PropertyModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'appointment',
    loadChildren: () => import('./pages/appointment/appointment.module').then(m => m.AppointmentModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
