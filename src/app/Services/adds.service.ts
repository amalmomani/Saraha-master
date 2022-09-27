import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddsService {

  Adds: any=[{
  }]
  AddsImage : any;
a:any;
 
   constructor(private http:HttpClient) { 


   }
   GetAll(){
     this.http.get("https://localhost:44324/api/Adds").subscribe((result)=>
     {
       this.Adds=result;
     })
   }

   GetAddById(){
    debugger;
    this.http.get("https://localhost:44324/api/Adds/GetAddsById").subscribe((result)=>
    {
      this.a=result;
    })
  }

   createAdd(adds:any){
    console.log(adds);
    if(this.AddsImage != null)
    {adds.imagePath = this.AddsImage.imagePath;}

    debugger;
    this.http.post('https://localhost:44324/api/Adds',adds).subscribe((result) =>{
      console.log(result)
    },Erorr =>{
      console.log(Erorr)
    })
    window.location.reload();
  }
 
  deleteAdd(id:number)
   {
    debugger; 
     this.http.delete('https://localhost:44324/Api/Adds/delete/'+id).subscribe((resp)=>{
     
     },err=>{
      
     })
     window.location.reload();
   }



  UpdateAdd(adds:any)
  {
    if(this.AddsImage != null)
   { adds.imagePath=this.AddsImage.imagePath;}
    debugger;
console.log(adds);

this.http.put('https://localhost:44324/api/Adds',adds).subscribe((resp)=>{
      
    },err=>{
     
    })
   window.location.reload();
  }



  uploadAddsImage(file : FormData){
    this.http.post('https://localhost:44324/api/Adds/CreateImagePath',file).subscribe((result) => {
      debugger;
      this.AddsImage = result;
      console.log(this.AddsImage);
    },err => {
      console.log(err)
    })
  
  }
  
}
