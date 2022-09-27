import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import * as signalR from "@microsoft/signalr";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public userService:UserService,private route:Router,private toaster :ToastrService) { }
  title = 'Frontend';
  notification:any ;
 connection = new signalR.HubConnectionBuilder()
 .configureLogging(signalR.LogLevel.Debug)
 .withUrl("https://localhost:44324/messageHub", {
   skipNegotiation: true,
   transport: signalR.HttpTransportType.WebSockets
 })
 .build();
  searchForm : FormGroup = new FormGroup(
    {
      username : new FormControl(),
      country : new FormControl(),
      gender : new FormControl()
    }
  )
  isSearch : boolean = false;
  ngOnInit(): void {
    this.connection.on("MessageReceived", (message) => {
      console.log(message);
      
      this.notification=message;
      
      if(this.notification!=null && this.notification.userToId ==Number(localStorage.getItem('userId')))
      {
        
       this.toaster.success(this.notification.userFrom +" "+this.notification.notificationText);

      }
    });
    this.connection.start().catch(err => document.write(err));
    // this.userService.getAll();
    this.userService.getAllLoginUsers();
  }
  
  search(){
    console.log(this.searchForm.value)
     this.userService.searchUser(this.searchForm.controls['username'].value,this.searchForm.controls['country'].value,
     this.searchForm.controls['gender'].value);
  }

  
  viewProfile(id:number){
    console.log("Hii")
    this.route.navigate(['user/viewProfile',id])
  }
}
