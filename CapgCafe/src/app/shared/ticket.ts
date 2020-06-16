
// created by Sowrasree Banerjee

import { Orders } from './orders';

// Model class for Ticket
export class Ticket {
    ticket_number: number;
    order_id: number;
    status: string;
    ticket_date: string;
    ticket_location: string;
    empId: number;
    query:string;
  
    
  
    constructor(Ticket_Number: number,Order_Id: number, Status: string, Ticket_Date: string, Ticket_Location: string, Employee_ID: number,query:string) {
      this.ticket_number= Ticket_Number;
      this.order_id= Order_Id;
      this.status = Status;
      this.ticket_date= Ticket_Date;
      this.ticket_location = Ticket_Location;
      this.empId = Employee_ID;
      this.query = query;
    }
  }