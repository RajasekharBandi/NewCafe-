import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CafeMenuService } from '../service/cafeMenu.service';
import { CafeMenu } from '../shared/cafeMenu';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css']
})
export class ReviewOrderComponent implements OnInit {

  qty: number[] = [];
  price: number[] = [];
  @Input() menuList: CafeMenu[] = [];
  finalOrder: CafeMenu[] = [];
  totalAmt: number;
  constructor(private router: Router, private service: CafeMenuService) { }

  ngOnInit() {
    this.getfinalOrder();
  }

  getfinalOrder() {
    this.finalOrder = this.service.getFinalOrder();
    this.totalAmt = (this.finalOrder[0].item_price * this.finalOrder[0].item_id) + (this.finalOrder[1].item_price * this.finalOrder[1].item_id) + (this.finalOrder[2].item_price * this.finalOrder[2].item_id) +
      (this.finalOrder[3].item_price * this.finalOrder[3].item_id) + (this.finalOrder[4].item_price * this.finalOrder[4].item_id) + (this.finalOrder[5].item_price * this.finalOrder[5].item_id);
  }

  payment() {

    if (this.totalAmt > 0) {
      return true;
    }
    else {
      return false;
    }
  }

}