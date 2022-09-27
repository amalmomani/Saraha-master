import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import { TestimonialService } from 'src/app/Services/testimonial.service';
import * as signalR from "@microsoft/signalr";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-make-testimony',
  templateUrl: './make-testimony.component.html',
  styleUrls: ['./make-testimony.component.css']
})
export class MakeTestimonyComponent implements OnInit {
  createTest:FormGroup = new FormGroup({
    content:new FormControl('',[Validators.required]),
    userid: new FormControl('')
})
id: any;
nCount:any;
  constructor(public Testimonial:TestimonialService,public loginservice:LoginService,
    private toaster:ToastrService) { }
  title = 'Frontend';
  notification:any ;
 connection = new signalR.HubConnectionBuilder()
 .configureLogging(signalR.LogLevel.Debug)
 .withUrl("https://localhost:44324/messageHub", {
   skipNegotiation: true,
   transport: signalR.HttpTransportType.WebSockets
 })
 .build();
  CreateTest(){
   this.createTest.controls["userid"].setValue(Number(localStorage.getItem('userId')));

    this.Testimonial.createTest(this.createTest.value);
      }
  ngOnInit(): void {
    this.connection.on("MessageReceived", (message) => {
      console.log(message);
      
      this.notification=message;
      
      if(this.notification!=null && this.notification.userToId ==Number(localStorage.getItem('userId')))
      {
        
       this.toaster.success(this.notification.userFrom +" "+this.notification.notificationText);

      }
    });
    this.connection.on("NotCount", (count) => {
      debugger;

      console.log(count);
      this.nCount=count;

    });
    this.connection.start().catch(err => document.write(err));
    this.loginservice.checkIfLoginOrNot();    
    this.loginservice.getLoginByUserId(this.loginservice.userId);
  
    this.Testimonial.GetAll();
  }

}
