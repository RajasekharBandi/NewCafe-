// created by Shivam Tewari
// Model class for Orders
export class Orders {
    order_id: number;
    order_location: string;
    order_date: string;
    payment_type: string;
    total_amount: string;
    empId: number;


    constructor(Order_ID: number, Order_Location: string, Order_Date: string, Payment_Type: string, Total_Amount: string, Employee_ID: number) {
        this.order_id = Order_ID;
        this.order_location = Order_Location;
        this.order_date = Order_Date;
        this.payment_type = Payment_Type;
        this.total_amount = Total_Amount;
        this.empId = Employee_ID;
    }
}