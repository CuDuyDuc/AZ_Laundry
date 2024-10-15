import { ObjectId } from "mongoose";

export interface TipModel{
    _id:ObjectId,
    thumbnail:string,
    body_image:string,
    title:string,
    content_header:string,
    content_footer:string,
}