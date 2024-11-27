import React, { createContext, useContext, ReactNode } from 'react';
import notifee, { AndroidImportance } from '@notifee/react-native';
import firebaseAPI from '../apis/firebaseNotiAPI';

interface NotificationData {
    title?: string;
    body?: string;
    userId?: string;
    object_type_id?: string;
    notification_type?: string;
    shortDescription? : string;
}

interface NotificationContextProps {
    displayLocalNotification: (title: string, body: string) => Promise<void>;
    sendNotificationToServer: (data: NotificationData) => Promise<any>;
    sendCustomNotification: ( recipientType: 'client' | 'shop' | 'admin', notification_type: string, additionalData?: any) => Promise<void>;
}

const NotificationType = {
    ORDER_UPDATE: 'order_update',
    PROMOTION: 'promotion',
    REMINDER: 'reminder',
    NEW_PRODUCT: 'product'
  };
const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Function to display a local notification
    const displayLocalNotification = async (title: string, body: string): Promise<void> => {
        const channelId = await notifee.createChannel({
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
                pressAction: { id: 'default' },
                importance: AndroidImportance.HIGH,
                timestamp: Date.now(),
                showTimestamp: true,
            },
        });
    };

    // Function to send a notification to the server
    const sendNotificationToServer = async (data: NotificationData): Promise<any> => {
        try {
            const response = await firebaseAPI.HandleFirebaseToken(
                '/send-notification',
                data,
                'post'
            );
            return response.data;
        } catch (error) {
            console.error('Error sending notification:', error);
            throw error;
        }
    };

    // Function to handle custom notifications by type
    const sendCustomNotification = async (
        recipientType: 'client' | 'shop' | 'admin', 
        notification_type: string,
        additionalData?: any
    ): Promise<void> => {
        let title = '';
        let body = '';
    
        // Tùy chỉnh nội dung dựa trên loại thông báo và người nhận
        switch (notification_type) {
            case NotificationType.ORDER_UPDATE:
                title = 'Trạng thái đơn hàng';
                if (recipientType === 'client') {
                    body = `Đơn hàng của bạn đã ${additionalData?.status}.`;
                } else if (recipientType === 'shop') {
                    body = `Cập nhật trạng thái đơn hàng: ${additionalData?.status}.`;
                } else if (recipientType === 'admin') {
                    body = `Admin lưu ý: Đơn hàng đã ${additionalData?.status}.`;
                }
                break;
    
            case NotificationType.NEW_PRODUCT:
                title = 'Sản phẩm mới';
                if (recipientType === 'shop') {
                    body = `Sản phẩm mới ${additionalData?.productName} đã được thêm vào cửa hàng.`;
                } else if (recipientType === 'admin') {
                    body = `Admin: Sản phẩm ${additionalData?.productName} vừa được bổ sung.`;
                }
                break;
    
            case NotificationType.PROMOTION:
                title = 'Khuyến mãi';
                if (recipientType === 'client') {
                    body = `Khuyến mãi dành cho bạn: ${additionalData?.promoDetails}`;
                } else if (recipientType === 'shop') {
                    body = `Cửa hàng nhận thông báo khuyến mãi: ${additionalData?.promoDetails}`;
                }
                break;
            default:
                console.warn(`Type không hợp lệ: ${notification_type}`);
                return; // Bỏ qua nếu không có loại thông báo hợp lệ
        }
        
        // Gửi thông báo đến server cho shop hoặc admin
        if (recipientType === 'shop' || recipientType === 'admin') {
            await sendNotificationToServer({
                title,
                body,
                notification_type,
                ...additionalData,
                recipientType, // Gửi kèm loại người nhận để server biết ai sẽ nhận thông báo này
            });
        }
    };
    

    return (
        <NotificationContext.Provider
            value={{
                displayLocalNotification,
                sendNotificationToServer,
                sendCustomNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextProps => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
