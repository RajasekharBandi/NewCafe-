import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Details } from '../shared/details';

@Injectable({
    providedIn: 'root'
})
export class DetailsService {
    constructor(private httpClient: HttpClient) {
    }

    AddOrderDetails(details: Details): Observable<boolean> {
        console.log(details);

        return this.httpClient.post<boolean>('http://localhost:2048/addOrderDetails', details);
    }

    private baseUrl = 'http://localhost:2048/updateOrderDetails';
    UpdateOrderDetails(orders: Details, id: number): Observable<boolean> {
        return this.httpClient.put<boolean>(`${this.baseUrl}/${id}`, orders);
    }

    DeleteOrderDetails(id: number): Observable<boolean> {

        return this.httpClient.delete<boolean>("http://localhost:2048/deleteOrderDetails/" + id);
    }

    GetAllOrderDetails(): Observable<Details[]> {
        return this.httpClient.get<Details[]>("http://localhost:2048/getOrderDetails/all");
    }

    GetOrderDetailsById(id: number): Observable<any> {
        return this.httpClient.get<Details[]>("http://localhost:2048/getOrderDetailsById/" + id);
    }

    GetOrderDetailsByDetailId(id: number): Observable<any> {
        return this.httpClient.get<Details[]>("http://localhost:2048/getOrderDetailsByDetailId/" + id);
    }

}



