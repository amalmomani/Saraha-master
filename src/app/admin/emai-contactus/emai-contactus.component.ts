import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmailServiceService } from 'src/app/Services/email-service.service';
import { ViewProfileService } from 'src/app/Services/view-profile.service';

@Component({
  selector: 'app-emai-contactus',
  templateUrl: './emai-contactus.component.html',
  styleUrls: ['./emai-contactus.component.css']
})
export class EmaiContactusComponent implements OnInit {
  emailForm:FormGroup = new FormGroup({
    reportedName:new FormControl('',[Validators.required,Validators.email]),
    reportedEmail:new FormControl('',Validators.required),
    reportMessage:new FormControl('',Validators.required),

   
  })
  constructor(private Email:EmailServiceService,private route:ActivatedRoute,public viewService:ViewProfileService) { }
  username:any;
  email:any;
  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
    this.email = this.route.snapshot.params['email'];
  }
  SendEmail(){
    this.Email.SendEmail(this.emailForm.value);
      }
}
