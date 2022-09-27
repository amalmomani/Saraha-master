import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/Services/report.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-manage-report',
  templateUrl: './manage-report.component.html',
  styleUrls: ['./manage-report.component.css']
})
export class ManageReportComponent implements OnInit {

  constructor(public report:ReportService,public userService : UserService,private route:Router) { }

  ngOnInit(): void {
    this.report.getAllUserReport();
  }
  changeBlockStatus(loginId:number,blockStatus:number){
    console.log(loginId);
    this.userService.changeBlockUserStatus(loginId,blockStatus);
  }
  contactrepory(id:number){
    this.route.navigate(['/admin/compose/',id])
  }
  // [routerLink]="['/admin/compose/']"
}
