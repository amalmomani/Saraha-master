import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeatureService } from 'src/app/Services/feature.service';

@Component({
  selector: 'app-create-new-service',
  templateUrl: './create-new-service.component.html',
  styleUrls: ['./create-new-service.component.css']
})
export class CreateNewServiceComponent implements OnInit {

  constructor(private featureService : FeatureService) { }

  createService:FormGroup = new FormGroup({
    FeatureName:new FormControl('',Validators.required),
    FeaturePrice:new FormControl('',Validators.required),
    FeatureDuration:new FormControl('',Validators.required),
    ImagePath : new FormControl ('')})
  ngOnInit(): void {
  }

  CreateService(){
this.featureService.createService(this.createService.value);
  }

  uploadImage(file:any){
   if(file.length == 0){
    return
   }
   debugger;
   let fileToUpload = <File>file[0];
   const formData = new FormData();
   formData.append('file',fileToUpload,fileToUpload.name);
   this.featureService.uploadFeatureImage(formData);
  }
}
