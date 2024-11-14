import { ObjectId } from "mongoose";
import { UserModel } from "./user_model";

export interface NotificationModel{
    _id:ObjectId;
    userId:UserModel;
    sender: UserModel;
    notification_type: 'order' | 'remider' | 'promotion' | 'product';
    title: string;
    body: string;
    object_type_id: string | null;
    shortDescription: string | null;
    imageUrl: string;
    status: 'unread' | 'read';
    createdAt: string;
}