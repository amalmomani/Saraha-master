import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContactUsService } from 'src/app/Services/contact-us.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateNewServiceComponent } from '../create-new-service/create-new-service.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  constructor( public contactUs:ContactUsService,private dialog:MatDialog){}
  @ViewChild('calldeleteDailog') calldeleteDailog! :TemplateRef<any>;
  @ViewChild('callupdateDailog') callupdateDailog2! :TemplateRef<any>; 
  // updateForm:FormGroup=new FormGroup({
  //   contactusid:new FormControl(),
  //   featureName:new FormControl(),
  //   featurePrice:new FormControl(),
  //   featureDuration:new FormControl(),
  //   // enddate:new FormControl(),
  //    imagePath:new FormControl()
  // })
  ngOnInit(): void {

    this.contactUs.GetAll();

  }

  deleteMessage<contactUs>(id:number)
  {
    const dialogVal= this.dialog.open(this.calldeleteDailog);
    dialogVal.afterClosed().subscribe((result)=>{
      if(result!=undefined)
        {
          if(result=='yes')
          
          this.contactUs.deleteMessage(id);
        else (result=='no')
        console.log("Thank you");
             }
    })
   
}
// updateMessage(){
//   this.updateForm.value.imagePath = this.p_data.imagePath;
//   this.featureService.UpdateService(this.updateForm.value);
// }

CreateNewMessage(){
  this.dialog.open(CreateNewServiceComponent);
}

}