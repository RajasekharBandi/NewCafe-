import { Component, OnInit } from '@angular/core';
import { Details } from '../../shared/details';
import { DetailsService } from '../../service/details.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import * as $ from "jquery";
import { OrdersService } from 'src/app/service/orders.service';
import { Orders } from 'src/app/shared/orders';
import { CafeMenuService } from 'src/app/service/cafeMenu.service';
import { CafeMenu } from 'src/app/shared/cafeMenu';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    details: Details[] = [];
    details1: Details[] = [];
    cafeMenus: CafeMenu[] = [];
    cafeMenu: CafeMenu = new CafeMenu(0, null, null, null,null, null,null);
    orders: Orders[] = [];
    order: Orders = new Orders(0, null, null, null, null, 0);
    showDetailsSpinner: boolean = false;
    viewDetailsCheckBoxes: any;

    sortBy: string = "id";
    sortDirection: string = "ASC";

    newDetailsForm: FormGroup;
    newDetailsDisabled: boolean = false;
    newDetailsFormErrorMessages: any;
    detailss: Details = new Details(0, null, 0, 0, 0, null, null, null);

    newPaymentForm: FormGroup;
    newPaymentDisabled: boolean = false;
    newPaymentFormErrorMessages: any;

    editDetailsForm: FormGroup;
    editDetailsDisabled: boolean = false;
    editDetailsFormErrorMessages: any;

    deleteDetailsForm: FormGroup;
    deleteDetailsDisabled: boolean = false;

    constructor(private detailsService: DetailsService, private ordersService: OrdersService, private cafeMenusService: CafeMenuService, private route: ActivatedRoute, private router: Router) {
        this.newDetailsForm = new FormGroup({
            item_id: new FormControl(null, [Validators.required]),
            item_name: new FormControl(null),
            itemType: new FormControl(null),
            item_price: new FormControl(null),
            itemTotal: new FormControl(null),
            quantity: new FormControl(1, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
        });

        this.newDetailsFormErrorMessages = {
            item_id: { required: "Item Name can't be blank" },
            quantity: { required: "Quantity can't be blank" }
        };

        this.newPaymentForm = new FormGroup({
            amount: new FormControl(null, [Validators.required]),
            // payment_type: new FormControl(null, [Validators.required]),
            nameOnCard: new FormControl(null, [Validators.required]),
            cardNumber: new FormControl(null, [Validators.required]),
            cvv: new FormControl(null, [Validators.required]),
            mobile: new FormControl(null, [Validators.required]),
            otp: new FormControl(null, [Validators.required])
        });

        this.newPaymentFormErrorMessages = {
            amount: { required: "Amount can't be blank" },
            nameOnCard: { required: "Name On Card can't be blank" },
            cardNumber: { required: "Card Number can't be blank" },
            cvv: { required: "cvv can't be blank" },
            mobile: { required: "Mobile Number can't be blank" },
            otp: { required: "otp can't be blank" }
        };

        this.editDetailsForm = new FormGroup({
            item_id: new FormControl(null, [Validators.required]),
            item_name: new FormControl(null),
            itemType: new FormControl(null),
            item_price: new FormControl(null),
            itemTotal: new FormControl(null),
            quantity: new FormControl(1, [Validators.required, Validators.pattern(/^[0-9]*$/)]),
            id: new FormControl(null),
        });

        this.editDetailsFormErrorMessages = {
            item_id: { required: "Item Name can't be blank" },
            quantity: { required: "Quantity can't be blank" }
        };

        this.viewDetailsCheckBoxes = {
            item_name: true,
            itemTotal: true,
            quantity: true,
            itemType: true,
            item_price: true,
            item_id: true
        };

        this.deleteDetailsForm = new FormGroup({
            id: new FormControl(null),
            item_name: new FormControl(null)
        });
    }

    ngOnInit() {
        this.ordersService.GetAllOrders().subscribe((response) => {
            if (response != null && response.length > 0) {
                this.orders = response;
            }
        }, (error) => {
            console.log(error);
        })
        this.cafeMenusService.GetAllItems().subscribe((response) => {
            if (response != null && response.length > 0) {
                this.cafeMenus = response;
            }
        }, (error) => {
            console.log(error);
        })
        this.showDetailsSpinner = true;
        this.detailsService.GetAllOrderDetails().subscribe((response) => {
            if (response != null && response.length > 0) {
                this.details = response;
            }
            this.showDetailsSpinner = false;
        }, (error) => {
            console.log(error);
        })
        var id: number = this.route.snapshot.params['order_id'];
        this.detailsService.GetOrderDetailsById(id).subscribe((response) => {
            if (response != null) {
                this.details1 = response;
            }
            this.showDetailsSpinner = false;
        }, (error) => {
            console.log(error);
        })
    }

    onPlaceOrdersClick() {
        this.newPaymentForm.reset();
        this.newPaymentForm["submitted"] = false;
        // var order_id: number = this.details1[index].order_id;
        var total: number = 0;
        for (let index = 0; index < this.details1.length; index++) {
            const element = this.details1[index].itemTotal;
            total += parseInt(element)
        }

        this.newPaymentForm.patchValue({
            amount: total
        });
        // alert("Order placed with  total amount of " + total);
        // this.router.navigate(['orders/orders', total])
    }

    onAddPaymentClick(event) {
        this.newPaymentForm["submitted"] = true;
        if (this.newPaymentForm.valid) {
            this.newPaymentDisabled = true;
            var payment: any = this.newPaymentForm.value;
            localStorage.setItem('id', JSON.stringify(payment.order_id));
            localStorage.setItem('total', payment.amount);
            const amount = payment.itemTotal;
            this.router.navigate(['orders/orders'])
            // this.detailss.order_id = this.route.snapshot.params['order_id'];
            // detail.order_id = this.detailss.order_id;

            // this.detailsService.AddOrderDetails(detail).subscribe((addResponse) => {
            this.newPaymentForm.reset();
            $("#btnAddPaymentCancel").trigger("click");
            this.newPaymentDisabled = false;
            this.showDetailsSpinner = true;

            //     this.detailsService.GetOrderDetailsById(this.detailss.order_id).subscribe((response) => {
            //         if (response != null) {
            //             this.details1 = response;
            //         }
            //         this.showDetailsSpinner = false;
            //     }, (error) => {
            //         console.log(error);
            //     })
            // },
            //     (error) => {
            //         console.log(error);
            //         this.newDetailsDisabled = false;
            //     });
        }
    }

    onCreateDetailsClick() {
        this.newDetailsForm.reset();
        this.newDetailsForm["submitted"] = false;
    }

    onQuantityChange(index: number) {
        // var currentFormGroup: FormGroup = (this.newDetailsForm.get('orderDetails') as FormArray).at(index) as FormGroup;
        var quantity = Number(this.newDetailsForm.get('quantity').value);
        var item_price = Number(this.newDetailsForm.get('item_price').value);
        /**
     * Creation of formula to throw total amount when quantity is entered.
     */
        this.newDetailsForm.patchValue({
            itemTotal: quantity * item_price
        });
    }

    onItemDropDownChange(index: number) {
        // var currentFormGroup: FormGroup = (this.newDetailsForm.get('orderDetails') as FormArray).at(index) as FormGroup;
        var currentitem_id = this.newDetailsForm.get('item_id').value;
        this.cafeMenusService.GetItemByItemID(currentitem_id).subscribe((response) => {
            if (response != null) {
                this.newDetailsForm.patchValue({
                    item_name: response.item_name,
                    itemType: response.item_type,
                    item_price: response.item_price,
                });
            }
        },
            (error) => {
                console.log(error);
            });
    }

    onAddDetailsClick(event) {
        this.newDetailsForm["submitted"] = true;
        if (this.newDetailsForm.valid) {
            this.newDetailsDisabled = true;
            var detail: Details = this.newDetailsForm.value;
            this.detailss.order_id = this.route.snapshot.params['order_id'];
            detail.order_id = this.detailss.order_id;

            this.detailsService.AddOrderDetails(detail).subscribe((addResponse) => {
                this.newDetailsForm.reset();
                $("#btnAddDetailsCancel").trigger("click");
                this.newDetailsDisabled = false;
                this.showDetailsSpinner = true;

                this.detailsService.GetOrderDetailsById(this.detailss.order_id).subscribe((response) => {
                    if (response != null) {
                        this.details1 = response;
                    }
                    this.showDetailsSpinner = false;
                }, (error) => {
                    console.log(error);
                })
            },
                (error) => {
                    console.log(error);
                    this.newDetailsDisabled = false;
                });
        }
    }



    getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
        return {
            'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
            'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
        };
    }

    getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
        return this.newDetailsFormErrorMessages[formControlName][validationProperty];
    }

    getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
        return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
    }



    onEditDetailsClick(index) {
        this.editDetailsForm.reset();
        this.editDetailsForm["submitted"] = false;
        this.editDetailsForm.patchValue({
            id: this.details[index].id,
            item_id: this.details[index].item_id,
            item_name: this.details[index].item_name,
            itemType: this.details[index].itemType,
            item_price: this.details[index].item_price,
            quantity: this.details[index].quantity,
            itemTotal: this.details[index].itemTotal
        });
    }

    onQuantityChange1(index: number) {
        // var currentFormGroup: FormGroup = (this.newDetailsForm.get('orderDetails') as FormArray).at(index) as FormGroup;
        var quantity = Number(this.editDetailsForm.get('quantity').value);
        var item_price = Number(this.editDetailsForm.get('item_price').value);
        /**
     * Creation of formula to throw total amount when quantity is entered.
     */
        this.editDetailsForm.patchValue({
            itemTotal: quantity * item_price
        });
    }

    onUpdateDetailsClick(event) {
        this.editDetailsForm["submitted"] = true;
        if (this.editDetailsForm.valid) {
            this.editDetailsDisabled = true;
            var detail: Details = this.editDetailsForm.value;

            this.detailsService.UpdateOrderDetails(detail, detail.id).subscribe((updateResponse) => {
                this.editDetailsForm.reset();
                $("#btnUpdateDetailsCancel").trigger("click");
                this.editDetailsDisabled = false;
                this.showDetailsSpinner = true;

                this.detailsService.GetOrderDetailsById(this.route.snapshot.params['order_id']).subscribe((response) => {
                    if (response != null) {
                        this.details1 = response;
                    }
                    this.showDetailsSpinner = false;
                }, (error) => {
                    console.log(error);
                })
            },
                (error) => {
                    console.log(error);
                    this.editDetailsDisabled = false;
                });
        }
    }



    onDeleteDetailsClick(index) {
        this.deleteDetailsForm.reset();
        this.deleteDetailsForm["submitted"] = false;
        this.deleteDetailsForm.patchValue({
            id: this.details[index].id,
            item_name: this.details[index].item_name
        });
    }

    onDeleteDetailsConfirmClick(event) {
        this.deleteDetailsForm["submitted"] = true;
        if (this.deleteDetailsForm.valid) {
            this.deleteDetailsDisabled = true;
            var detail: Details = this.deleteDetailsForm.value;

            this.detailsService.DeleteOrderDetails(detail.id).subscribe((deleteResponse) => {
                this.deleteDetailsForm.reset();
                $("#btnDeleteDetailsCancel").trigger("click");
                this.deleteDetailsDisabled = false;
                this.showDetailsSpinner = true;

                this.detailsService.GetOrderDetailsById(this.route.snapshot.params['order_id']).subscribe((response) => {
                    if (response != null) {
                        this.details1 = response;
                    }
                    this.showDetailsSpinner = false;
                }, (error) => {
                    console.log(error);
                })
            },
                (error) => {
                    console.log(error);
                    this.deleteDetailsDisabled = false;
                });
        }
    }



    onViewSelectAllClick() {
        for (let propertyName of Object.keys(this.viewDetailsCheckBoxes)) {
            this.viewDetailsCheckBoxes[propertyName] = true;
        }
    }

    onViewDeselectAllClick() {
        for (let propertyName of Object.keys(this.viewDetailsCheckBoxes)) {
            this.viewDetailsCheckBoxes[propertyName] = false;
        }
    }

    onBtnSortClick() {
        this.details.sort((a, b) => {
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
