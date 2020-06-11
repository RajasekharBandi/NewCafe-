import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../shared/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  constructor(private httpClient: HttpClient) {
  }

  AddTicket(ticket: Ticket): Observable<boolean> {
    console.log(ticket);

    return this.httpClient.post<boolean>('http://localhost:2048/api/tickets', ticket);
  }
  ChangeTicketStatus(ticket: Ticket): Observable<boolean> {
    return this.httpClient.put<boolean>(`/api/tickets`, ticket);
  }


  private baseUrl = 'http://localhost:2048/updateTicket';
  UpdateTicket(ticket: Ticket, ticket_number: number): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.baseUrl}/${ticket_number}`, ticket);
  }

  // UpdateTicket(ticket: Ticket): Observable<boolean> {
  //   return this.httpClient.put<boolean>(`/api/tickets`, ticket);
  // }

  DeleteTicket(ticket_number: number): Observable<boolean> {

    return this.httpClient.delete<boolean>("http://localhost:2048/api/tickets/" + ticket_number);
  }


  GetTicketByEmpId(empId: number): Observable<any> {
    return this.httpClient.get<Ticket[]>("http://localhost:2048/getTicketByEmpId/" + empId);
  }

  GetAllTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>("http://localhost:2048/api/tickets/all");

  }

  GetTicketByTicketNumber(Ticket_Number: number): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>("http://localhost:2048/api/tickets?=${Ticket_Number}");
  }

  GetTicketByOrderID(Order_Id: number): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>("http://localhost:2048/api/tickets?order_id=${Order_Id}");
  }


  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}



