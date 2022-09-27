import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }
  home : any
  logo : any
  slider1 : any
  slider2:any
  member1_Image : any
  member2_Image : any
  member3_Image : any
  member4_Image : any

  getHome(){
    this.http.get('https://localhost:44324/api/Home').subscribe((result) => {
      
      console.log(result);
      this.home = result;
    },err => {
      console.log(err)
    })
  }

  uploadImage(file:FormData,index:number){
    debugger;
    switch(index){
      ////////////////////////1
      case 1 : this.http.post('https://localhost:44324/api/Home/UploadLogo',file).subscribe((result) => {
        console.log(result);
        this.logo = result;
        debugger;
      },err => {
        console.log(err)
      }); break;
      ///////////////////////// 2
      case 2 : this.http.post('https://localhost:44324/api/Home/UploadSlider1',file).subscribe((result) => {
        console.log(result);
        this.slider1 = result;
        debugger;
      },err => {
        console.log(err)
      }); break;
  ///////////////////////// 3
  case 3 : this.http.post('https://localhost:44324/api/Home/UploadSlider2',file).subscribe((result) => {
    console.log(result);
    this.slider2 = result;
    debugger;
  },err => {
    console.log(err)
  }); break;
    ///////////////////////// 4
    case 4 : this.http.post('https://localhost:44324/api/Home/UploadMemberImage1',file).subscribe((result) => {
      console.log(result);
      this.member1_Image = result;
      debugger;
    },err => {
      console.log(err)
    }); break;
      ///////////////////////// 5
      case 5 : this.http.post('https://localhost:44324/api/Home/UploadMemberImage2',file).subscribe((result) => {
        console.log(result);
        this.member2_Image = result;
        debugger;
      },err => {
        console.log(err)
      }); break;
        ///////////////////////// 6
        case 6 : this.http.post('https://localhost:44324/api/Home/UploadMemberImage3',file).subscribe((result) => {
          console.log(result);
          this.member3_Image = result;
          debugger;
        },err => {
          console.log(err)
        }); break;
          ///////////////////////// 7
      case 7 : this.http.post('https://localhost:44324/api/Home/UploadMemberImage4',file).subscribe((result) => {
        console.log(result);
        this.member4_Image = result;
        debugger;
      },err => {
        console.log(err)
      }); break;
       

    }
  }


  updateHome(home:any){
    if(this.logo != null)
    home.logo = this.logo.logo;

    if(this.slider1 != null)
    home.slider1 = this.slider1.slider1;

    if(this.slider2 != null)
    home.slider2 = this.slider2.slider2;

    if(this.member1_Image != null)
    home.member1_Image = this.member1_Image.member1_Image;

    if(this.member2_Image != null)
    home.member2_Image = this.member2_Image.member2_Image;

    if(this.member3_Image != null)
    home.member3_Image = this.member3_Image.member3_Image;

    if(this.member4_Image != null)
    home.member4_Image = this.member4_Image.member4_Image;

    
    console.log(home);
    debugger;
    this.http.put('https://localhost:44324/api/Home',home).subscribe((result) => { 
      console.log(result);
    },err => {
      console.log(err)
    })
    window.location.reload();
  }
}
