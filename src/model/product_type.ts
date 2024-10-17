import { ObjectId } from "mongoose";

export interface ProductTypeModel{
    _id:ObjectId,
    product_type_name:string,
    product_type_icon:string,
    id_service_type:ObjectId,
}