import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/Services/purchase.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  u:any=[{}]

  constructor( public purchase:PurchaseService, public User:UserService){}

   ngOnInit(): void {
    this.purchase.GetAll();
   // this.User.getAll();
   this.User.getAll();
   this.purchase.GetOrders();
  }
}
