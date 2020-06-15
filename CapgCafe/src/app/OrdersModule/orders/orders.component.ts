import { Component, OnInit } from '@angular/core';
import { Orders } from '../../shared/orders';
import { OrdersService } from '../../service/orders.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { Employee } from 'src/app/shared/employee';
import { Router } from '@angular/router';
import { CafecapgeminiComponentBase } from 'src/app/CafeCapgemini-component';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
    orders: Orders[] = [];
    showOrdersSpinner: boolean = false;
    viewOrdersCheckBoxes: any;

    sortBy: string = "order_id";
    sortDirection: string = "ASC";

    newOrdersForm: FormGroup;
    newOrdersDisabled: boolean = false;
    newOrdersFormErrorMessages: any;

    editOrderForm: FormGroup;
    editOrderDisabled: boolean = false;
    editOrderFormErrorMessages: any;

    deleteOrderForm: FormGroup;
    deleteOrderDisabled: boolean = false;
    buttondiabled: boolean;

    constructor(private ordersService: OrdersService, private router: Router) {
        // super();
        this.newOrdersForm = new FormGroup({
            order_location: new FormControl(null, [Validators.required]),
            order_date: new FormControl(null),
            payment_type: new FormControl(null, [Validators.required]),
        });

        this.newOrdersFormErrorMessages = {
            order_location: { required: "Location can't be blank" },
            // order_date: { required: "Date can't be blank" },
            payment_type: { required: "Payment Type can't be blank" },
        };



        this.editOrderForm = new FormGroup({
            order_location: new FormControl(null, [Validators.required]),
            order_date: new FormControl(null, [Validators.required]),
            payment_type: new FormControl(null, [Validators.required]),
            order_id: new FormControl(null),

        });

        this.editOrderFormErrorMessages = {
            order_location: { required: "Location can't be blank" },
            order_date: { required: "Date can't be blank" },
            payment_type: { required: "Payment Type can't be blank" },
        };

        this.viewOrdersCheckBoxes = {
            empId: true,
            order_id: true,
            payment_type: true,
            order_date: true,
            order_location: true
        };

        this.deleteOrderForm = new FormGroup({
            order_id: new FormControl(null),
            order_date: new FormControl(null)
        });
    }

    ngOnInit() {
        this.showOrdersSpinner = true;
        var empId: number = JSON.parse(localStorage.getItem('empId'));
        var empType: string = localStorage.getItem('empType');
        if (empType == "ADMIN") {
            this.ordersService.GetAllOrders().subscribe((response) => {
                if (response != null && response.length > 0) {
                    this.orders = response;
                    this.buttondiabled=true;
                }
                this.showOrdersSpinner = false;
            }, (error) => {
                console.log(error);
            })
        }
        else {
            this.ordersService.GetOrderByEmpId(empId).subscribe((response) => {
                if (response != null && response.length > 0) {
                    this.orders = response;
                }
                this.showOrdersSpinner = false;
            }, (error) => {
                console.log(error);
            })
        }
    }

    onCreateOrdersClick() {
        this.newOrdersForm.reset();
        this.newOrdersForm["submitted"] = false;
    }

    onAddOrdersClick(event) {
        this.newOrdersForm["submitted"] = true;
        if (this.newOrdersForm.valid) {
            this.newOrdersDisabled = true;
            var order: Orders = this.newOrdersForm.value;
            order.empId = JSON.parse(localStorage.getItem('empId'));
            var today = new Date();
            var date = today.getDate();
            if(date<10) {
                date = 0 + date;
            }
            var month = today.getMonth() + 1;
            if(month<10) {
                month = 0 + month;
            }
            var year = today.getFullYear();
            var current_date = date + '/' + month + '/' + year;
            order.order_date = current_date;

            this.ordersService.AddOrder(order).subscribe((addResponse) => {
                this.newOrdersForm.reset();
                $("#btnAddOrdersCancel").trigger("click");
                this.newOrdersDisabled = false;
                this.showOrdersSpinner = true;

                this.ordersService.GetOrderByEmpId(order.empId).subscribe((response) => {
                    if (response != null && response.length > 0) {
                        this.orders = response;
                    }
                    this.showOrdersSpinner = false;
                }, (error) => {
                    console.log(error);
                })
            },
                (error) => {
                    console.log(error);
                    this.newOrdersDisabled = false;
                });
        }
        
    }

    onViewOrderDetailsClick(index) {
        var order_id: number = this.orders[index].order_id
        this.router.navigate(['orders/details', order_id])
    }

    onRaiseTicketClick(index) {
        localStorage.setItem('order_id', JSON.stringify(this.orders[index].order_id));
        this.router.navigate(['ticket/raise-ticket']);
    }

    getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
        return {
            'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
            'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
        };
    }

    getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
        return this.newOrdersFormErrorMessages[formControlName][validationProperty];
    }

    getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
        return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
    }



    onEditOrdersClick(index) {
        this.editOrderForm.reset();
        this.editOrderForm["submitted"] = false;
        this.editOrderForm.patchValue({
            order_id: this.orders[index].order_id,
            order_location: this.orders[index].order_location,
            order_date: this.orders[index].order_date,
            payment_type: this.orders[index].payment_type
        });
    }

    onUpdateOrdersClick(event) {
        this.editOrderForm["submitted"] = true;
        if (this.editOrderForm.valid) {
            this.editOrderDisabled = true;
            var order: Orders = this.editOrderForm.value;

            this.ordersService.UpdateOrder(order, order.order_id).subscribe((updateResponse) => {
                this.editOrderForm.reset();
                $("#btnUpdateOrderCancel").trigger("click");
                this.editOrderDisabled = false;
                this.showOrdersSpinner = true;
                order.empId = JSON.parse(localStorage.getItem('empId'));

                this.ordersService.GetOrderByEmpId(order.empId).subscribe((response) => {
                    if (response != null && response.length > 0) {
                        this.orders = response;
                    }
                    this.showOrdersSpinner = false;
                }, (error) => {
                    console.log(error);
                })
            },
                (error) => {
                    console.log(error);
                    this.editOrderDisabled = false;
                });
        }
    }



    onDeleteOrdersClick(index) {
        this.deleteOrderForm.reset();
        this.deleteOrderForm["submitted"] = false;
        this.deleteOrderForm.patchValue({
            order_id: this.orders[index].order_id,
            order_date: this.orders[index].order_date
        });
    }

    onDeleteOrderConfirmClick(event) {
        this.deleteOrderForm["submitted"] = true;
        if (this.deleteOrderForm.valid) {
            this.deleteOrderDisabled = true;
            var order: Orders = this.deleteOrderForm.value;

            this.ordersService.DeleteOrder(order.order_id).subscribe((deleteResponse) => {
                this.deleteOrderForm.reset();
                $("#btnDeleteOrderCancel").trigger("click");
                this.deleteOrderDisabled = false;
                this.showOrdersSpinner = true;

                order.empId = JSON.parse(localStorage.getItem('empId'));

                this.ordersService.GetOrderByEmpId(order.empId).subscribe((response) => {
                    if (response != null && response.length > 0) {
                        this.orders = response;
                    }
                    this.showOrdersSpinner = false;
                }, (error) => {
                    console.log(error);
                })
            },
                (error) => {
                    console.log(error);
                    this.deleteOrderDisabled = false;
                });
        }
    }



    onViewSelectAllClick() {
        for (let propertyName of Object.keys(this.viewOrdersCheckBoxes)) {
            this.viewOrdersCheckBoxes[propertyName] = true;
        }
    }

    onViewDeselectAllClick() {
        for (let propertyName of Object.keys(this.viewOrdersCheckBoxes)) {
            this.viewOrdersCheckBoxes[propertyName] = false;
        }
    }

    onBtnSortClick() {
        this.orders.sort((a, b) => {
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
