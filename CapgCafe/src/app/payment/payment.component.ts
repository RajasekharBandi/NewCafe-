import { Component, OnInit } from '@angular/core';
import { CafeMenuService } from '../service/cafeMenu.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  totalAmt : number = 0;

  constructor(private service: CafeMenuService ) { }

  ngOnInit() {

this.getTotalAmt();    

  }

  getTotalAmt(){
    console.log(this.totalAmt)
  }
}
