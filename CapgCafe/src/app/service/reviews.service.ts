import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reviews } from '../shared/reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(private httpClient: HttpClient) {
  }

  AddReview(reviews: Reviews): Observable<boolean> {
    console.log(reviews);

    return this.httpClient.post<boolean>('http://localhost:2048/api/reviews', reviews);
  }

  ChangeReview(reviews: Reviews): Observable<boolean> {
    return this.httpClient.put<boolean>(`/api/reviews`, reviews);
  }



  private baseUrl = 'http://localhost:2048/updateReview';
  UpdateReview(reviews: Reviews, rating_id: number): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.baseUrl}/${rating_id}`, reviews);
  }

  // UpdateReview(reviews: Reviews): Observable<boolean> {
  //   return this.httpClient.put<boolean>(`/api/reviews`, reviews);
  // }


  GetReviewByEmpId(empId: number): Observable<any> {
    return this.httpClient.get<Reviews[]>("http://localhost:2048/getReviewByEmpId/" + empId);
  }

  DeleteReview(rating_id: number): Observable<boolean> {

    return this.httpClient.delete<boolean>("http://localhost:2048/api/reviews/" + rating_id);
  }

  GetAllReviews(): Observable<Reviews[]> {
    return this.httpClient.get<Reviews[]>("http://localhost:2048/api/reviews/all");
  }


  GetReviewByRatingID(Rating_ID: number): Observable<Reviews> {
    return this.httpClient.get<Reviews>(`/api/review?rating_id=${Rating_ID}`);
  }


  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}



