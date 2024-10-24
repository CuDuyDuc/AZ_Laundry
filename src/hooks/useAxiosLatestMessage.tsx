import { useEffect, useState } from 'react';
import messageAPI from '../apis/messageAPI';
import { useChatContext } from '../context/ChatContext';

export const useAxiosLastesMessage = (chat: any) => {
    const { newMessage,notifications } = useChatContext();
    const [lastestMessage, setLastestMessage] = useState<any>(null);    
    useEffect(() => {
        const getMessages = async () => {
            try {

                const response = await messageAPI.HandleMessage(`/get-message/${chat._id}`);
                const messages: any = response;
                const lastMessage = messages[messages.length - 1];
                setLastestMessage(lastMessage);
            } catch (error) {
                console.log(error);
            }
        };
        getMessages();
    }, [newMessage,notifications]);
    return { lastestMessage };
};
