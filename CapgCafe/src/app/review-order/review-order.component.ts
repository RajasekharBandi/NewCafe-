import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CafeMenuService } from '../service/cafeMenu.service';
import { CafeMenu } from '../shared/cafeMenu';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css']
})
export class ReviewOrderComponent implements OnChanges {
  

  qty: number[] = [];
  price: number[] = [];
  @Input() menuList: CafeMenu[] = [];
  constructor(private router: Router, private service: CafeMenuService) { }


  @Input()
  set menuLists(menuList : CafeMenu[] ){
      this.menuList = menuList; 
  }
  get menuLists(){
      return this.menuList;
  }

  
  ngOnChanges() {
    console.log(this.menuList)
     console.log("I am here");

  }

}