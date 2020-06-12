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
  constructor(private formBuilder: FormBuilder, private router: Router, private service: CafeMenuService) { }

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

getFormData(){

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

    console.log(this.htmlData.item0.value)
    console.log(this.htmlData.item1.value)
    console.log(this.htmlData.item2.value)
    console.log(this.htmlData.item3.value)
    console.log(this.htmlData.item4.value)
    console.log(this.htmlData.item5.value)

  }

}


