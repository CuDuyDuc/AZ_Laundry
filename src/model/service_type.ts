import { ObjectId } from "mongoose";

export interface service_type{
    _id:ObjectId,
    service_type_name:string,
    service_type_icon:string
}