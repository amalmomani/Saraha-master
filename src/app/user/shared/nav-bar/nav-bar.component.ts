import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/Services/home-page.service';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';
import * as signalR from "@microsoft/signalr";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public userService:UserService,private loginService:LoginService, public home:HomePageService,private toaster :ToastrService) { }
  title = 'Frontend';
  nCount:any;
  notification :any = [];
    connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("https://localhost:44324/messageHub", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();
    con = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("https://localhost:44324/messageHub", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();
  ngOnInit(): void {
    this.userService.getNotificaition(Number(localStorage.getItem('userId')));
    this.loginService.checkIfLoginOrNot();
    this.userService.getUserById(this.loginService.userId);
    this.loginService.getLoginByUserId(this.loginService.userId);
    this.home.getHome();
    
    this.connection.on("NotificationReceived", (message) => {
      console.log(message);
      this.notification=message;
      
    
   
      
    });

    this.connection.start().catch(err => document.write(err));
    this.con.on("NotCount", (count) => {
      debugger;

      console.log(count);
      this.nCount=count;

    });
    this.con.start().catch(err => document.write(err));
  }
  getNot()
  {
this.userService.getNotificaition(Number(localStorage.getItem('userId')));


  }
  updateIsRead(notId :any)
  {
    debugger;
this.userService.UpdateNotIsRead(Number(localStorage.getItem('userId')),notId);
  }
  }

