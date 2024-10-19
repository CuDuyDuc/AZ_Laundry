import { ObjectId } from "mongoose";
import { service_type } from "./service_type";

export interface ProductTypeModel{
    _id:ObjectId,
    product_type_name:string,
    product_type_icon:string,
    id_service_type:service_type,
}