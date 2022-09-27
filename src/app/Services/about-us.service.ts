import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

   constructor(private http:HttpClient) { }
   aboutUs : any
   imagepath : any
   feature1_Image :any
   feature2_Image : any
   feature3_Image : any
   getAboutUs(){

    this.http.get("https://localhost:44324/api/AboutUs").subscribe((result) => {
      this.aboutUs = result;
    },error => {
      console.log(error)
    })

   }

   uploadImage(file:FormData,index:number){
     
    switch(index){

      ///////////////// 1 - Image Path 
      case 1 :  this.http.post("https://localhost:44324/api/AboutUs/UploadeImagePath",file).subscribe((result) => {
        this.imagepath = result;
      },error => {
        console.log(error)
      })  
      break;

      /////////////////// 2 - feature1 Image
      case 2 :  this.http.post("https://localhost:44324/api/AboutUs/UploadeFeature1Image",file).subscribe((result) => {
        this.feature1_Image = result;
      },error => {
        console.log(error)
      })  
      break;

       /////////////////// 3 - feature2 Image
       case 3 :  this.http.post("https://localhost:44324/api/AboutUs/UploadeFeature2Image",file).subscribe((result) => {
        this.feature2_Image = result;
      },error => {
        console.log(error)
      })  
      break;

       /////////////////// 4 - feature3 Image
       case 4 :  this.http.post("https://localhost:44324/api/AboutUs/UploadeFeature3Image",file).subscribe((result) => {
        this.feature3_Image = result;
      },error => {
        console.log(error)
      })  
      break;
    }
       
   }

   updateAboutUs(aboutUs:any){
    if(this.imagepath != null)
    aboutUs.imagepath = this.imagepath.imagepath

    if(this.feature1_Image != null)
    aboutUs.feature1_Image = this.feature1_Image.feature1_Image

    if(this.feature2_Image != null)
    aboutUs.feature2_Image = this.feature2_Image.feature2_Image

    if(this.feature3_Image != null)
    aboutUs.feature3_Image = this.feature3_Image.feature3_Image


    this.http.put("https://localhost:44324/api/AboutUs",aboutUs).subscribe((result) => {
      console.log(result);
    },error => {
      console.log(error)
    })
  window.location.reload();
   }
}
