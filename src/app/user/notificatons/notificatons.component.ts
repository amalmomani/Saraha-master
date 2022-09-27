import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/Services/activity.service';
import { LoginService } from 'src/app/Services/login.service';
import { PostService } from 'src/app/Services/post.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-notificatons',
  templateUrl: './notificatons.component.html',
  styleUrls: ['./notificatons.component.css']
})
export class NotificatonsComponent implements OnInit {

  constructor(public loginservice:LoginService,public activityService:ActivityService,public userService:UserService,
    private postService :PostService) { }

  ngOnInit(): void {
    this.loginservice.checkIfLoginOrNot();
    this.loginservice.getLoginByUserId(this.loginservice.userId);
    this.userService.getUserById(this.loginservice.userId);
    this.activityService.getActivityByUserId(this.loginservice.userId);
   console.log("HERERR      "+this.activityService.activityUserLike);
  }

  deleteActivity(index: number,id:number){
    switch(index){
      case 1 : this.postService.deletePost(id); break;
    
    }
  }

}
