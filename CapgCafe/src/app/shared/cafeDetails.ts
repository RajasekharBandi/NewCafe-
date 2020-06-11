export class CafeDetails {

    cafe_id: number;	  
	cafe_name: string;
	cafe_loaction: string;
	cafe_owner: string;
	cafe_rating: string;
    cafe_image_path: string;
    
    constructor(cafe_id: number,	  
        cafe_name: string,
        cafe_loaction: string,
        cafe_owner: string,
        cafe_rating: string,
        cafe_image_path: string){
            this.cafe_id=cafe_id;
            this.cafe_name=cafe_name;
            this.cafe_loaction=cafe_loaction;
            this.cafe_owner=cafe_owner;
            this.cafe_rating=cafe_rating;
            this.cafe_image_path=cafe_image_path;           

    }
}