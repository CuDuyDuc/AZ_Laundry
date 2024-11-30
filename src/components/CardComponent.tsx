import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { GestureResponderEvent, Image, TouchableOpacity, View } from 'react-native';
import { FONTFAMILY } from '../../assets/fonts';
import COLORS from '../assets/colors/Colors';
import { useChatContext } from '../context/ChatContext';
import { useAxiosRecipient } from '../hooks/useAxiosRecipient';
import { globalStyle } from '../styles/globalStyle';
import { unreadNotificationsFunc } from '../utils/unreadNotificationsFunc';
import { useAxiosLastesMessage } from './../hooks/useAxiosLatestMessage';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import messageAPI from '../apis/messageAPI';
import { useAxiosPutIsRead } from '../hooks/useAxiosPutIsRead';

interface Props {
    user: any;
    chats: any;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const CardComponent = (props: Props) => {
    const { chats, user, onPress } = props;
    
    const { recipientUser } = useAxiosRecipient({ chats, user });
    const { onlineUsers, notifications, markThisUserNotificationsAsRead, markNotificationAsReadUpdate } = useChatContext();
    const { lastestMessage } = useAxiosLastesMessage(chats);
    const unreadNotifications = unreadNotificationsFunc(notifications); // Hàm này tính số lượng tin nhắn chưa đọc
    const thisUserNotifications = unreadNotifications?.filter((n: any) => n?.senderId == recipientUser?._id);
    const isActive = onlineUsers.some((user: any) => user.userId === recipientUser?._id);
    const [countIsRead, setCountIsRead] = useState<number>(0);
   
    const truncateText = (text: any) => {
        let shortText = text.substring(0, 20);
        if (text.length > 20) {
            shortText = shortText + '...';
        }
        return shortText;
    };

    const HandleChatsBox = () => {
        if (thisUserNotifications?.length !== 0) {
            markThisUserNotificationsAsRead({ thisUserNotifications, notifications });
        }
    };

    const handlePress = (event: GestureResponderEvent) => {
        HandleChatsBox();
        if (onPress) {
            onPress(event); 
        }
    };

    const prevIsReadTrueCountRef = useRef<number>(0); // Lưu giá trị isReadTrueCount trước đó

    useEffect(() => {
        // if (chats?.senderCounts && user?.id) {
        //     // Lọc senderCounts và chỉ lấy các phần tử có senderId khác user.id
        //     const filteredSenderCounts = chats?.senderCounts?.filter((item: any) => item.senderId !== user.id);
    
        //     // Lấy isReadTrueCount từ filteredSenderCounts
        //     const isReadTrueCount = filteredSenderCounts?.length > 0 ? filteredSenderCounts[0]?.isReadTrueCount : 0;
        //     console.log('dòng 62', filteredSenderCounts);
    
        //     // So sánh giá trị hiện tại với giá trị trước đó
        //     if (isReadTrueCount !== prevIsReadTrueCountRef.current) {
        //         prevIsReadTrueCountRef.current = isReadTrueCount; // Cập nhật giá trị trước đó
    
        //         // Cập nhật trạng thái countIsRead chỉ khi giá trị mới khác giá trị hiện tại
        //         if (isReadTrueCount !== countIsRead) {
        //             setCountIsRead(isReadTrueCount);
        //         }
        //     }
        // }
        console.log('dòng 75',chats);
        
    }, [lastestMessage]); // Thêm các dependency cần thiết
    return (
        <TouchableOpacity onPress={handlePress} style={{ marginBottom: 15 }}>
            <RowComponent>
                <View style={{ position: 'relative', marginEnd: 15 }}>
                    {recipientUser?.photo != null ? (
                        <Image source={{ uri: recipientUser.photo }} style={globalStyle.avatarImage} />
                    ) : (
                        <Image source={{ uri: 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png' }} style={globalStyle.avatarImage} />
                    )}
                    {isActive ? <View style={globalStyle.dotGreenActive} /> : undefined}
                </View>
                <View style={{ flex: 1 }}>
                    <RowComponent justify="space-between">
                        <TextComponent text={recipientUser?.fullname} font={FONTFAMILY.montserrat_medium} color={COLORS.DARK_BLUE} />
                        <TextComponent
                            text={moment(lastestMessage?.createdAt).format('HH:mm')}
                            color={(thisUserNotifications && thisUserNotifications?.length > 0 || countIsRead > 0) ? COLORS.HEX_BLACK : COLORS.GRAY_WHITE}
                            font={(thisUserNotifications && thisUserNotifications?.length > 0 || countIsRead > 0) ? FONTFAMILY.montserrat_semibold : FONTFAMILY.montserrat_regular}
                        />
                    </RowComponent>
                    <RowComponent justify="space-between">
                        <TextComponent
                            text={lastestMessage && truncateText(lastestMessage?.text)}
                            color={(thisUserNotifications && thisUserNotifications?.length > 0 || countIsRead > 0) ? COLORS.HEX_BLACK : COLORS.GRAY_WHITE}
                            font={(thisUserNotifications && thisUserNotifications?.length > 0 || countIsRead > 0) ? FONTFAMILY.montserrat_semibold : FONTFAMILY.montserrat_regular}
                        />
                        {countIsRead > 0 ? (
                            <TextComponent text={`${countIsRead}`} color={COLORS.AZURE_BLUE} font={FONTFAMILY.montserrat_bold} />
                        ) : (
                            <TextComponent text={`${countIsRead > 0 ? countIsRead : ''}`} color={COLORS.AZURE_BLUE} font={FONTFAMILY.montserrat_bold} />
                        )}
                    </RowComponent>
                </View>
            </RowComponent>
        </TouchableOpacity>
    );
};


export default CardComponent;