import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private route:Router,private loginService:LoginService,private toster:ToastrService) { }

  password : FormControl = new FormControl();
  
  ngOnInit(): void {
  
  }

  changePassword(){
    if(!this.loginService.isVerfiyCode)
    {
      this.toster.warning("Your Email is NOT Verfiy")
    }
    else if(this.password.value.length == 0)
    {
      this.toster.warning("Password CAN NOT be empty")
    }
     else 
      { 
        this.route.navigate(["authentication/Login"])
        this.loginService.changePassword(this.loginService.loginIdToChangePassword,this.password.value)
        }
        
  }
 

}
