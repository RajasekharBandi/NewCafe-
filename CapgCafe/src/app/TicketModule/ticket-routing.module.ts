import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaiseTicketComponent } from './raise-ticket/raise-ticket.component';
import { SubmitResponseComponent} from './submit-response/submit-response.component';
import { CheckTicketComponent } from './check-ticket/check-ticket.component';

import { ReviewsComponent } from './reviews/reviews.component';


// import { CandidatesComponent } from './candidates/candidates.component';
// import { YourprofileComponent } from './yourprofile/yourprofile.component';
//import { ProductsComponent } from './products/products.component';
CheckTicketComponent
const routes: Routes = [
  { path: "raiseTicket", component: RaiseTicketComponent },
  { path: "submit-response", component: SubmitResponseComponent},
  { path: "check-ticket", component: CheckTicketComponent },
  { path: "reviews", component: ReviewsComponent },
  


  { path: "**", redirectTo: '/raiseTicket', pathMatch: 'full' },
  { path: "**", redirectTo: '/reviews', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }


