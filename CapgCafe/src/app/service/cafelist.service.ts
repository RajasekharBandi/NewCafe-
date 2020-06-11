import { Injectable } from '@angular/core';
import { CafeDetails } from '../shared/cafeDetails';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CafelistService {

  tempLocation: string;

  constructor(private httpClient: HttpClient) {
  }

  sendLocation(location: any) { //2
    this.tempLocation = location;
  }

  getLocSelectedCafe():Observable<CafeDetails[]> {//5
    return this.httpClient.get<CafeDetails[]>('http://localhost:2048/cafe/search-cafe-byLocation/' + this.tempLocation);
  }

}