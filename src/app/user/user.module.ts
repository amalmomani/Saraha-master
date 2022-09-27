import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from './shared/shared.module';
import { MessagesComponent } from './messages/messages.component';
import { NotificatonsComponent } from './notificatons/notificatons.component';
import { UserAboutComponent } from './user-about/user-about.component';
import { MakeTestimonyComponent } from './make-testimony/make-testimony.component';
import { ServiceComponent } from './service/service.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { ViewProfileUserComponent } from './view-profile-user/view-profile-user.component';
import { ToastrModule } from 'ngx-toastr';
import { FollowingComponent } from './following/following.component';
import { FollowersComponent } from './followers/followers.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    MessagesComponent,
    NotificatonsComponent,
    UserAboutComponent,
    MakeTestimonyComponent,
    ServiceComponent,
    EditProfileComponent,
    SearchComponent,
    UserProfileComponent,
    ViewProfileUserComponent,
    FollowingComponent,
    FollowersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule  ,
    FormsModule,
    RouterModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
    
  ],
})
export class UserModule { }
