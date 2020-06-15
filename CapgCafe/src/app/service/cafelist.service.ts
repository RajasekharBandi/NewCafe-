import { Injectable } from '@angular/core';
import { CafeDetails } from '../shared/cafeDetails';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../shared/orders';


@Injectable({
  providedIn: 'root'
})
export class CafelistService {

  tempLocation: string;
  //newOrder:Orders;

  constructor(private httpClient: HttpClient) {
  }

  getData(date: string, paymentType: string, totalAmt: string, empId: number) {
    var newOrder = new Orders(1011, this.tempLocation, date, paymentType, totalAmt, empId);
    console.log(newOrder);
    this.httpClient.post('http://localhost:2048/addOrders', newOrder);
    console.log("I am here again")
    //this.AddOrder(newOrder);
  }

  sendLocation(location?: any) { //2
    this.tempLocation = location;

  }

  getLocSelectedCafe(): Observable<CafeDetails[]> {//5
    return this.httpClient.get<CafeDetails[]>('http://localhost:2048/cafe/search-cafe-byLocation/' + this.tempLocation);
  }

}