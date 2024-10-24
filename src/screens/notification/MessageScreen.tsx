import React from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CardComponent, CardListFriend, ContainerComponent, SectionComponent } from '../../components';
import { useChatContext } from '../../context/ChatContext';
import { authSelector } from '../../redux/reducers/authReducer';

const MessageScreen = ({navigation}:any) => {
    const dispatch = useDispatch();
    const user = useSelector(authSelector);

    const { userChats, potentialChats, createChat, updateCurrentChat } =useChatContext();
    const handleChatBoxs = (item: any) => {
        updateCurrentChat(item);
        navigation.navigate('ChatScreen');
    };
    
    return (
        <ContainerComponent>
            <SectionComponent styles={{marginTop:20}}>
                <FlatList
                    horizontal
                    data={potentialChats}
                    showsHorizontalScrollIndicator ={false}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <CardListFriend
                            name={item.name}
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
                        <CardComponent isRead chats={item} user={user} onPress={() => handleChatBoxs(item)} />
                    )}
                />
            </SectionComponent>
        </ContainerComponent>
    );
};

export default MessageScreen;
