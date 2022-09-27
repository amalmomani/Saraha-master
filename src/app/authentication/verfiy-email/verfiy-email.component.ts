import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-verfiy-email',
  templateUrl: './verfiy-email.component.html',
  styleUrls: ['./verfiy-email.component.css']
})
export class VerfiyEmailComponent implements OnInit {

  constructor(private route:Router,private loginService:LoginService) { }

  code : FormControl = new FormControl();
  
  ngOnInit(): void {
   this.loginService.checkIfLoginOrNot();
  }

  verfiyByCode(){
    if( this.loginService.code == this.code.value)
      this.loginService.updateVerfiyStatus(this.loginService.loginId,1);
     
        this.route.navigate(["user/editProfile"])
  }
}
