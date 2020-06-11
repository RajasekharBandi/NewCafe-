import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../shared/ticket';
import { TicketsService } from '../../service/tickets.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { CafecapgeminiComponentBase } from '../../CafeCapgemini-component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-raise-ticket',
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.scss']
})
export class RaiseTicketComponent extends CafecapgeminiComponentBase implements OnInit {
  tickets: Ticket[] = [];
  showTicketsSpinner: boolean = false;
  viewTicketCheckBoxes: any;
  tickets1: Ticket = new Ticket(0, 0, null, null, null, 0);

  sortBy: string = "order_id";
  sortDirection: string = "ASC";

  newTicketForm: FormGroup;
  newTicketDisabled: boolean = false;
  newTicketFormErrorMessages: any;

  editTicketForm: FormGroup;
  editTicketDisabled: boolean = false;
  editTicketFormErrorMessages: any;

  deleteTicketForm: FormGroup;
  deleteTicketDisabled: boolean = false;

  constructor(private ticketsService: TicketsService, private route: ActivatedRoute) {
    super();
    this.newTicketForm = new FormGroup({
      empId: new FormControl(null),
      ticket_number: new FormControl(null),
      order_id: new FormControl(null),
      status: new FormControl(null, [Validators.required]),
      ticket_date: new FormControl(null, [Validators.required]),
      ticket_location: new FormControl(null, [Validators.required])
    });

    this.newTicketFormErrorMessages = {
      order_id: { required: "Order Id can't be blank" },
      empId: { required: "Employee Id can't be blank" },
      status: { required: "Status can't be blank" },
      ticket_date: { required: "date can't be blank" },
      ticket_location: { required: "Password can't be blank" }
    };



    this.editTicketForm = new FormGroup({
      ticket_number: new FormControl(null),
      empId: new FormControl(null),
      order_id: new FormControl(null),
      status: new FormControl(null, [Validators.required]),
      ticket_date: new FormControl(null, [Validators.required]),
      ticket_location: new FormControl(null, [Validators.required])

    });

    this.editTicketFormErrorMessages = {
      order_id: { required: "Order Id can't be blank" },
      empId: { required: "Status can't be blank" },
      status: { required: "Status can't be blank" },
      ticket_date: { required: "date can't be blank" },
      ticket_location: { required: "Password can't be blank" }
    };

    this.viewTicketCheckBoxes = {
      order_id: true,
      status: true,
      ticket_date: true,
      ticket_location: true
    };

    this.deleteTicketForm = new FormGroup({
      empId: new FormControl(null),
      ticket_number: new FormControl(null),
      status: new FormControl(null)
    });
  }

  // ngOnInit() {
  //   this.showTicketsSpinner = true;
  //   this.ticketsService.GetAllTickets().subscribe((response) => {
  //     this.tickets = response;
  //     this.showTicketsSpinner = false;
  //   }, (error) => {
  //       console.log(error);
  //     })
  // }

  ngOnInit() {
    this.showTicketsSpinner = true;
    var empId: number = JSON.parse(localStorage.getItem('empId'));
    var empType: string = localStorage.getItem('empType');
    if (empType == "ADMIN") {
      this.ticketsService.GetAllTickets().subscribe((response) => {
        if (response != null && response.length > 0) {
          this.tickets = response;
        }
        this.showTicketsSpinner = false;
      }, (error) => {
        console.log(error);
      })
    }
    else {
      this.ticketsService.GetTicketByEmpId(empId).subscribe((response) => {
        if (response != null && response.length > 0) {
          this.tickets = response;
        }
        this.showTicketsSpinner = false;
      }, (error) => {
        console.log(error);
      })
    }
  }

  onCreateTicketClick() {
    this.newTicketForm.reset();
    this.newTicketForm["submitted"] = false;
  }

