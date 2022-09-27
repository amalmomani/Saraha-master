import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/Services/home-page.service';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userService:UserService,public loginService:LoginService,public home:HomePageService) { }

  ngOnInit(): void {
    this.loginService.checkIfLoginOrNot();
    this.userService.getUserById(this.loginService.userId);
    this.loginService.getLoginByUserId(this.loginService.userId);
    this.home.getHome();
  }

}
