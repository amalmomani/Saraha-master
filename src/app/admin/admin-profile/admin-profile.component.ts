import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
 
   oldPassword = "123456789";
   passwordForm:FormGroup = new FormGroup(
    {
      oldPasswordControl:new FormControl(''),
      newPasswordControl:new FormControl(''),
    }
   )

  constructor(public userService:UserService,private toastar:ToastrService,public loginService:LoginService) { }

  user:any
   updateUserForm:FormGroup = new FormGroup({
    userid:new FormControl(''),
    username:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    phonenumber:new FormControl('',Validators.required),
    gender:new FormControl(''),
    birthdate:new FormControl(''),
    country : new FormControl (''),
    imagepath : new FormControl ('')})


   ngOnInit() {
    //  this.userService.getUserById(2);
    //  this.loginService.getLoginByUserId(2);
     this.loginService.checkIfLoginOrNot();
     this.userService.getUserById(this.loginService.userId);
     this.loginService.getLoginByUserId(this.loginService.userId);
    //  while(this.userService.user == undefined)
    //  continue
     
     
    

  }

  updateUser(){
    debugger;
    this.updateUserForm.controls['userid'].setValue(this.userService.user.userid);
    this.updateUserForm.controls['gender'].setValue(this.userService.user.gender);
    this.updateUserForm.value.imagepath = this.userService.user.imagepath;
    console.log(this.updateUserForm.value)
    this.userService.updateUser(this.updateUserForm.value);
  }

  uploadImage(file:any){
    if(file.length == 0){
      console.log("hi");
     return
    }
    debugger;
     console.log(file);
    let fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);
    this.userService.uploadUserImage(formData);
   }


   checkMatchPassword(){
    console.log(this.passwordForm.controls['oldPasswordControl'].value);
    console.log(this.loginService.login.password);
    if(this.passwordForm.controls['oldPasswordControl'].value != this.loginService.login.password)
{  
  this.toastar.warning('Old Password is not correct ...');

}   }


  changePassword(){
    debugger;
    console.log(this.passwordForm.controls['oldPasswordControl'].value);
    console.log(this.loginService.login.password);
    if(this.passwordForm.controls['oldPasswordControl'].value == this.loginService.login.password){
   this.loginService.changePassword(this.loginService.login.loginid,this.passwordForm.controls['newPasswordControl'].value)
    }
  }

   
}
