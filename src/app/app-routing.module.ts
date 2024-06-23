import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetCidComponent } from './get-cid/get-cid.component';

const routes: Routes = [
  { path: 'get-cid', component: GetCidComponent },
  { path: '', redirectTo: '/get-cid', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
