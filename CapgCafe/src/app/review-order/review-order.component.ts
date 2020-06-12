import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CafeMenuService } from '../service/cafeMenu.service';
import { CafeMenu } from '../shared/cafeMenu';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.scss']
})
export class ReviewOrderComponent implements OnInit {
  qty: number[] = [];
  price: number[] = [];
  menuList: CafeMenu[] = [];
  constructor(private router: Router, private service: CafeMenuService) { }

  ngOnInit() {
    this.menuList = this.service.reviewOrderMenu();
    this.qty = this.service.reviewOrderQty();
    this.price = this.service.reviewOrderPrice();

     console.log("I am here");
    // for (let i of this.menuList) { console.log(i) }
    console.log()
   // for (let j of this.qty) { console.log(j) }
    console.log()
   // for (let k of this.price) { console.log(k) }
  }

}