import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import chatAPI from '../../apis/chatAPI';
import COLORS from '../../assets/colors/Colors';
import { CardComponent, CardListFriend, ContainerComponent, SectionComponent } from '../../components';
import { useChatContext } from '../../context/ChatContext';
import { authSelector } from '../../redux/reducers/authReducer';

const MessageScreen = ({navigation}:any) => {
    const dispatch = useDispatch();
    const user = useSelector(authSelector);
    const { userChats, potentialChats, createChat, updateCurrentChat,notifications,allUsers,markNotificationAsRead,setUserChats} =useChatContext();
    const modifiedNotifications= notifications?.map((n:any) => {
        const sender =allUsers?.find((user:any) => user.id===n.senderId);
            return {
                ...n, 
                senderName: sender?.fullname,
            };
    })
    const handleChatBoxs = async (item: any) => {
        
        if(modifiedNotifications||notifications){
            const matchedNotification = modifiedNotifications?.find((n: any) => {
                return item?.members.includes(n?.senderId)
        });
            if(matchedNotification){
                markNotificationAsRead({ n: matchedNotification,userChats,user,notifications})
            }
        }
        updateCurrentChat(item);
        updateIsCountRead(item)
        navigation.navigate('ChatScreen');
    };
    console.log(userChats);
    const updateIsCountRead= async(item:any)=>{
        try {
            const res:any = await chatAPI.HandleChat('/update-chat-isRead',{
                chatId:item._id, userId:user.id
            },'post')
            if(res.message==='success'){
                setUserChats(res.data)
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
    
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