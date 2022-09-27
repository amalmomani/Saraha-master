import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureService } from './feature.service';
import jwt_decode from "jwt-decode";
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private loginService:LoginService, private home:FeatureService, 
    private spinner :NgxSpinnerService, private http:HttpClient, private router :Router,private toster:ToastrService) { }
  submit(email:any,password:any){
    console.log(email);
    debugger;
    this.spinner.show();

    var body ={
            username :email.value.toString(),
            password:password.value.toString()
          }

      const headerDir={
       'Contant-Type':'application/json',
       'Accept':'application/json'
         }
    const requestOptions={
      headers:new HttpHeaders(headerDir)
    }
    this.http.post('https://localhost:44324/api/Login/Login',body,requestOptions).subscribe
    ((resp)=>{
      
      const responce ={
        token:resp.toString()
      }
      localStorage.setItem('token',responce.token);
      let data :any = jwt_decode(responce.token);//object 
      console.log(data);
     debugger;
     localStorage.setItem('userId',data.UserId );
     localStorage.setItem('loginId',data.loginId);
      localStorage.setItem('user',JSON.stringify({...data}) );
      this.spinner.hide();
      if(data.is_Blocked == "False" ){
        console.log("Hiii")
        this.loginService.updateActiveStatus(Number(data.loginId),1);
        if(data.role=='2')
        {
          this.router.navigate(['user']);
        }
        else if (data.role=='1')
        {
          this.router.navigate(['admin']);
        }
      }else{
        alert("sorry .. CAN NOT be login , your account is blocked")
      }
     
     
    },err => {
      console.log(err)
        alert("Email or Password is not correct ...")
        this.spinner.hide();
    })


  
    

  }
}
