import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { VerfiyEmailToPasswordComponent } from './verfiy-email-to-password/verfiy-email-to-password.component';
import { VerfiyEmailComponent } from './verfiy-email/verfiy-email.component';

const routes: Routes = [
  {
    path:'Login',
    component:LoginComponent
  }, {
    path:'Register',
    component:RegisterComponent,
    
  },
  {
    path:"logout",
    component:LogoutComponent
  },
 {
   path:'verfiy',
   component:VerfiyEmailComponent
  },
  {
    path:'verfiyToPassword',
    component:VerfiyEmailToPasswordComponent
   },
   {
    path:'changePassword',
    component:ChangePasswordComponent
   }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
