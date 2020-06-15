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
  totalAmt:number;


  childmessage : string = "I am passed from Parent to child component"

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
    
    this.menuList[0].item_id=this.qty[0];
    this.menuList[1].item_id=this.qty[1];
    this.menuList[2].item_id=this.qty[2];
    this.menuList[3].item_id=this.qty[3];
    this.menuList[4].item_id=this.qty[4];
    this.menuList[5].item_id=this.qty[5];
    
    this.service.finalOrder(this.menuList);
    this.router.navigate(['reviewOrdrer'])

  }
}