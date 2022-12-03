import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 's',
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
        // canActivate: []
      },
      {
        path: 'm',
        loadChildren: () => import('./my-property/my-property.module').then(m => m.MyPropertyModule),
        // canActivate: []
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
