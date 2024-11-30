import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CardComponent, CardListFriend, ContainerComponent, SectionComponent } from '../../components';
import { useChatContext } from '../../context/ChatContext';
import { authSelector } from '../../redux/reducers/authReducer';
import COLORS from '../../assets/colors/Colors';

const MessageScreen = ({navigation}:any) => {
    const dispatch = useDispatch();
    const user = useSelector(authSelector);

    const { userChats, potentialChats, createChat, updateCurrentChat,notifications,allUsers,markNotificationAsRead,setChatId,chatId} =useChatContext();
    const modifiedNotifications= notifications?.map((n:any) => {
        const sender =allUsers?.find((user:any) => user.id===n.senderId);
            return {
                ...n, 
                senderName: sender?.fullname,
            };
    })
    const handleChatBoxs =  (item: any) => {
        
        if(modifiedNotifications||notifications){
            const matchedNotification = modifiedNotifications?.find((n: any) => {
                return item?.members.includes(n?.senderId)
        });
            if(matchedNotification){
                markNotificationAsRead({ n: matchedNotification,userChats,user,notifications})
            }
        }
        updateCurrentChat(item);
        navigation.navigate('ChatScreen');
    };
    const prevUserChatsRef = useRef();

    useEffect(() => {
        if (!userChats) return; // Nếu không có dữ liệu chat thì không làm gì

        // Kiểm tra xem userChats có thay đổi so với giá trị trước đó không
        if (prevUserChatsRef.current !== userChats) {
            setChatId(userChats);
            prevUserChatsRef.current = userChats; // Lưu lại giá trị hiện tại
            console.log('render');
        }
        
    }, []);
    return (
        <ContainerComponent styleBackground={{backgroundColor:COLORS.WHITE}}>
            <SectionComponent styles={{marginTop:20}}>
                <FlatList
                    horizontal
                    data={potentialChats}
                    showsHorizontalScrollIndicator ={false}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <CardListFriend
                            name={item.fullname}
                            image={item.photo}
                            onPress={() => createChat(user.id, item._id)}
                            idUserPosition={item._id}
                        />
                    )}
                />
            </SectionComponent>
            <SectionComponent>
                <FlatList
                    data={userChats}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <CardComponent  chats={item} user={user} onPress={() => handleChatBoxs(item)} />
                    )}
                />
            </SectionComponent>
        </ContainerComponent>
    );
};

export default MessageScreen;