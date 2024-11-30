import { ObjectId } from "mongoose";
import { UserModel } from "./user_model";
import { ProductModel } from "./product";

export interface ShopDetails {
    id_shop: ObjectId | UserModel; // Ref đến user
    service_fee: number;
    shipping_fee: number;
    confirmationStatus: 'Chờ duyệt' | 'Đang giặt' | 'Đang giao' | 'Hoàn thành' | 'Đã hủy';
}

export interface PaymentModel{
    _id:ObjectId,
    id_user:UserModel,
    id_cart:any,
    id_product:ProductModel,
    method_payment:string,
    full_name:string,
    number_phone:string,
    address:string,
    data_payment: {
        shipping_fee: number,
        discount: number,    
        taxes: number,
        total: number,
        shipping_date: Date
        delivery_date: Date
    }
    shop_details: Array<ShopDetails>;
    mount_money:number,
    status:string,
    confirmationStatus: string,
    createdAt:Date,
    imgUrl:string
}