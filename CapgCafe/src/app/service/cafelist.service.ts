import { Injectable } from '@angular/core';
import { CafeDetails } from '../shared/cafeDetails';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../shared/orders';
import { OrdersService } from '../service/orders.service';



@Injectable({
  providedIn: 'root'
})
export class CafelistService {

  tempLocation: string;
  //newOrder:Orders;

  constructor(private http:HttpClient,private service: OrdersService) { }
  

  getData(date: string, paymentType: string, totalAmt: string, empId: number) {
    var newOrder = new Orders(1011, this.tempLocation, date, paymentType, totalAmt, empId);
    this.service.AddOrder(newOrder).subscribe((addResponse) =>{console.log(addResponse)})
  }

  sendLocation(location?: any) { //2
    this.tempLocation = location;

  }

  getLocSelectedCafe(): Observable<CafeDetails[]> {//5
    return this.http.get<CafeDetails[]>('http://localhost:2048/cafe/search-cafe-byLocation/' + this.tempLocation);
  }

}