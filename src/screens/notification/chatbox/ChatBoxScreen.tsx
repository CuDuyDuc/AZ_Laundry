import { ArrowLeft2, Call, Camera, Image as Image1, Send, Video, } from 'iconsax-react-native';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Keyboard, StatusBar, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FONTFAMILY } from '../../../../assets/fonts';
import COLORS from '../../../assets/colors/Colors';
import { InputComponent, MessageComponent, RowComponent, SectionComponent, TextComponent } from '../../../components';
import { useChatContext } from '../../../context/ChatContext';
import { useAxiosRecipient } from '../../../hooks/useAxiosRecipient';
import { authSelector } from '../../../redux/reducers/authReducer';
import { globalStyle } from '../../../styles/globalStyle';


const MessageComponentMemo = React.memo(MessageComponent);
const ChatBoxScreen = ({ navigation }: any) => {
    const user = useSelector(authSelector);
    const [sendMessage, setSendMessage] = useState('');
    const [isMessageSent, setIsMessageSent] = useState(false);
    const { currentChat, messages, sendTextMessage, onlineUsers,markMessagesAsRead,setCurrentChat } = useChatContext();
    const { recipientUser } = useAxiosRecipient({ chats: currentChat, user });
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (currentChat && messages.some((msg:any) => msg.isRead === false)) {
            markMessagesAsRead(currentChat._id); 
        }
    }, [currentChat, messages]);

    useEffect(() => {
        if (messages?.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);
    useEffect(() => {
        return () => {
            setCurrentChat(null); // Đặt lại currentChat khi rời khỏi màn hình
        };
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        });

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleSendMessage = () => {
        if (sendMessage.trim()) {
            sendTextMessage(sendMessage, user, currentChat?._id, sendTextMessage);
            setSendMessage('');
            setIsMessageSent(true);
        }
    };

    useEffect(() => {
        if (isMessageSent) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
                setIsMessageSent(false);
            }, 100);
        }
    }, [isMessageSent]);
    const isActive = onlineUsers.some((user: any) => user?.userId === recipientUser?._id);
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'dark-content'} />
            <View style={[globalStyle.shadowCard, { zIndex: 1 }]}>
                <SectionComponent styles={{ marginTop: 60 }}>
                    <RowComponent>
                        <TouchableOpacity style={{ marginEnd: 20 }} onPress={() => navigation.goBack()}>
                            <ArrowLeft2 size="25" color={COLORS.HEX_BLACK} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <RowComponent>
                                {recipientUser?.photo != null ? (
                                    <Image
                                        source={{ uri: recipientUser.photo }}
                                        style={{ marginEnd: 15, width: 35, height: 35, borderRadius: 30 }}
                                    />
                                ) : (
                                    <Image
                                        source={{ uri: 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png' }}
                                        style={{ marginEnd: 15, width: 35, height: 35, borderRadius: 30 }}
                                    />
                                )}
                                {isActive ? (
                                    <View
                                        style={globalStyle.dotGreenActiveChatBox}
                                    />
                                ) : undefined}
                                <RowComponent justify="space-between" styles={{ flex: 1 }}>
                                    <TextComponent text={recipientUser?.fullname} font={FONTFAMILY.montserrat_regular} color={COLORS.DARK_BLUE} />
                                    <RowComponent>
                                        <TouchableOpacity style={{ marginEnd: 20 }}>
                                            <Call size="25" color={COLORS.AZURE_BLUE} variant="Bold" />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Video size="25" color={COLORS.AZURE_BLUE} variant="Bold" />
                                        </TouchableOpacity>
                                    </RowComponent>
                                </RowComponent>
                            </RowComponent>
                        </View>
                    </RowComponent>
                </SectionComponent>
            </View>
            <SectionComponent styles={{ flex: 0.9 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ref={flatListRef}
                    style={{ flex: 1 }}
                    data={messages}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <RowComponent
                            justify={item?.senderId === user?.id ? 'flex-end' : 'flex-start'}
                            styles={{ marginBottom: 25 }}>
                            <MessageComponent
                                text={item?.text}
                                backgroundColor={item?.senderId === user?.id ? COLORS.AZURE_BLUE : COLORS.HEX_LIGHT_GREY}
                                colorText={item?.senderId === user?.id ? COLORS.WHITE : COLORS.HEX_BLACK}
                                timeCurrent={moment(item?.createdAt).format('HH:mm')}/>
                        </RowComponent>
                    )}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />
            </SectionComponent>
            <View
                style={[{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 15 }, globalStyle.shadowCardTop]}>
                <RowComponent justify="space-between">
                    <RowComponent styles={{ marginEnd: 20 }}>
                        <TouchableOpacity style={{ marginEnd: 20 }}>
                            <Camera size="25" color={COLORS.AZURE_BLUE} variant="Bold" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image1 size="25" color={COLORS.AZURE_BLUE} variant="Bold" />
                        </TouchableOpacity>
                        <InputComponent
                            value={sendMessage}
                            onChange={(e) => setSendMessage(e)}
                            backgroundColor={COLORS.WHISPER_GRAY}
                            placeholder="Nhắn tin"
                            style={{ width: '74%', minHeight: 40, borderRadius: 20, paddingStart: 5, marginTop: 20 }}
                        />
                        <TouchableOpacity style={{ marginEnd: 20 }} onPress={handleSendMessage}>
                            <Send size="25" color={COLORS.AZURE_BLUE} variant="Bold" />
                        </TouchableOpacity>
                    </RowComponent>
                </RowComponent>
            </View>
        </View>
    );
};

export default ChatBoxScreen;