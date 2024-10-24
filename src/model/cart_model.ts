import { ObjectId } from "mongoose";
import { UserModel } from "./user_model";
import { ProductModel } from "./product";

export interface CartModel{
    _id:ObjectId,
    id_user:UserModel,
    product_quantity:number,
    cart_subtotal:number,
    id_product:ProductModel
}