import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { LogOutComponent } from './log-out/log-out.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UpdateProfileComponent } from './forget-password/update-profile.component';
import { RegisterComponent } from './register/register.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { AdminDeskComponent } from './admin-desk/admin-desk.component';
import { OrdersModule } from './OrdersModule/orders.module';
import { TicketModule } from './TicketModule/ticket.module';
import { SelectLocationComponent } from './select-location/select-location.component';
import { PaymentComponent } from './payment/payment.component';
import { ShowCafeComponent } from './show-cafe/show-cafe.component';
import { ShowCafeMenuComponent } from './show-cafe-menu/show-cafe-menu.component';
import { AuthenticationService } from './service/authentication.service';
import { CafelistService } from './service/cafelist.service';
import { CafeMenuService } from './service/cafeMenu.service';
import { DetailsService } from './service/details.service';
import { OrdersService } from './service/orders.service';
import { ReviewsService } from './service/reviews.service';
import { TicketsService } from './service/tickets.service';
import { ReviewOrderComponent } from './review-order/review-order.component';
import { CafeListComponent } from './cafe-list/cafe-list.component';



@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    LogOutComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    UpdateProfileComponent,
    RegisterComponent,
    SiteMapComponent,
    ContactComponent,
    AboutComponent,
    AdminDeskComponent,

    SelectLocationComponent,
    PaymentComponent,
    ShowCafeComponent,
    ShowCafeMenuComponent,
    ReviewOrderComponent,
    CafeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    OrdersModule,
    TicketModule
  ],
  providers: [AuthenticationService,CafelistService,CafeMenuService,DetailsService,OrdersService,ReviewsService,TicketsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
