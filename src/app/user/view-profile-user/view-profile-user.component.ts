import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FollowService } from 'src/app/Services/follow.service';
import { LoginService } from 'src/app/Services/login.service';
import { MessageService } from 'src/app/Services/message.service';
import { PostService } from 'src/app/Services/post.service';
import { ReportService } from 'src/app/Services/report.service';
import { UserService } from 'src/app/Services/user.service';
import { ViewProfileService } from 'src/app/Services/view-profile.service';
import * as signalR from "@microsoft/signalr";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-profile-user',
  templateUrl: './view-profile-user.component.html',
  styleUrls: ['./view-profile-user.component.css']
})
export class ViewProfileUserComponent implements OnInit {

  constructor(public userService: UserService, private route: ActivatedRoute, public viewService: ViewProfileService,
    private dialog: MatDialog, public messageService: MessageService,
    private spinner: NgxSpinnerService, public postService: PostService, private reportService: ReportService,
    public followService: FollowService, private toaster: ToastrService) { }
  title = 'Frontend';
  notification: any;
  nCount :any;
  connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("https://localhost:44324/messageHub", {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .build();
  id: any
  now = new Date();
  day1 = this.now.getDate();
   mnth =this.now.toLocaleString('default', { month: 'short' });
  @ViewChild('callReportDailog') callReportDailog!: TemplateRef<any>;
  @ViewChild('callReportPostDailog') callReportPostDailog!: TemplateRef<any>;

  sendMessageForm: FormGroup = new FormGroup(
    {
      messageContent: new FormControl(),
      is_Anon: new FormControl(),
      messageDate: new FormControl(),
      userFrom: new FormControl(),
      userTo: new FormControl(),
    }
  )

  reportForm: FormGroup = new FormGroup(
    {
      Message: new FormControl(),
      UserFrom: new FormControl(),
      UserTo: new FormControl(),
      is_Anon: new FormControl()
    }
  )

  @Input()
  ngSwitchCase: any
  ngOnInit(): void {
   this.spinner.show();
    this.connection.on("MessageReceived", (message) => {
      console.log(message);

      this.notification = message;
      debugger;
      if (this.notification != null && this.notification.userToId == Number(localStorage.getItem('userId'))) {

        this.toaster.success(this.notification.userFrom + " " + this.notification.notificationText);

      }
    });
      this.connection.on("NotCount", (count) => {
        debugger;
  
        console.log(count);
        this.nCount=count;
  
      });
      this.connection.start().catch(err => document.write(err));
    this.id = this.route.snapshot.params['id']

    this.viewService.getUserById(this.id);
    this.viewService.getPost(this.id);
    this.postService.GetPostInfoByUserId(this.id)
    this.messageService.getMessagescountbyid(this.id);
    this.followService.isFollow(Number(localStorage.getItem("userId")), this.id);
    this.followService.isBlock(Number(localStorage.getItem("userId")), this.id);
    this.followService.isUserBlockMe(this.id, Number(localStorage.getItem("userId")));
    this.followService.getFollowers(this.id);
    this.followService.getFollowing(this.id);
    this.spinner.hide();
  }

 

  replyMessage() {
    if (!this.followService.isUserBlockMee) {
      this.sendMessageForm.controls["userTo"].setValue(Number(this.id));
      this.sendMessageForm.controls["messageDate"].setValue(new Date());
      this.sendMessageForm.controls["userFrom"].setValue(Number(localStorage.getItem('userId')));
       this.sendMessageForm.controls['is_Anon'].setValue(this.is_anon);
      console.log(this.sendMessageForm.value)
      this.messageService.createNewMessage(this.sendMessageForm.value);
      this.sendMessageForm.controls["messageContent"].setValue("");


    } else {
      this.toaster.error("You cannot send message to " + this.viewService.user.username + " because you're blocked")
    }
  }

  change(evant: any) {
    console.log(this.sendMessageForm.value)
  }
  CommentForm: FormGroup = new FormGroup({
    commenttext: new FormControl('', Validators.required),
    userid: new FormControl(),
    // imagepath : new FormControl (''),
    postid: new FormControl()
  })

  userId: any;
  CreateLike(postId: number) {

    this.userId = localStorage.getItem('userId');
    this.postService.createLike(postId, this.userId);
  }
  createComment(postId: number) {
    this.CommentForm.value.userid = Number(localStorage.getItem('userId'));
    this.CommentForm.value.postid = postId;
    this.CommentForm.value.imagepath = null;
    this.postService.createComment(this.CommentForm.value);
    this.CommentForm.controls['commenttext'].setValue("");

  }
  postId: any;
  changePostId(Id: any) {
    this.postId = Id;
  }

  reportUser() {
    this.reportService.createReport(this.reportForm.value);
  }

  isOther = false
  changeOther() {
    if (this.reportForm.value.Message == 'Other')
      this.isOther = true;
    else
      this.isOther = false;
  }

  openReportDailog() {
    this.reportForm.controls["UserFrom"].setValue(Number(localStorage.getItem('userId')));
    this.reportForm.controls["UserTo"].setValue(Number(this.id));

    this.dialog.open(this.callReportDailog)
  }

  openReportPostDailog() {
    this.reportForm.controls["UserFrom"].setValue(Number(localStorage.getItem('userId')));
    this.reportForm.controls["UserTo"].setValue(Number(this.id));

    this.dialog.open(this.callReportPostDailog)
  }

  followUser() {
    if (!this.followService.isUserBlockMee) {
      const follow = {
        "userFrom": Number(localStorage.getItem('userId')),
        "userTo": Number(this.id),
        "followDate": new Date()
      }

      this.followService.createFollow(follow);
    }
    else {
      this.toaster.error("You CAN NOT Follow " + this.viewService.user.username + " Because blocked you")

    }

  }

  UnblockUser(){
    this.followService.UnblockUser(Number(localStorage.getItem('userId')), Number(this.id));
  }

  deleteFollowing(){
    this.followService.deleteFollowing(Number(localStorage.getItem('userId')), Number(this.id));
  }

  blockUserAndUpdateUser(){
    this.followService.blockUserAndUpdateUser(Number(localStorage.getItem('userId')), Number(this.id),1)
  }

  is_anon : boolean = false 
  changeAnonymously(event: any) {
    if (event.target.checked)
      if (this.viewService.user.is_Premium)
        {
          this.toaster.error("You CAN NOT send message as Anonymously to " + this.viewService.user.username)
          event.target.checked = false;
        }
      else
        this.is_anon = event.target.checked
    else
      this.is_anon = event.target.checked
     
  }

 

}
