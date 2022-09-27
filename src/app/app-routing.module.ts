import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';

const routes: Routes = [
    {
      path:'',
      component:HomeComponent
    },
    {
      path:'Home',
      component:HomeComponent
      },
   
  {
    path:'authentication',
    loadChildren: () =>import('./authentication/authentication.module')
    .then((m)=>m.AuthenticationModule)
},
{
  path:'admin',
  loadChildren: () =>import('./admin/admin.module')
  .then((m)=>m.AdminModule)
},
{
path:'user',
loadChildren: () => UserModule
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
