import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // <<<< import it here
import { NgChartsModule } from 'ng2-charts';
import { AdminRoutingModule } from './admin-routing.module';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageServicesComponent } from './manage-services/manage-services.component';
import { ManageReportComponent } from './manage-report/manage-report.component';
import { HomeComponent } from './home/home.component';
import { AsiderbarComponent } from './asiderbar/asiderbar.component';
import { HeaderComponent } from './header/header.component';
import { MessagesComponent } from './messages/messages.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { UsersComponent } from './users/users.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CreateNewServiceComponent } from './create-new-service/create-new-service.component';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailComposeComponent } from './email-compose/email-compose.component';
import { RouterModule } from '@angular/router';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { EmaiContactusComponent } from './emai-contactus/emai-contactus.component';
import { ActiveUsersComponent } from './active-users/active-users.component';

@NgModule({
  declarations: [
    ManageUsersComponent,
    ManageServicesComponent,
    ManageReportComponent,
    HomeComponent,
    AsiderbarComponent,
    HeaderComponent,
    MessagesComponent,
    ManageHomeComponent,
    UsersComponent,
    PurchaseComponent,
    TestimonialsComponent,
    AdminProfileComponent,
    CreateNewServiceComponent,
    EmailComposeComponent,
    PieChartComponent,
    EmaiContactusComponent,
    ActiveUsersComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgChartsModule
    ]
})
export class AdminModule { }
