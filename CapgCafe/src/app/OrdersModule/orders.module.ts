import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrdersRoutingModule } from './orders-routing.module';

import { OrdersComponent } from './orders/orders.component';
import { DetailsComponent } from './details/details.component';



@NgModule({
    declarations: [
        OrdersComponent,
        DetailsComponent

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OrdersRoutingModule
    ],
    exports: [
        OrdersRoutingModule,
        OrdersComponent,
        DetailsComponent

    ]
})
export class OrdersModule { }

