import { Component, OnInit } from '@angular/core';
import { CafeMenuService } from '../service/cafeMenu.service';
import { Router } from '@angular/router';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-show-cafe-menu',
  templateUrl: './show-cafe-menu.component.html',
  styleUrls: ['./show-cafe-menu.component.css']
})
export class ShowCafeMenuComponent implements OnInit {

  public href: string = "";
  menuList: any[];

  constructor(private router: Router, private service: CafeMenuService) { }

  ngOnInit() {
    this.href = this.router.url;
    var temp = this.router.url.substring(10);
    var cafeId: number = +temp;
    this.service.getMenuItemsBycafeId(cafeId).subscribe((menuList) => this.menuList = menuList)

  }

}
