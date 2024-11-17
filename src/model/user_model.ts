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
    list_addresses: [{
        _id:ObjectId
        full_name:{
            type:string
        },
        address:{
            type:string
        },
        phone_number:{
            type:string
        },
        location: {
            type: {
                type: string, 
                enum: ['Point'], 
            },
            coordinates: {
                type: [Number], 
            },
        },
    }],
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