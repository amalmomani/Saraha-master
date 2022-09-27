import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {


  p: any=[{}]
  OServices: any=[{}]
  ordercount : any;
 
 
 
   constructor(private http:HttpClient) { 


   }
   GetAll(){
     this.http.get("https://localhost:44324/Api/Purchase/GetPurchases").subscribe((result)=>
     {
       this.p=result;
       this.ordercount =this.p.length;
     })
   }
 
  
   GetOrders(){
    this.http.get("https://localhost:44324/Api/Purchase/GetOrders").subscribe((result)=>
    {
      this.OServices=result;
     
    })

    
  }
  
  
  
  
  
  
  
  IsPremiumExpire(){
    this.http.get("https://localhost:44324/Api/Purchase/IsPremiumExpire").subscribe((result)=>
    {
     
    })
  }
  
  }
