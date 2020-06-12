import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CafeMenu } from '../shared/cafeMenu';

@Injectable({
    providedIn: 'root'
})
export class CafeMenuService {

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

    reviewOrderMenu(menuList?: CafeMenu[]) {
         for (let i of menuList) { console.log(i) }
        return menuList;
    }

    reviewOrderQty(qty?: number[]) {
         for (let j of qty) { console.log(j) }
        return qty;
    }
    reviewOrderPrice(price?: number[]) {
         for (let k of price) { console.log(k) }
        return price;
    }

}




