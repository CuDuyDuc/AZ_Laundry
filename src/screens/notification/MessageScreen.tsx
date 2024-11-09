import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CardComponent, CardListFriend, ContainerComponent, SectionComponent } from '../../components';
import { useChatContext } from '../../context/ChatContext';
import { authSelector } from '../../redux/reducers/authReducer';
import COLORS from '../../assets/colors/Colors';

const MessageScreen = ({navigation}:any) => {
    const dispatch = useDispatch();
    const user = useSelector(authSelector);

    const { userChats, potentialChats, createChat, updateCurrentChat,notifications,allUsers,markNotificationAsRead} =useChatContext();
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
        console.log(item);
        
        updateCurrentChat(item);
        navigation.navigate('ChatScreen');
    };
    
    
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