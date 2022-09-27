import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SarahaWeatherService {

  constructor( private http : HttpClient ,  private user :UserService) { }
  weather : any ;
  // u:any;
  
  getWeatherByCountry(country:string){
    console.log("hi")
    debugger;
  
     if(country != null)
   { this.http.get('https://localhost:44324/api/weatherforecast/weather/'+country).subscribe((res)=>{
    this.weather=res;
    console.log(this.weather);
    debugger;
    },err=>{
      console.log(err);

    })}
    else{
      this.http.get('https://localhost:44324/api/weatherforecast/weather/'+"Jordan").subscribe((res)=>{
    this.weather=res;
    console.log("hello");
    debugger;
    },err=>{
      console.log(err);

    })
    }
  }
}
