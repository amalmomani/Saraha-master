import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-verfiy-email-to-password',
  templateUrl: './verfiy-email-to-password.component.html',
  styleUrls: ['./verfiy-email-to-password.component.css']
})
export class VerfiyEmailToPasswordComponent implements OnInit {

  constructor(private route:Router,private loginService:LoginService,private toster:ToastrService) { }

  code : FormControl = new FormControl();
  
  ngOnInit(): void {
  }

  verfiyByCode(){
   console.log(this.code.value)
   console.log(this.loginService.code)
   this.loginService.verfiyEmail(this.code.value)
    if( this.loginService.isVerfiyCode)
{       

  this.route.navigate(["authentication/changePassword"])
}else
this.toster.error("Code is INVALID")
}

}
