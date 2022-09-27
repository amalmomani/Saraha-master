import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';
import { PostService } from 'src/app/Services/post.service';
import { UserService } from 'src/app/Services/user.service';
import * as signalR from "@microsoft/signalr";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-about',
  templateUrl: './user-about.component.html',
  styleUrls: ['./user-about.component.css']
})
export class UserAboutComponent implements OnInit {

  constructor(public userService:UserService,private loginService:LoginService,public postService:PostService,private toaster:ToastrService) { }
  nCount :any;
  title = 'Frontend';
  notification:any ;
 connection = new signalR.HubConnectionBuilder()
 .configureLogging(signalR.LogLevel.Debug)
 .withUrl("https://localhost:44324/messageHub", {
   skipNegotiation: true,
   transport: signalR.HttpTransportType.WebSockets
 })
 .build();
  ngOnInit(): void {
    this.connection.on("MessageReceived", (message) => {
      console.log(message);
      this.notification=message;
      
      if(this.notification!=null && this.notification.userToId ==Number(localStorage.getItem('userId')))
      {
        
       this.toaster.success(this.notification.userFrom +" "+this.notification.notificationText);
      };
      
    });

    this.connection.on("NotCount", (count) => {
      debugger;

      console.log(count);
      this.nCount=count;

    });
    this.connection.start().catch(err => document.write(err));
    
    this.loginService.checkIfLoginOrNot();
    this.userService.getUserById(this.loginService.userId);
    this.loginService.getLoginByUserId(this.loginService.userId);
    this.postService.Top3Post(this.loginService.userId);
  }

  postId:any

  changePostId(Id:any){
    this.postId=Id;
    }
}
