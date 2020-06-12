import { Component, OnInit } from '@angular/core';
import { CafeMenuService } from '../service/cafeMenu.service';
import { Router } from '@angular/router';
import { CafeMenu } from '../shared/cafeMenu';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-show-cafe-menu',
  templateUrl: './show-cafe-menu.component.html',
  styleUrls: ['./show-cafe-menu.component.css']
})
export class ShowCafeMenuComponent implements OnInit {
  form: FormGroup;
  public href: string = "";
  menuList: CafeMenu[] = [];
  submitted = false;
  currentId: number;
  qty: number[] = [];
  price: number[] = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private service: CafeMenuService ) { }

  ngOnInit() {
    this.href = this.router.url;
    var temp = this.router.url.substring(10);
    var cafeId: number = +temp;
    this.currentId = cafeId;
    this.getMenu();
    this.getFormData();
  }

  getMenu() {
    this.service.getMenuItemsBycafeId(this.currentId).subscribe((data) => {
      this.menuList = data
    });

  }

  getFormData() {

    this.form = this.formBuilder.group({
      item0: [''],
      item1: [''],
      item2: [''],
      item3: [''],
      item4: [''],
      item5: ['']
    });
  }

  get htmlData() { return this.form.controls; }

  onSubmit() {
    this.qty[0] = this.htmlData.item0.value;
    this.qty[1] = this.htmlData.item1.value;
    this.qty[2] = this.htmlData.item2.value;
    this.qty[3] = this.htmlData.item3.value;
    this.qty[4] = this.htmlData.item4.value;
    this.qty[5] = this.htmlData.item5.value;
    this.price[0] = +this.menuList[0].item_price;
    this.price[1] = +this.menuList[1].item_price;
    this.price[2] = +this.menuList[2].item_price;
    this.price[3] = +this.menuList[3].item_price;
    this.price[4] = +this.menuList[4].item_price;
    this.price[5] = +this.menuList[5].item_price;

    var totalAmt = (this.qty[0] * this.price[0]) + (this.qty[1] * this.price[1]) + (this.qty[2] * this.price[2]) + (this.qty[3] * this.price[3]) + (this.qty[4] * this.price[4]) + (this.qty[5] * this.price[5]);
    console.log(totalAmt + " Total")
    this.service.reviewOrderMenu(this.menuList);
    this.service.reviewOrderQty(this.qty);
    this.service.reviewOrderPrice(this.price);
    this.router.navigate(['reviewOrdrer'])

  }
}