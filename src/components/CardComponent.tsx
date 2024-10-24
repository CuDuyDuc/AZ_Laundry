import moment from 'moment';
import React from 'react';
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

interface Props {
    user: any;
    chats: any;
    isRead?: boolean;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const CardComponent = (props: Props) => {
    const { chats, user, isRead,onPress } = props;
    const { recipientUser } = useAxiosRecipient({ chats, user });
    const { onlineUsers, notifications, allUsers } = useChatContext();
    const { lastestMessage } = useAxiosLastesMessage(chats);
    const unreadNotifications = unreadNotificationsFunc(notifications); //hàm này để tính số lượng tin nhắn false có nghĩa chưa đọc
    const modifiedNotifications = notifications.map((n: any) => {
        const sender = allUsers.find((user: any) => user._id === n.senderId);
        return {
            ...n,
            senderName: sender?.name,
        };
    }); //hàm này gọi ra biết được tên người tin nhắn để có thể thông báo
    const isActive = onlineUsers.some((user: any) => user.userId === recipientUser?._id);
    const truncateText = (text: any) => {
        let shortText = text.substring(0, 20);
        if (text.length > 20) {
            shortText = shortText + '...';
        }
        return shortText;
    };

    return (
        <TouchableOpacity onPress={onPress} style={{ marginBottom: 15 }}>
            <RowComponent>
                <View style={{ position: 'relative', marginEnd: 15 }}>
                    {recipientUser?.photo != null ? (
                        <Image source={{ uri: recipientUser.photo }} style={globalStyle.avatarImage} />
                    ) : (
                        <Image source={{uri: 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png'}} style={globalStyle.avatarImage} />
                    )}
                    {isActive ? <View style={globalStyle.dotGreenActive} /> : undefined}
                </View>
                <View style={{ flex: 1 }}>
                    <RowComponent justify="space-between">
                        <TextComponent text={recipientUser?.name} font={FONTFAMILY.montserrat_medium} />
                        <TextComponent
                            text={moment(lastestMessage?.createdAt).format('HH:mm')}
                            color={isRead ? COLORS.GRAY_WHITE : COLORS.HEX_BLACK}
                            font={isRead ? FONTFAMILY.montserrat_regular : FONTFAMILY.montserrat_semibold}
                        />
                    </RowComponent>
                    <RowComponent justify="space-between">
                        <TextComponent
                            text={lastestMessage && truncateText(lastestMessage?.text)}
                            color={isRead ? COLORS.GRAY_WHITE : COLORS.HEX_BLACK}
                            font={isRead ? FONTFAMILY.montserrat_regular : FONTFAMILY.montserrat_semibold}
                        />
                        {isRead ? undefined : <View style={globalStyle.dotBlue} />}
                    </RowComponent>
                </View>
            </RowComponent>
        </TouchableOpacity>
    );
};

export default CardComponent;
