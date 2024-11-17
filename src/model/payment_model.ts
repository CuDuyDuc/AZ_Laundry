import { ObjectId } from "mongoose";
import { UserModel } from "./user_model";
import { CartModel } from "./cart_model";
import { ProductModel } from "./product";

export interface PaymentModel{
    _id:ObjectId,
    id_user:UserModel,
    id_cart:CartModel,
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
    mount_money:number,
    status:string,
    confirmationStatus: string,
    createdAt:Date,
    imgUrl:string
}