import { ObjectId } from "mongoose";
import { UserModel } from "./user_model";

export interface NotificationModel{
    _id:ObjectId,
    userId:UserModel,
    title: string,
    message: string,
    imageUrl: string,
    notiStatus: string
}