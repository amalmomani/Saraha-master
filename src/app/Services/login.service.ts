import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,private router :Router,private toster:ToastrService) { }
  login :any 
  userId : any
  loginId : any

  code : any
  getLoginByUserId(userId:number){
    this.http.get('https://localhost:44324/api/Login/GetLoginByUserId/'+userId).subscribe((result) => {
       console.log(result);
      this.login = result;
    },err => {
      console.log(err)
    })
  }


  changePassword(loginId:number,password:string){
    this.http.get('https://localhost:44324/api/Login/ChangePassword/'+loginId+'/'+password).subscribe((result) => {
      
      console.log(result);
      this.toster.success("Password Changed Sucessfully")
    },err => {
      console.log(err)
    })

  }

  checkIfLoginOrNot(){
    console.log(localStorage.getItem('userId'));
    if(localStorage.getItem('userId') == null)
    this.router.navigate(['authentication/Login']);
    else
   { 

    this.userId = Number(localStorage.getItem('userId'));
   this.loginId = Number(localStorage.getItem('loginId'));
   console.log(this.userId)
  }
  }

  logout(){
    this.updateActiveStatus(this.loginId,0)
    console.log(this.loginId);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.router.navigate(['']);

  

 
  }

  updateActiveStatus(loginId:number,isActive:number)
  {
    debugger;
    this.http.get("https://localhost:44324/api/Login/UpdateActiveStatus/"+isActive+"/"+loginId).subscribe((result) => {
      console.log(result);
    },Error => {
      console.log(Error);
    })
  }

  updateVerfiyStatus(loginId:number,isVerfiy:number)
  {
    debugger;
    this.http.get("https://localhost:44324/api/Login/UpdateVerifyStatus/"+isVerfiy+"/"+loginId).subscribe((result) => {
      console.log(result);
    },Error => {
      console.log(Error);
    })
  }

  sendVerfiyCodeEmail(email:string){
   this.http.get("https://localhost:44324/api/Login/SendVerfiyCodeEmail/"+email).subscribe((result)=>{
     this.code = result
   },error =>{
    console.log(error);
   })
  }

  isVerfiyCode : boolean = false;
  verfiyEmail(code:Number){
   if(this.code == code)
   this.isVerfiyCode = true;

  }
 
  isEmailExist : any
  IsEmailExist(email:string){
    debugger;
    this.http.get("https://localhost:44324/api/UserProfile/IsEmailExist/"+email).subscribe((result)=>{
     this.isEmailExist= result;
    },error =>{
     console.log(error);
    })
   
  }

  loginIdToChangePassword : any;
  getLoginIdByEmail(email:string){
    this.http.get("https://localhost:44324/api/Login/GetLoginIdByEmail/"+email).subscribe((result)=>{
      this.loginIdToChangePassword = result
    },error =>{
     console.log(error);
    })
   }
 
  
}
