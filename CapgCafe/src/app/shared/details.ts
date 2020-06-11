// created by Shivam Tewari
// Model class for Order Details
export class Details {
    id: number;
    item_name: string;
    quantity: number;
    order_id: number;
    item_id: number;
    item_price: string;
    itemType: string;
    itemTotal: string;


    constructor(ID: number, Item_Name: string, Quantity: number, Order_ID: number, Item_ID: number, ItemPrice: string, ItemType: string, ItemTotal: string) {
        this.id = ID;
        this.item_name = Item_Name;
        this.quantity = Quantity;
        this.order_id = Order_ID;
        this.item_id = Item_ID;
        this.item_price = ItemPrice;
        this.itemType = ItemType;
        this.itemTotal = ItemTotal;
    }
}