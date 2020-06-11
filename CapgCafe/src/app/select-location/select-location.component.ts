import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CafelistService } from '../service/cafelist.service';
import { CafeListComponent } from '../cafe-list/cafe-list.component';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.css']
})
export class SelectLocationComponent implements OnInit {

  constructor(private router: Router,private service: CafelistService) { }

  ngOnInit() {
  }
  selectedLevel;
  
  data:Array<Object> = [
      {id: 0, name: "Mumbai"},
      {id: 1, name: "Pune"},
      {id: 2, name: "Bengaluru"},
      
  ];

  selected(){

    this.service.sendLocation(this.selectedLevel.name); //1

    this.router.navigate(['showcafe'])//3
  }

}
