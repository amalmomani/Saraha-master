import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-asiderbar',
  templateUrl: './asiderbar.component.html',
  styleUrls: ['./asiderbar.component.css']
})
export class AsiderbarComponent implements OnInit {

  constructor(public userService:UserService,public loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.checkIfLoginOrNot();
    this.userService.getUserById(this.loginService.userId);
    this.loginService.getLoginByUserId(this.loginService.userId);
  }

}
