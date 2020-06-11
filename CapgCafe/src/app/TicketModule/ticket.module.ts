import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RaiseTicketComponent } from './raise-ticket/raise-ticket.component';
import { TicketRoutingModule } from './ticket-routing.module';

import { SubmitResponseComponent} from './submit-response/submit-response.component';
import { CheckTicketComponent } from './check-ticket/check-ticket.component';

import { ReviewsComponent } from './reviews/reviews.component';



@NgModule({
  declarations: [
    RaiseTicketComponent,
    SubmitResponseComponent,
    CheckTicketComponent,
    ReviewsComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TicketRoutingModule
  ],
  exports: [
    TicketRoutingModule,
    RaiseTicketComponent,
    SubmitResponseComponent,
    CheckTicketComponent,
    ReviewsComponent

  ]
})
export class TicketModule { }

