import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmailServiceService } from 'src/app/Services/email-service.service';
import { ActivatedRoute } from '@angular/router';
import { ViewProfileService } from 'src/app/Services/view-profile.service';
@Component({
  selector: 'app-email-compose',
  templateUrl: './email-compose.component.html',
  styleUrls: ['./email-compose.component.css']
})
export class EmailComposeComponent implements OnInit {

  constructor(private email:EmailServiceService,private route:ActivatedRoute,public viewService:ViewProfileService) { }
  emailForm:FormGroup = new FormGroup({
    reportedName:new FormControl('',[Validators.required,Validators.email]),
    reportedEmail:new FormControl('',Validators.required),
    reportMessage:new FormControl('',Validators.required),

   
  })
  id:any;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.viewService.getUserById(this.id);

  }
  SendEmail(){
    this.email.SendEmail(this.emailForm.value);
      }
}
