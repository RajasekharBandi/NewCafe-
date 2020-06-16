import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CafeMenu } from '../shared/cafeMenu';

@Injectable({
    providedIn: 'root'
})
export class CafeMenuService {
   

    orderDetails: CafeMenu[] = [];  
    constructor(private httpClient: HttpClient) {
    }

    GetAllItems(): Observable<CafeMenu[]> {
        return this.httpClient.get<CafeMenu[]>("http://localhost:2048/menu/view-all-items");
    }


    GetItemByItemID(Item_Id: number): Observable<CafeMenu> {
        return this.httpClient.get<CafeMenu>("http://localhost:2048/getItemByItemId/" + Item_Id);
    }


    getMenuItemsBycafeId(cafe_Id: number): Observable<CafeMenu[]> {
        return this.httpClient.get<CafeMenu[]>("http://localhost:2048/menu/search-Menu-By-Cafe-Id/" + cafe_Id);
    }

    finalOrder(order?: CafeMenu[]) {
        this.orderDetails = order;
    }

    getFinalOrder(): CafeMenu[]{
        return this.orderDetails;
    }

}




