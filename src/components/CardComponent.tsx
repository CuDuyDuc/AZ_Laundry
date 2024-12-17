import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { GestureResponderEvent, Image, TouchableOpacity, View } from 'react-native';
import { FONTFAMILY } from '../../assets/fonts';
import COLORS from '../assets/colors/Colors';
import { useChatContext } from '../context/ChatContext';
import { useAxiosRecipient } from '../hooks/useAxiosRecipient';
import { globalStyle } from '../styles/globalStyle';
import { unreadNotificationsFunc } from '../utils/unreadNotificationsFunc';
import { Validate } from '../utils/validate';
import { useAxiosLastesMessage } from './../hooks/useAxiosLatestMessage';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

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
    const [count,setCount]=useState(null)
    const truncateText = (text: any) => {
        if(Validate.isURL(text)){
            if (user.id != recipientUser?._id)
                return `${recipientUser.fullname} đã gửi ảnh`
            else
                return `Bạn đã gửi ảnh`
        }
        let shortText = text?.substring(0, 20);
        if (text?.length > 20) {
            shortText = shortText + '...';
        }
        return shortText;
    };
    
    const HandleChatsBox = async() => {
        if (thisUserNotifications?.length !== 0 || count!==0) {
            markThisUserNotificationsAsRead({ thisUserNotifications, notifications });
           
            
        }
        
        
    };

    const handlePress = (event: GestureResponderEvent) => {
        HandleChatsBox();
        if (onPress) {
            onPress(event); 
        }
    };
    const getCountIsReadForOtherUser = (chat: any, userId: any): number | null => {
        const senderCount = chat.senderCounts.find(
            (item:any) => item.senderId !== userId // Kiểm tra nếu senderId khác với userId
        );
        if (senderCount) {
            return senderCount.countIsRead;
        } else {
            return null;
        }
    };
    useEffect(()=>{
        setCount(thisUserNotifications.length + getCountIsReadForOtherUser(chats,user.id))
    },[lastestMessage])
   
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
                        <TextComponent 
                            text={recipientUser?.fullname}
                            color={(count && count  > 0  ) ? COLORS.HEX_BLACK : COLORS.GRAY_WHITE}
                            font={(count && count  > 0  ) ? FONTFAMILY.montserrat_semibold : FONTFAMILY.montserrat_regular}/>
                        <TextComponent
                            text={moment(lastestMessage?.createdAt).format('HH:mm')}
                            color={(count && count  > 0  ) ? COLORS.HEX_BLACK : COLORS.GRAY_WHITE}
                            font={(count && count  > 0  ) ? FONTFAMILY.montserrat_semibold : FONTFAMILY.montserrat_regular}
                        />
                    </RowComponent>
                    <RowComponent justify="space-between">
                        <TextComponent
                            text={lastestMessage && truncateText(lastestMessage?.text)}
                            color={(count && count    > 0 ) ? COLORS.HEX_BLACK : COLORS.GRAY_WHITE}
                            font={(count && count  > 0 ) ? FONTFAMILY.montserrat_semibold : FONTFAMILY.montserrat_regular}
                        />
                        {count && count  > 0 ? (
                            <TextComponent text={`${count}`} color={COLORS.AZURE_BLUE} font={FONTFAMILY.montserrat_bold} />
                        ) : undefined}
                    </RowComponent>
                </View>
            </RowComponent>
        </TouchableOpacity>
    );
};


export default CardComponent;