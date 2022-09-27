import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  activityUserLike = new Map();
  activityUserComment = new Map();
  activityUserFollow = new Map();
  constructor(private http:HttpClient) { }

   userActivity : any = []
  getActivityByUserId(userId:Number){
    debugger;
    this.http.get("https://localhost:44324/api/Activity/GetActivityByUserId/"+userId).subscribe((result) => {
      this.userActivity = result
      console.log(this.userActivity);
      for(let activity of this.userActivity)
       { 
         if(activity.activityName == 'like') this.getUserbyLikeId(activity.likeId);
         if(activity.activityName == 'comment') this.getUserbyCommentId(activity.commentId);
         if(activity.activityName == 'follow') this.getUserByFollowId(activity.followId);
        }
    },Error => {
      console.log(Error);
    })
  }

  getUserbyLikeId(likeId:Number){
    this.http.get("https://localhost:44324/api/Activity/GetUserByLikeId/"+likeId).subscribe((result) => {
      console.log(result);
     this.activityUserLike.set(likeId,result);
    },Error => {
      console.log(Error);
    })
  }

  getUserbyCommentId(commentId:Number){
    this.http.get("https://localhost:44324/api/Activity/GetUserByCommentId/"+commentId).subscribe((result) => {
      console.log(result);
     this.activityUserComment.set(commentId,result);
    },Error => {
      console.log(Error);
    })
  }

  getUserByFollowId(followId:Number){
    this.http.get("https://localhost:44324/api/Activity/GetUserByFollowId/"+followId).subscribe((result) => {
      console.log(result);
     this.activityUserFollow.set(followId,result);
    },Error => {
      console.log(Error);
    })
  }
}
