import { Component, OnInit } from '@angular/core';
import { CafeMenuService } from '../service/cafeMenu.service';
import { CafeMenu } from '../shared/cafeMenu';
import { Orders } from '../shared/orders';
import { CafelistService } from '../service/cafelist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  totalAmt : number = 0;
  finalOrder: CafeMenu[] = [];
  payment:string;
  constructor(private router: Router,private cMService: CafeMenuService,private cLService: CafelistService ) { }


  ngOnInit() {
    this.getfinalOrder();

  }
  getfinalOrder(){
    this.finalOrder = this.cMService.getFinalOrder();
    this.totalAmt = (this.finalOrder[0].item_price * this.finalOrder[0].item_id)+(this.finalOrder[1].item_price * this.finalOrder[1].item_id)+(this.finalOrder[2].item_price * this.finalOrder[2].item_id)+
    (this.finalOrder[3].item_price * this.finalOrder[3].item_id)+(this.finalOrder[4].item_price * this.finalOrder[4].item_id)+(this.finalOrder[5].item_price * this.finalOrder[5].item_id);
  }

 payByMealCard(){
    this.payment="Meal Card";
    this.addOrder();
  }
  payByDebitCard(){
    this.payment="Debit Card";
    this.addOrder();
  }
  payByCreditCard(){
    this.payment="Credit Card";
    this.addOrder();
  }
  payByUPI(){
    this.payment="UPI";
    this.addOrder();
  }

  addOrder(){
    var today = new Date();
    var date = today.getDate();
    if(date<10) {
        date = 0 + date;
    }
    var month = today.getMonth() + 1;
    if(month<10) {
        month = 0 + month;
    }

    var year = today.getFullYear();
    var current_date = date + '/' + month + '/' + year;
    var empId = JSON.parse(localStorage.getItem('empId'));
     this.cLService.getData(current_date,this.payment,this.totalAmt.toString(),empId);
    alert("Payment Succesfull!!!")
    this.router.navigate(['home']);

  }
}
