import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http:HttpClient,private toastr:ToastrService) { }
   isFollowUser : any 
   following : any = []
   follower : any = []
    isBlockUser : any
    isUserBlockMee : any
   getFollowing(userfrom:number){
    this.http.get("https://localhost:44324/api/Follow/GetFollowing/"+userfrom).subscribe((result) => {
    this.following = result;
    console.log(this.following)
    });
   }

   getFollowers(userTo:number){
    this.http.get("https://localhost:44324/api/Follow/GetFollowers/"+userTo).subscribe((result) => {
    this.follower = result;
    console.log(this.follower)
    });
   }


  createFollow(follow:any){
    this.http.post("https://localhost:44324/api/Follow",follow).subscribe((result) => {
     this.isFollow(follow.userFrom,follow.userTo);
     this.getFollowers(follow.userTo);
           this.toastr.success("Follow User Successfully")

    });

  }

  isFollow(userfrom:number,userTo:number){
   this.http.get("https://localhost:44324/api/Follow/IsFollow/"+userfrom+"/"+userTo).subscribe((result) => {
    this.isFollowUser = result;
   })
  }

  blockUserAndUpdateUser(userFrom:number,userTo:number,isBlock:number){
    this.http.get("https://localhost:44324/api/Follow/UpdateBlockUser/"+userFrom+"/"+userTo+"/"+isBlock).subscribe((result) => {
      this.isBlock(userFrom,userTo);
      this.isFollow(userFrom,userTo);
      this.getFollowers(userTo);
      this.getFollowing(userTo);
      this.toastr.success("Block User Successfully")
     })
    
  }

  blockUserAndUpdateMe(userFrom:number,userTo:number,isBlock:number){
    this.http.get("https://localhost:44324/api/Follow/UpdateBlockUser/"+userFrom+"/"+userTo+"/"+isBlock).subscribe((result) => {
      this.isBlock(userFrom,userTo);
      this.getFollowers(userFrom);
      this.getFollowing(userFrom);
      this.toastr.success("Block User Successfully")
     })

  }
  
  deleteFollower(userFrom:number,userTo:number){
    this.http.get("https://localhost:44324/api/Follow/DeleteFollowByUser/"+userFrom+"/"+userTo).subscribe((result) => {
      this.getFollowers(userTo);
      this.getFollowing(userTo);
      this.toastr.success("Remove User Successfully")
     })
  }

  
  deleteFollowing(userFrom:number,userTo : number){
    this.http.get("https://localhost:44324/api/Follow/DeleteFollowByUser/"+userFrom+"/"+userTo).subscribe((result) => {
      this.isFollow(userFrom,userTo);
      this.getFollowing(userFrom);
      this.getFollowers(userTo);
      this.toastr.success("UnFollow User Successfully")

     })
  }

  UnblockUser(userFrom : number,userTo : number){
    this.http.get("https://localhost:44324/api/Follow/DeleteFollowByUser/"+userFrom+"/"+userTo).subscribe((result) => {
      this.isBlock(userFrom,userTo);
      this.toastr.success("UnBlock User Successfully")

     })
  }

  isBlock(userFrom:number,userTo : number){
    this.http.get("https://localhost:44324/api/Follow/IsBlock/"+userFrom+"/"+userTo).subscribe((result) => {
      this.isBlockUser = result;
     })
  }

  isUserBlockMe(userFrom:number,userTo : number){
    this.http.get("https://localhost:44324/api/Follow/IsBlock/"+userFrom+"/"+userTo).subscribe((result) => {
      this.isUserBlockMee = result;
     })
  }
}
