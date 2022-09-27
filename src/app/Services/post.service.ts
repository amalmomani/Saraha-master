import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from './activity.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, public loginservice: LoginService, private toastr: ToastrService,
    private activityService:ActivityService) { }
  posts: any = [{}]
  postcount: any;
  postImage: any;
  Postlike: any;
  getAll() {
    this.http.get('https://localhost:44324/api/Post/').subscribe((res) => {
      this.posts = res;
      this.postcount = this.posts.length;
    }, err => {

    })
  }
  CreatePost(post: any) {
    console.log(post);
    if (this.postImage != null)
      post.imagepath = this.postImage.imagepath;

    debugger;
    this.http.post('https://localhost:44324/api/Post/CreatePost', post).subscribe((result) => {
      console.log(result)
      this.GetPostInfoByUserId(Number(localStorage.getItem("userId")));
      this.toastr.success("Create Post Successfully")
    }, Erorr => {
      console.log(Erorr)
    })
  }
  userpost: any = []
  postcountById: any;
  GetPostInfoByUserId(userId: number) {

    this.http.get('https://localhost:44324/api/Post/GetPostByUserId/' + userId).subscribe((result) => {
      this.userpost = result;
      debugger;
      for (let x of this.userpost) { 
        this.GetPostLikedBy(x.postId);
         this.CheckIfLiked(Number(localStorage.getItem("userId")), x.postId);
         this.GetPostCommentBy(x.postId) }
      this.postcountById = this.userpost.length;
      console.log(result);
    }, Error => {
      console.log(Error);
    })
  }
  IsLike = new Map();
  CheckIfLiked(userId: number, postId: number) {

    this.http.get('https://localhost:44324/api/Like/IsLike/' + userId + '/' + postId).subscribe((result) => {
      this.IsLike.set(postId, result);
      console.log(this.IsLike.get(postId));

    }, Error => {
      console.log(Error);
    })
  }
  likes = new Map();
  GetPostLikedBy(postId: number) {
    debugger;
    this.http.get('https://localhost:44324/api/Post/GetPostLikedByPostId/' + postId).subscribe((result) => {
      this.likes.set(postId, result);
      console.log(result);
    }, Error => {
      console.log(Error);
    })
  }
  Comments = new Map();
  commentCount: number = 0;
  GetPostCommentBy(postId: number) {
    debugger;
    this.http.get('https://localhost:44324/api/Post/CommentsByUser/' + postId).subscribe((result) => {
      this.Comments.set(postId, result);
      console.log(result);
    }, Error => {
      console.log(Error);
    })
  }
  like: any = [{}]
  likecount: any;
  getlikecount(userId: number) {
    this.http.get('https://localhost:44324/api/Like/Likescount/' + userId).subscribe((result) => {
      this.like = result;
      this.likecount = this.like.length;
      console.log(result);
    }, Error => {
      console.log(Error);
    })
  }
  uploadPostImage(file: FormData) {
    this.http.post('https://localhost:44324/api/Post/UploadPostImage', file).subscribe((result) => {
      debugger;
      this.postImage = result;
      console.log(this.postImage);
    }, err => {
      console.log(err)
    })

  }

  createLike(postId: number, userId: number) {
    debugger;
    // this.Postlike.postId=postId;
    this.http.get('https://localhost:44324/api/Like/CreateLike/' + userId + '/' + postId + '/' + Number(localStorage.getItem('userId'))).subscribe((result) => {
      console.log(result)
      this.toastr.success("liked Post Successfully")
      this.GetPostLikedBy(postId);
      this.CheckIfLiked(userId, postId);
    }, Erorr => {
      console.log(Erorr)

    })

  }

  createComment(comment: any) {
    debugger;
    this.http.post('https://localhost:44324/api/Comment/CreateComment', comment).subscribe((result) => {
      console.log(result)
      this.GetPostCommentBy(comment.postid);
      this.toastr.success("Commented of Post Successfully")

    }, Erorr => {
      console.log(Erorr)

    })


  }


  deletePost(id: number) {
    this.http.delete('https://localhost:44324/api/Post/delete/' + id).subscribe((resp) => {
      this.toastr.success("Delete Post Successfully")
      this.GetPostInfoByUserId(Number(localStorage.getItem("userId")));
      this.activityService.getActivityByUserId(Number(localStorage.getItem("userId")));
    }, err => {

    })

  }


  UpdatePost(body: any) {
    // this.spinner.show();
    if (this.postImage != null)
      body.imagepath = this.postImage.imagepath;
    debugger;
    console.log(body);

    this.http.put('https://localhost:44324/api/Post', body).subscribe((resp) => {

      this.toastr.success("Updated Post Successfully")
      this.GetPostInfoByUserId(Number(localStorage.getItem("userId")));
    }, err => {

    })
  }
  PinPost(postId: any, isPin: any) {
    debugger;

    this.http.get('https://localhost:44324/api/Post/PinPost/' + postId + '/' + isPin).subscribe((resp) => {
       if(isPin == 0)
      this.toastr.success("UnPin Post Successfully")
      else if(isPin == 1)
      this.toastr.success("Pin Post Successfully")

      this.GetPostInfoByUserId(Number(localStorage.getItem("userId")));
    }, err => {

    })
  }
  Top3post: any = [{}];
  Top3Post(userId: number) {
    this.http.get('https://localhost:44324/api/Post/Top3Post/' + userId).subscribe((result) => {
      this.Top3post = result;
      for (let x of this.Top3post) { 
        this.GetPostLikedBy(x.postId);
        this.GetPostCommentBy(x.postId);
        this.CheckIfLiked(Number(localStorage.getItem("userId")), x.postId);
      }
      console.log(result);
    }, Error => {
      console.log(Error);
    })
  }

  removeLike(userId: number, postId: number) {
    this.http.get('https://localhost:44324/api/Like/DeleteLikeByUserPostId/' + userId + "/" + postId).subscribe((result) => {
      debugger;
      this.GetPostLikedBy(postId);
      this.CheckIfLiked(userId, postId);
      console.log(result);
    }, Error => {
      console.log(Error);
    })
  }

}
