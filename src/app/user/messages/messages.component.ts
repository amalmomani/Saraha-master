import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/Services/login.service';
import { MessageService } from 'src/app/Services/message.service';
import { PostService } from 'src/app/Services/post.service';
import { ReportService } from 'src/app/Services/report.service';
import * as signalR from "@microsoft/signalr";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService:MessageService,private dialog:MatDialog ,
     public postService :PostService,public loginservice:LoginService,private reportService:ReportService,private toaster:ToastrService) { }
     title = 'Frontend';
   nCount:any;
     notification:any ;
    connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("https://localhost:44324/messageHub", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();
  // id = 1;
  @ViewChild('callreplyDailog') callreplyDailog! :TemplateRef<any>;
  @ViewChild('callPublishDailog') callPublishDailog! :TemplateRef<any>;
  @ViewChild('callReportDailog') callReportDailog! :TemplateRef<any>;

  
 replyForm : FormGroup = new FormGroup(
  {
    messageContent : new FormControl(),
    messageDate : new FormControl(),
    is_Anon : new FormControl(),
    userFrom : new FormControl(),
    userTo : new FormControl(),
    
  }
   )
   publishForm : FormGroup = new FormGroup(
    {
      messageContent : new FormControl(),
      reply : new FormControl(),
      userTo : new FormControl(),
    })

   msgToPostForm : FormGroup = new FormGroup(
    {
      messageContent : new FormControl(),
      userTo : new FormControl(),
    })

    reportForm :FormGroup = new FormGroup(
      {
        Message : new FormControl(),
        UserFrom : new FormControl(),
        UserTo : new FormControl(),
  
      }
    )

  ngOnInit(): void {
      this.connection.on("MessageReceived", (message) => {
        console.log(message);
        
        this.notification=message;
        
        if(this.notification!=null && this.notification.userToId ==Number(localStorage.getItem('userId')))
        {
          
         this.toaster.success(this.notification.title ,this.notification.notificationText);
  
        }
      });
      this.connection.on("NotCount", (count) => {
        debugger;
  
        console.log(count);
        this.nCount=count;
  
      });
      this.connection.start().catch(err => document.write(err));
    this.loginservice.checkIfLoginOrNot();
    this.loginservice.getLoginByUserId(this.loginservice.loginId);
  this.messageService.getMessages(this.loginservice.userId);
  }
  MsgToPost(){
    debugger;
    this.publishForm.controls["userTo"].setValue(localStorage.getItem('userId'));
    

    // this.msgToPostForm.controls["userTo"].setValue(localStorage.getItem('userId'));
    // this.msgToPostForm.value.messageContent=msg;
    // this.publishForm.controls["reply"].setValue(reply);
    this.messageService.MsgToPost(this.publishForm.value);

    console.log(this.publishForm.value)

  //  this.dialog.open(this.callreplyDailog)
  }

  openReplyDailog(fromId:number, ToId :number){
    console.log(fromId);
    debugger;
    this.replyForm.controls["userTo"].setValue(fromId);
    this.replyForm.controls["userFrom"].setValue(ToId);

   this.dialog.open(this.callreplyDailog)
  }

  openPublishDailog(msg:string){
    debugger;
    this.publishForm.controls["messageContent"].setValue(msg);

   this.dialog.open(this.callPublishDailog)
  }

  openReportDailog(fromId:number, ToId :number){
    console.log(fromId);
    debugger;
    this.reportForm.controls["UserFrom"].setValue(fromId);
    this.reportForm.controls["UserTo"].setValue(ToId);

   this.dialog.open(this.callReportDailog)
  }

  replyMessage(){
    
   this.replyForm.controls["messageDate"].setValue(new Date());
  // this.replyForm.controls["userFrom"].setValue(localStorage.getItem('userId'));
   debugger;
   console.log(this.replyForm.value)
   this.messageService.createNewMessage(this.replyForm.value);
  }

  change(evant:any){
    console.log(this.replyForm.value)
    console.log(evant);
  }

  reportMessage(){
    console.log(this.reportForm.value)
    debugger;
    this.reportService.createReport(this.reportForm.value);
  }

  isOther = false
  changeOther(){
    if(this.reportForm.value.Message == 'Other')
    this.isOther = true;
    else
    this.isOther = false;
  }

  
}
