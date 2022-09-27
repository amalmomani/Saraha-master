import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private login:LoginService) { }

  ngOnInit(): void {
    this.login.checkIfLoginOrNot();
    this.login.logout();
  }

}
