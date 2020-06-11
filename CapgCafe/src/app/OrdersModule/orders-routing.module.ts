import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
    { path: "orders", component: OrdersComponent },
    { path: "details", component: DetailsComponent },
    { path: "details/:order_id", component: DetailsComponent },

    { path: "**", redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule { }


