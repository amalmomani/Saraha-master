import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private route:Router) { }
  users : any = [{}]
  userImage:any
  user:any 
  Activeusers : any = [{}]
  posts : any = [{}]
  Userposts : any = [{}]
  totalCount :any;
  Allusers: any = [{}]
  searchUserResult : any =[]
//  activeUser :any=[]

//  UserImage : any;
getAll(){
    this.http.get('https://localhost:44324/api/UserProfile/').subscribe((res)=>{

      this.Allusers=res;
      this.totalCount =this.Allusers.length;
      // this.searchUserResult = res;
},err=>{
    
})
}
getActivePepole(){
  this.http.get('https://localhost:44324/api/UserProfile/GetActiveUsers').subscribe((res)=>{
  this.Activeusers=res;
  
  },err=>{
  
  })

}
  getAllLoginUsers(){
    this.http.get('https://localhost:44324/api/UserProfile/GetAllLoginUsers').subscribe((res)=>{
    this.users=res;
    this.searchUserResult = res;
    },err=>{
    
    })
  }

 
  createUser(user:any){
    console.log(user);
    if(this.userImage != null)
    user.imagepath = this.userImage.imagepath;
    else
    {
      if(user.gender == 'Female')
      user.imagepath = "Female.jpeg";
      else
      user.imagepath = "Male.jpeg";
    }
    debugger;
    this.http.post('https://localhost:44324/api/UserProfile/Register',user).subscribe((result) =>{
      this.route.navigate(['authentication/Login'])

    },Erorr =>{
   console.log(Erorr);
    })
  }

  changeBlockUserStatus(loginId:number,blockStatus:number){
    this.http.get('https://localhost:44324/api/Login/UpdateBlockedStatus/'+blockStatus+'/'+loginId).subscribe((res)=>{
      
      },err=>{
        console.log(err);

      })
      window.location.reload();
  }

  deleteAccount(loginId:number,userId:number){
    this.http.delete('https://localhost:44324/api/Login/'+loginId).subscribe((res)=>{
      
    },err=>{
      console.log(err);

    })
    this.http.delete('https://localhost:44324/api/UserProfile/delete/'+userId).subscribe((res)=>{
      
    },err=>{
      console.log(err);

    })
    window.location.reload();
  }

  uploadUserImage(file : FormData){
    this.http.post('https://localhost:44324/api/UserProfile/UploadUserImage',file).subscribe((result) => {
      debugger;
      this.userImage = result;
      console.log(this.userImage);
    },err => {
      console.log(err)
    })
  
  }

   updateUser(user:any){
    if(this.userImage != null)
    user.imagepath=this.userImage.imagepath;
    console.log(user);
    debugger;
    this.http.put('https://localhost:44324/api/UserProfile',user).subscribe((result) => {
      
    },err => {
      console.log(err)
    })

    window.location.reload();
  }

  getUserById(userId:number){
    this.http.get('https://localhost:44324/api/UserProfile/GetUserById/'+userId).subscribe((result) => {
      
      console.log(result);
      this.user = result;
      this.getWeatherByCountry();
    },err => {
      console.log(err)
    })
  }


  searchUser(username:string , country:string,gender:string){
    if(username == null || username.length == 0) username = " "
    if(country == null || country.length == 0)  country = " "
    if(gender ==  null || gender.length == 0) gender = " "
    this.http.get("https://localhost:44324/api/UserProfile/SearchUser/"+username+'/'+country+'/'+gender+'/').subscribe((result) =>{
   this.searchUserResult = result;
    console.log(this.searchUserResult);
    })
  }
  
  getNotificaition(userLoggedIn : any){
  this.http.get("https://localhost:44324/api/UserProfile/Notification/"+userLoggedIn+'/').subscribe((res)=>{
  
  },err=>{
  
  })}
  UpdateNotIsRead(userLoggedIn : any,notId :any){
    debugger;
    this.http.get("https://localhost:44324/api/UserProfile/UpdateNot/"+userLoggedIn+'/'+notId+'/').subscribe((res)=>{
    
    },err=>{
    
    })}

    weather : any
    getWeatherByCountry(){
      console.log("hi getWeatherByCountry")
      debugger
      console.log(this.user.country)
       if(this.user.country != null)
     { this.http.get('https://localhost:44324/weatherforecast/weather/'+this.user.country).subscribe((res)=>{
      this.weather=res;
      console.log(this.user.country);

      console.log(this.weather);
      debugger
      },err=>{
        console.log(err);
  
      })}
      else{
        this.http.get('https://localhost:44324/weatherforecast/weather/'+"Jordan").subscribe((res)=>{
      this.weather=res;
      console.log("hello");
      debugger
      },err=>{
        console.log(err);
  
      })
      }

    }

}
