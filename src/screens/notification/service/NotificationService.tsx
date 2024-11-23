import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';
import firebaseAPI from '../../../apis/firebaseNotiAPI';
import { ObjectId } from 'mongoose';

interface NotificationData {
    title?: string;
    body?: string;
    userId?: string;
    sender?: string;
    object_type_id?: ObjectId;
    notification_type?: string;
}

class NotificationService {

    // Request notification permissions
    static async requestPermissions(): Promise<void> {
        const permission = await notifee.requestPermission();
    }

    // Display a local notification
    static async displayLocalNotification(
        title: string,
        body: string,
    ): Promise<void> {
        const channelId =  await notifee.createChannel({
            id: 'default',
            name: 'A-Z Laundry',
            importance: AndroidImportance.HIGH,
        });

        
        await notifee.displayNotification({
            title,
            body,
            android: {
                channelId,
                smallIcon: 'ic_launcher',
                largeIcon: 'https://cdn-icons-png.flaticon.com/256/5103/5103880.png',
                pressAction: {
                    id: 'default'
                },              
                importance: AndroidImportance.HIGH,
                timestamp: Date.now(),
                showTimestamp:true,
            },
        });
    }

    // Send a notification to the server
    static async sendNotificationToServer(
        notificationData: NotificationData,
    ): Promise<any> {
        try {
            const response = await firebaseAPI.HandleFirebaseToken(
                '/send-notification',
                notificationData,
                'post',
            );
            return response;
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    }
}

export default NotificationService;