  onAddTicketClick(event) {
    this.newTicketForm["submitted"] = true;
    if (this.newTicketForm.valid) {
      this.newTicketDisabled = true;
      var ticket: Ticket = this.newTicketForm.value;
      ticket.empId = JSON.parse(localStorage.getItem('empId'));
      ticket.order_id = JSON.parse(localStorage.getItem('order_id'));

      this.ticketsService.AddTicket(ticket).subscribe((_addResponse) => {
        this.newTicketForm.reset();
        $("#btnAddTicketCancel").trigger("click");
        this.newTicketDisabled = false;
        this.showTicketsSpinner = true;

        this.ticketsService.GetTicketByEmpId(ticket.empId).subscribe((response) => {
          if (response != null && response.length > 0) {
            this.tickets = response;
          }
          this.showTicketsSpinner = false;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.newTicketDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.newTicketForm);
    }
  }



  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }

  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.newTicketFormErrorMessages[formControlName][validationProperty];
  }

  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }



  onEditTicketClick(index) {
    this.editTicketForm.reset();
    this.editTicketForm["submitted"] = false;
    this.editTicketForm.patchValue({

      ticket_number: this.tickets[index].ticket_number,
      empId: this.tickets[index].ticket_number,
      order_id: this.tickets[index].order_id,
      status: this.tickets[index].status,
      ticket_date: this.tickets[index].ticket_date,
      ticket_location: this.tickets[index].ticket_location
    });
  }

  onUpdateTicketClick(event) {
    this.editTicketForm["submitted"] = true;
    if (this.editTicketForm.valid) {
      this.editTicketDisabled = true;
      var ticket: Ticket = this.editTicketForm.value;

      this.ticketsService.UpdateTicket(ticket, ticket.ticket_number).subscribe((updateResponse) => {
        this.editTicketForm.reset();
        $("#btnUpdateTicketCancel").trigger("click");
        this.editTicketDisabled = false;
        this.showTicketsSpinner = true;

        this.ticketsService.GetAllTickets().subscribe((getResponse) => {
          this.showTicketsSpinner = false;
          this.tickets = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.editTicketDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.editTicketForm);
    }
  }



  onDeleteTicketClick(index) {
    this.deleteTicketForm.reset();
    this.deleteTicketForm["submitted"] = false;
    this.deleteTicketForm.patchValue({
      ticket_number: this.tickets[index].ticket_number,
      empId: this.tickets[index].ticket_number,
      status: this.tickets[index].status
    });
  }

  onDeleteTicketConfirmClick(event) {
    this.deleteTicketForm["submitted"] = true;
    if (this.deleteTicketForm.valid) {
      this.deleteTicketDisabled = true;
      var ticket: Ticket = this.deleteTicketForm.value;

      this.ticketsService.DeleteTicket(ticket.ticket_number).subscribe((deleteResponse) => {
        this.deleteTicketForm.reset();
        $("#btnDeleteTicketCancel").trigger("click");
        this.deleteTicketDisabled = false;
        this.showTicketsSpinner = true;

        this.ticketsService.GetAllTickets().subscribe((getResponse) => {
          this.showTicketsSpinner = false;
          this.tickets = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.deleteTicketDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.deleteTicketForm);
    }
  }



  onViewSelectAllClick() {
    for (let propertyName of Object.keys(this.viewTicketCheckBoxes)) {
      this.viewTicketCheckBoxes[propertyName] = true;
    }
  }

  onViewDeselectAllClick() {
    for (let propertyName of Object.keys(this.viewTicketCheckBoxes)) {
      this.viewTicketCheckBoxes[propertyName] = false;
    }
  }

  onBtnSortClick() {
    this.tickets.sort((a, b) => {
      let comparison = 0;
      let value1 = ((typeof a[this.sortBy]) == 'string') ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      let value2 = ((typeof b[this.sortBy]) == 'string') ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (this.sortBy == "creationDateTime" || this.sortBy == "lastModifiedDateTime") {
        var tt = value1.split("/");
        var d1 = new Date(tt[2], tt[1], tt[0]);
        tt = value2.split("/");
        var d2 = new Date(tt[2], tt[1], tt[0]);
        if (d2 > d1) comparison = -1;
        else comparison = 1;
      }
      else {
        if (value1 < value2) {
          comparison = -1;
        }
        else if (value1 > value2) {
          comparison = 1;
        }
      }
      if (this.sortDirection == "DESC")
        comparison = comparison * -1;

      return comparison;
    });

  }
}
