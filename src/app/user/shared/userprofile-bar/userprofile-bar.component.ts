import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-userprofile-bar',
  templateUrl: './userprofile-bar.component.html',
  styleUrls: ['./userprofile-bar.component.css']
})
export class UserprofileBarComponent implements OnInit {

  constructor(public userService:UserService,private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.checkIfLoginOrNot();
    this.userService.getUserById(this.loginService.userId);
    this.loginService.getLoginByUserId(this.loginService.userId);
  }

}
