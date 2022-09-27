import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {

  constructor(private http:HttpClient) { }
  SendEmail(email:any){
    console.log(email);

    debugger;
    this.http.post('https://localhost:44324/api/Report/SendEmail',email).subscribe((result) =>{

    },Erorr =>{

    })
    window.location.reload();
  }
}
