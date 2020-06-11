
// created by Sowrasree Banerjee
// Model class for Reviews
export class Reviews {
    rating_id: number;
    review_date: string;
    rating:number;
    review: string;
    review_type: string;
    cafe_id: number;
    cafe_location: string;
    item_id: number;
    item_name: string;
    user_id: number;
    empId: number;
    
  
    constructor(Rating_ID: number, Review_Date: string, Rating: number, Review: string, Review_Type: string, Cafe_Id: number, Cafe_Location: string, Item_Id: number, Item_Name: string, User_Id: number, Employee_ID: number) {
      this.rating_id= Rating_ID;
      this.review_date= Review_Date;
      this.rating = Rating;
      this.review = Review;
      this.review_type = Review_Type;
      this.cafe_id = Cafe_Id;
      this.cafe_location = Cafe_Location;
      this.item_id = Item_Id;
      this.item_name=  Item_Name;
      this.user_id = User_Id;
      this.empId = Employee_ID;
    
    }
  }