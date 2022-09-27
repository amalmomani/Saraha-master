import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private http:HttpClient) { }
  aboutUs : any
  homePage:any;
  feature:any=[];
  testimonial:any=[];
  getAboutUs(){

   this.http.get("https://localhost:44324/api/AboutUs").subscribe((result) => {
     this.aboutUs = result;
   },error => {
     console.log(error)
   })

  }
  getHome(){

    this.http.get("https://localhost:44324/api/Home").subscribe((result) => {
      this.homePage = result;
    },error => {
      console.log(error)
    }) 
   }
   getFeature(){
    this.http.get('https://localhost:44324/api/Feature/GetFeatures').subscribe((res)=>{
      this.feature=res;
      },err=>{
      
      })
   }
   getTestimonial(){this.http.get("https://localhost:44324/Api/Testimonial/GetUserTestemonial").subscribe((result)=>
   {
     this.testimonial=result;
   })}

  }
