import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { MakeTestimonyComponent } from './make-testimony/make-testimony.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificatonsComponent } from './notificatons/notificatons.component';
import { SearchComponent } from './search/search.component';
import { ServiceComponent } from './service/service.component';
import { BlockedUserComponent } from './shared/blocked-user/blocked-user.component';
import { UserAboutComponent } from './user-about/user-about.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewProfileUserComponent } from './view-profile-user/view-profile-user.component';

const routes: Routes = [
  {
    path:'',
    component:UserProfileComponent
  },
  {
    path:'my-timeline',
    component:UserProfileComponent
  },
  {
    path:'messages',
    component:MessagesComponent
  },
  {
    path:'notifications',
    component:NotificatonsComponent
  },
  {
    path:'about',
    component:UserAboutComponent
  },
  {
    path:'testimony',
    component:MakeTestimonyComponent
  },
  {
    path:'my-badges',
    component:ServiceComponent
  },
  {
    path:'editProfile',
    component:EditProfileComponent
  },
  {
  path:'search',
  component:SearchComponent
  },
  {
    path:'viewProfile/:id',
    component:ViewProfileUserComponent
  },
  {
    path:"following",
    component:FollowingComponent
  },
  {
    path:"follower",
    component:FollowersComponent
  },
  {
    path:"block",
    component:BlockedUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
