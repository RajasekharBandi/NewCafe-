import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LogInComponent } from './log-in/log-in.component';
import { LogOutComponent } from './log-out/log-out.component';
import { UpdateProfileComponent } from './forget-password/update-profile.component';
import { RegisterComponent } from './register/register.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { AdminDeskComponent } from './admin-desk/admin-desk.component';
import { SelectLocationComponent } from './select-location/select-location.component';
import { PaymentComponent } from './payment/payment.component';
import { ShowCafeComponent } from './show-cafe/show-cafe.component';
import { ShowCafeMenuComponent } from './show-cafe-menu/show-cafe-menu.component';
import { ReviewOrderComponent } from './review-order/review-order.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LogInComponent },
  { path: 'logout', component: LogOutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgetPassword', component: UpdateProfileComponent },
  { path: 'map', component: SiteMapComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'adminDesk', component: AdminDeskComponent },
  { path: "orders", loadChildren: () => import("./OrdersModule/orders.module").then(m => m.OrdersModule) },
  { path: "ticket", loadChildren: () => import("./TicketModule/ticket.module").then(m => m.TicketModule) },
  { path: 'location', component: SelectLocationComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'showcafe', component: ShowCafeComponent },
  { path: 'showmenu/:cafe_id', component: ShowCafeMenuComponent },
  { path: 'reviewOrdrer', component: ReviewOrderComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }