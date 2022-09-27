import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewProfileService {

  constructor(private http:HttpClient) { }
 
  user:any 
  Userposts : any = [{}]

//  UserImage : any;

  getUserById(userId:number){
    this.http.get('https://localhost:44324/api/UserProfile/GetUserById/'+userId).subscribe((result) => {
      
      console.log(result);
      this.user = result;
    },err => {
      console.log(err)
    })
  }



  getPost(userId:number){
    this.http.get('https://localhost:44324/api/post/GetPostByUserId/'+userId).subscribe((result) => {
      this.Userposts = result;
      console.log(result);
    },Error => {
      console.log(Error);
    })
  }
  


}
