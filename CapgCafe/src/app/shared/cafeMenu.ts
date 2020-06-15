// created by Shivam Tewari
// Model class for Orders
export class CafeMenu {
    item_id: number;
    item_name: string;
    item_type: string;
    item_price: number;
    cafe_id : number;
    item_img_path :string;
    item_calories : number;



    constructor(Item_ID: number, Item_Name: string, Item_Type: string, Item_Price: number,cafe_id : number,item_img_path :string,item_calories : number) {
        this.item_id = Item_ID;
        this.item_name = Item_Name;
        this.item_type = Item_Type;
        this.item_price = Item_Price;
        this.cafe_id = cafe_id;
        this.item_img_path = item_img_path;
        this.item_calories = item_calories;
        
    }
}