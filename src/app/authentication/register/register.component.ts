import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import { HomePageService } from 'src/app/Services/home-page.service';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm :FormGroup =  new FormGroup({    
  password : new FormControl('',[Validators.required]),
  name : new FormControl('',[Validators.required]),
  email : new FormControl('',[Validators.required]),
  phonenumber : new FormControl('',[Validators.required]),
  gender : new FormControl(''),
  // country : new FormControl('',[Validators.required]),
  Birthdate:new FormControl('',[Validators.required]),
  //imagepath: new FormControl(''),



})

  constructor(private toaster:ToastrService, private spinner :NgxSpinnerService , 
    public user :UserService,public home: HomePageService,private loginService:LoginService) { }

  ngOnInit(): void {
    this.home.getHome();
  }
  CreateUser(){
    debugger;
    if(this.loginService.isEmailExist)
    alert("Email is already used ..")
    else
    this.user.createUser(this.registerForm.value);
      }

    
        file:any;
       imageShow: any= '';

  onFileChanged(event:any) {
       this.file = event.target.files[0]
        var reader = new FileReader();
         reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
         this.imageShow = (<FileReader>event.target).result;
         this.user.uploadUserImage(this.imageShow);
 }
      }

      IsEmailExist(){
        this.loginService.IsEmailExist(this.registerForm.controls['email'].value)
           }




}
