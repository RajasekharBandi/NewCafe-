import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../shared/orders';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private baseUrl = 'http://localhost:2048/updateOrders';
    constructor(private httpClient: HttpClient) {
    }

    AddOrder(orders: Orders): Observable<any> {
        return this.httpClient.post("http://localhost:2048/addOrders", orders);
    }


    UpdateOrder(orders: Orders, order_id: number): Observable<boolean> {
        return this.httpClient.put<boolean>(`${this.baseUrl}/${order_id}`, orders);
    }

    DeleteOrder(Order_id: number): Observable<boolean> {
        return this.httpClient.delete<boolean>("http://localhost:2048/deleteOrders/" + Order_id);
    }

    GetAllOrders(): Observable<Orders[]> {
        return this.httpClient.get<Orders[]>("http://localhost:2048/getOrders/all");
    }


    GetOrderByOrderID(Order_id: number): Observable<Orders> {
        return this.httpClient.get<Orders>(`/getOrdersById?order_id=${Order_id}`);
    }

    GetOrderByEmpId(empId: number): Observable<any> {
        return this.httpClient.get<Orders[]>("http://localhost:2048/getOrderByEmpId/" + empId);
    }

}



