import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { VerfiyEmailComponent } from './verfiy-email/verfiy-email.component';
import { RouterModule } from '@angular/router';
import { VerfiyEmailToPasswordComponent } from './verfiy-email-to-password/verfiy-email-to-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    VerfiyEmailComponent,
    VerfiyEmailToPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule,
    
   
  ]
})
export class AuthenticationModule {

 }
 
