import { ObjectId } from "mongoose";

export interface UserModel {
    _id: ObjectId;
    fullname?: string; 
    givenName?: string; 
    familyName?: string; 
    photo: string; 
    email: string; 
    password: string; 
    phone_number: string; 
    address: string; 
    data_user: {
        shop_name: string; 
        thumbnail: string; 
        shop_banner: string; 
        star_rating: number; 
        order_count: number; 
    };
    location: {
        type: 'Point'; 
        coordinates: [number, number]; 
    };
    role_id: ObjectId; 
}