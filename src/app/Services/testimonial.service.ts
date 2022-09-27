import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  testimonial: any=[{
  }]
 
 
   constructor(private http:HttpClient) { 


   }
   GetAll(){
     this.http.get("https://localhost:44324/Api/Testimonial/GetUserTestemonial").subscribe((result)=>
     {
       this.testimonial=result;
     })
   }

   deletetest(id:number)
   {
     
     this.http.delete('https://localhost:44324/Api/Testimonial/'+id).subscribe((resp)=>{
     
     },err=>{
      
     })
     window.location.reload();
   }
   t:any;
   GetOneTestimonial(){
    debugger;
    this.http.get("https://localhost:44324/api/Testimonial/GetOneTestimonial").subscribe((result)=>
    {
      this.t=result;
    })
  }t1:any;
  GetOneTestimonial1(){
    debugger;
    this.http.get("https://localhost:44324/api/Testimonial/GetOneTestimonial1").subscribe((result)=>
    {
      this.t1=result;
    })
  }t2:any; GetOneTestimonial2(){
    debugger;
    this.http.get("https://localhost:44324/api/Testimonial/GetOneTestimonial2").subscribe((result)=>
    {
      this.t2=result;
    })
  }t3:any;
  GetOneTestimonial3(){
    debugger;
    this.http.get("https://localhost:44324/api/Testimonial/GetOneTestimonial3").subscribe((result)=>
    {
      this.t3=result;
    })
  }
   UpdateTest(is_Accepted:number, testimonialid:number)
  {
 
 this.http.get('https://localhost:44324/api/Testimonial/UpdateAcceptingStatus/'+is_Accepted+'/'+testimonialid).subscribe((resp)=>{
     
     },err=>{
      
     })
    window.location.reload();
   }
   createTest(testimonial:any){
    this.http.post('https://localhost:44324/api/Testimonial',testimonial).subscribe((result) => {
      console.log(result);
    },Error => {
      console.log(Error);
    })

    window.location.reload();
  }

  }