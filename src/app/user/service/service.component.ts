import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeatureService } from 'src/app/Services/feature.service';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';
import { VisaService } from 'src/app/Services/visa.service';
import * as signalR from "@microsoft/signalr";
import { ToastrService } from 'ngx-toastr';
//import {render} from 'creditcardpayments/creditCardPayments';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  VisaForm:FormGroup = new FormGroup(
    {
      Cardnum:new FormControl('',[Validators.required]),
      Expir:new FormControl('',[Validators.required]),
     // featureId:new FormControl('',[Validators.required]),
    })
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number=0;
  constructor(public userService:UserService ,public featureService : FeatureService,public visa :VisaService,public loginservice:LoginService,private toaster:ToastrService) { }
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

      }
    });
    this.connection.start().catch(err => document.write(err));
    debugger;
    this.loginservice.checkIfLoginOrNot();
    this.loginservice.getLoginByUserId(this.loginservice.userId);
    this.featureService.getAll();
    this.visa.getAll();
    this.userService.getUserById(this.loginservice.userId);

  }
  countStar(star:any) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }

  // Sorry ! your card is expire!
checkout(cost:any, featureId:any){
  debugger;
  this.visa.checkVisa(this.VisaForm.controls['Cardnum'].value,this.VisaForm.controls['Expir'].value,cost,localStorage.getItem('userId'),featureId)
}

}
