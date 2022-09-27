import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { HomePageService } from 'src/app/Services/home-page.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username : FormControl = new FormControl('',[Validators.required]);
password : FormControl = new FormControl('',[Validators.required]);

saveLoginInfo : boolean = false;
  constructor(private route :Router,private auth:AuthService,
     public home: HomePageService,private loginService:LoginService) { }

  ngOnInit(): void {
    localStorage.clear();
    this.home.getHome();
    if(localStorage.getItem('username') != null && localStorage.getItem('password') != null){
      this.username.setValue(localStorage.getItem('username'));
      this.password.setValue(localStorage.getItem('password'));
      this.saveLoginInfo = true;
    }
  }

  Login(){
   
    if(this.saveLoginInfo){
      localStorage.setItem("username",this.username.value);
      localStorage.setItem("password",this.password.value);
    }
    else{
      localStorage.clear();
    }

    this.auth.submit(this.username,this.password)
  }
 

  forgetPassword(){
    console.log("Here,forgetPassword")
    console.log(this.username.value)
    if(this.username.value.length != 0)
{     
   this.loginService.getLoginIdByEmail(this.username.value)

  this.loginService.sendVerfiyCodeEmail(this.username.value)
  this.route.navigate(['authentication/verfiyToPassword'])
}    else
    alert("Enter Your Email .. ")
  }

}