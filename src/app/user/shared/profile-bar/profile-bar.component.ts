import { Component, OnInit } from '@angular/core';
import { FollowService } from 'src/app/Services/follow.service';
import { LoginService } from 'src/app/Services/login.service';
import { MessageService } from 'src/app/Services/message.service';
import { PostService } from 'src/app/Services/post.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.css']
})
export class ProfileBarComponent implements OnInit {

  constructor(public userService:UserService,private loginService:LoginService,public post:PostService,
    public mess:MessageService,public followService:FollowService) { }

  ngOnInit(): void {
    this.loginService.checkIfLoginOrNot();
    this.userService.getUserById(this.loginService.userId);
    this.loginService.getLoginByUserId(this.loginService.userId);
       this.mess.getMessagescountbyid(this.loginService.userId);
    this.followService.getFollowers(this.loginService.userId);
    this.followService.getFollowing(this.loginService.userId);
  }

}
