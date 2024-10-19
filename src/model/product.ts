import { ObjectId } from "mongoose";
import { ProductTypeModel } from "./product_type";
import { UserModel } from "./user_model";

export interface ProductModel{
    _id: ObjectId;
    product_name: string;
    id_user:UserModel;
    product_photo: string[];
    product_price: number;
    short_description: string;
    product_description: string;
    id_product_type: ProductTypeModel;
}