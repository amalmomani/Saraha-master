import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivityService } from 'src/app/Services/activity.service';
import { AddsService } from 'src/app/Services/adds.service';
import { LoginService } from 'src/app/Services/login.service';
import { MessageService } from 'src/app/Services/message.service';
import { PostService } from 'src/app/Services/post.service';
import { UserService } from 'src/app/Services/user.service';
import * as signalR from "@microsoft/signalr";
import { ToastrService } from 'ngx-toastr';
import { SarahaWeatherService } from 'src/app/Services/saraha-weather.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public postService:PostService,public userService : UserService,public loginservice:LoginService
    ,private dialog:MatDialog,public activityService:ActivityService,public addsService:AddsService,
    public weather :SarahaWeatherService,private toaster : ToastrService) { }
    title = 'Frontend';
    now = new Date();
   day1 = this.now.getDate();
    mnth =this.now.toLocaleString('default', { month: 'short' });

    
    notification:any ;
   nCount:any;
    connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("https://localhost:44324/messageHub", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();
  @ViewChild('calldeleteDailog') calldeleteDailog! :TemplateRef<any>;
@ViewChild('callLikesDailog') callLikesDailog! :TemplateRef<any>;
@ViewChild('callupdateDailog') callupdateDailog2! :TemplateRef<any>; 

postForm:FormGroup = new FormGroup({
  posttext:new FormControl('',Validators.required),
  postdate : new FormControl(),
  imagepath : new FormControl (''),
  userid : new FormControl()}) 


  CommentForm:FormGroup = new FormGroup({
    commenttext:new FormControl('',Validators.required),
    userid: new FormControl(),
    // imagepath : new FormControl (''),
    postid : new FormControl()})

    updateForm:FormGroup=new FormGroup({
      postId: new FormControl(),
      posttext:new FormControl(),
      imagepath:new FormControl()
    })
   
  
    
postId:any;
changePostId(Id:any){
this.postId=Id;
}

  ngOnInit(): void {

    this.connection.on("MessageReceived", (message) => {
      console.log(message);
      
      this.notification=message;
      
      if(this.notification!=null && this.notification.userToId ==Number(localStorage.getItem('userId')))
      {
        
       this.toaster.success(this.notification.userFrom +" "+this.notification.notificationText);

      }
    });
    this.connection.on("NotCount", (count) => {
      debugger;

      console.log(count);
      this.nCount=count;

    });
    this.connection.start().catch(err => document.write(err));

    debugger;
    this.loginservice.checkIfLoginOrNot();
    this.loginservice.getLoginByUserId(this.loginservice.userId);
    this.postService.GetPostInfoByUserId(this.loginservice.userId);

    this.activityService.getActivityByUserId(this.loginservice.userId);
    this.addsService.GetAddById();
    this.userService.getAll();
    this.userService.Allusers();

    this.userService.getUserById(this.loginservice.userId);
  
      


    
  }

   
CreatePost(){
  this.postForm.value.userid = Number(localStorage.getItem('userId'));
  this.postForm.value.postdate = new Date();
   console.log("here , create post")
  this.postService.CreatePost(this.postForm.value);
  this.postForm.controls['posttext'].setValue("");
}
userId:any;
CreateLike(postId: number){
      debugger;

      this.userId=localStorage.getItem('userId');
      this.postService.createLike(postId,this.userId);
}
createComment(postId:number){
  this.CommentForm.value.userid = Number(localStorage.getItem('userId'));
  this.CommentForm.value.postid=postId;
  this.CommentForm.value.imagepath=null;
  this.postService.createComment(this.CommentForm.value);
  this.CommentForm.controls['commenttext'].setValue("");
}


deletePost(id:number){ 
debugger;
    const dialogVal= this.dialog.open(this.calldeleteDailog);
    dialogVal.afterClosed().subscribe((result)=>{
      if(result!=undefined)
        {
          if(result=='yes')
          
          this.postService.deletePost(id);
        else (result=='no')
        console.log("Thank you");
             }
    })
   
}
uploadImage(file:any){
  if(file.length == 0){
    return
  }
  debugger;
  let fileToUpload = <File>file[0];
  const formData = new FormData();
  formData.append('file',fileToUpload,fileToUpload.name);
  this.postService.uploadPostImage(formData);
}
PinPost(postId :any,isPin:any){
  debugger;
  console.log(postId,isPin);
this.postService.PinPost(postId,isPin);  
}

p_data:any={};
  updateDailog(obj:any){
    debugger;
    console.log(obj);
    this.p_data={
      postId:obj.postId,
      posttext:obj.postText,
      imagepath:obj.postImage,
  
    }
    console.log(this.p_data);
    this.updateForm.controls['postId'].setValue(this.p_data.postId); 
    
    this.dialog.open(this.callupdateDailog2,{panelClass: 'custom-modalbox'})
    
  }
  updatePost(){
    //this.updateForm.value.postId=id;
    debugger;
    // this.updateForm.controls['imagepath'].setValue(this.p_data.postId);
    this.updateForm.value.imagepath = this.p_data.imagepath;
   
    this.postService.UpdatePost(this.updateForm.value);
  }
}
