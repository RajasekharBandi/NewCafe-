import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CafelistService } from '../service/cafelist.service';
import { CafeDetails } from '../shared/cafeDetails';

@Component({
  selector: 'app-show-cafe',
  templateUrl: './show-cafe.component.html',
  styleUrls: ['./show-cafe.component.css']
})
export class ShowCafeComponent implements OnInit {

  constructor(private router: Router, private service: CafelistService) { }

  cafeListData:any[];

  ngOnInit() {//4
    var cafeList = this.service.getLocSelectedCafe();
    cafeList.subscribe((cafeListData) =>this.cafeListData = cafeListData)
  }
  

}




