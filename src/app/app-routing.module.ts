import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetCidComponent } from './get-cid/get-cid.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'get-cid', component: GetCidComponent },
  { path: '', redirectTo: '/get-cid', pathMatch: 'full' },
  { path:'accesoadm', component:LoginComponent },
  { path:'home', component:HomeComponent},
  {
    path: '**',
    redirectTo: '/get-cid',
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
