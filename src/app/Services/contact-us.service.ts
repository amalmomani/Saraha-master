import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  Messages: any=[{
  }]
 
 
   constructor(private http:HttpClient) { 


   }
   GetAll(){
     this.http.get("https://localhost:44324/Api/ContactUs").subscribe((result)=>
     {
       this.Messages=result;
     })
   }

   deleteMessage(id:number)
   {
     
     this.http.delete('https://localhost:44324/Api/ContactUs/delete/'+id).subscribe((resp)=>{
     
     },err=>{
      
     })
     window.location.reload();
   }

   CreateNewMessage(contactUs:any){
    console.log(contactUs);

    debugger;
    this.http.post('https://localhost:44324/Api/ContactUs',contactUs).subscribe((result) =>{

    },Erorr =>{

    })
    window.location.reload();
  }
 
 }
