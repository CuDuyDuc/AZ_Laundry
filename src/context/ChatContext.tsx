import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { appInfo } from '../apis/appInfo';
import authenticationAPI from '../apis/authAPI';
import chatAPI from '../apis/chatAPI';
import messageAPI from '../apis/messageAPI';
import { authSelector } from '../redux/reducers/authReducer';

interface ChatContextType {
    userChats: any;
    isUserChatsLoading: boolean;
    potentialChats: any;
    createChat: any;
    updateCurrentChat: any;
    messages: any;
    isMessgesLoading: boolean;
    currentChat: any;
    sendTextMessage: any;
    onlineUsers: any;
    newMessage: any;
    socket: any;
    notifications: any;
    allUsers: any;
    markNotificationAsRead: any;
    markThisUserNotificationsAsRead:any;
    markMessagesAsRead:any;
    setCurrentChat:any;
    markNotificationAsReadUpdate:any;
    setUserChats:(ob:any)=>void
    
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatContextProviderProps {
    children: ReactNode;
}

export const ChatContextProvider = (props: ChatContextProviderProps) => {
    const { children } = props;
    const user = useSelector(authSelector);
    const [userChats, setUserChats] = useState<any>(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState<any>(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState<any>(null);
    const [messages, setMessages] = useState<any>(null);
    const [isMessgesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState<any>(null);
    const [sendTextMessagesError, setSendTextMessagesError] = useState<any>(null);
    const [newMessage, setNewMessage] = useState<any>(null);
    const [socket, setSocket] = useState<any>(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications, setNotifications] = useState<any>([]);
    const [allUsers, setAllUsers] = useState<any>([]);
    
    
    useEffect(() => {
        const newSocket = io(appInfo.URL_SOCKET);
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    useEffect(() => {
        if (socket == null) return;
        socket.emit('addNewUser', user?.id);
        socket.on('getOnlineUsers', (res: any) => {
            setOnlineUsers(res);
        });
        return () => {
            socket.off('getOnlineUsers');
        };
    }, [socket]);

    useEffect(() => {
        if (socket == null) return;
        const recipientId = currentChat?.members?.find((id: any) => id !== user?.id); 
        console.log(recipientId);
        
        socket.emit('sendMessage', { ...newMessage, recipientId }); 
    }, [newMessage]);

    useEffect(() => {
        if (socket == null) return;
        socket.on('getMessage', (res: any) => {
            if (currentChat?._id !== res.chatId) {
                setMessages((prev: any) => [...prev, { ...res, isRead: false }]);
            } else {
                setMessages((prev: any) => [...prev, { ...res, isRead: true }]);
            }
        });
        socket.on('getNotification', (res: any) => {
            const isChatOpen = currentChat?.members.some((id: any) => id === res.senderId);
            
            if (isChatOpen) {
                setNotifications((prev: any) => [{ ...res, isRead: true }, ...prev]);
            } else {
                setNotifications((prev: any) => [res, ...prev]);
            }
        });
        return () => {
            socket.off('getMessage');
            socket.off('getNotification');
        };
    }, [socket, currentChat]);
    const markNotificationAsReadUpdate = useCallback(async (chats:any) => {
        if (!chats) {
            console.error('Error');
            return;
        }

        if (socket == null) return;
        socket.emit('markMessagesAsRead',chats); 
    }, [newMessage]);
    

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response: any = await authenticationAPI.HandleAuthentication('/get-users');
                const pChats = response.filter((u: any) => {
                    let isChatCreated = false;
                    if (user?.id === u._id) return false;
                    if (user?.role_id.name_role === u.role_id.name_role || u.role_id.name_role==="admin") return false
                    if (userChats) {
                        isChatCreated = userChats?.some((chat: any) => {
                            return chat.members[0] === u._id || chat.members[1] === u._id;
                        });
                    }
                    return !isChatCreated;
                });
                setPotentialChats(pChats);
                setAllUsers(response);
            } catch (error) {
                console.log('error axios users', error);
            }
        };
        getUsers();
    }, [userChats]);
    useEffect(() => {
        const getUserChats = async () => {
            setIsUserChatsLoading(true);
            try {
                const response = await chatAPI.HandleChat(`/find-user-chat/${user?.id}`);
                
                setUserChats(response);
                setIsUserChatsLoading(false);
                setUserChatsError(null);
            } catch (error) {
                setUserChatsError(error);
            }
        };
        getUserChats();
    }, [user]);
    useEffect(() => {
        const getMessages = async () => {
            setIsMessagesLoading(true);
            try {
                const response = await messageAPI.HandleMessage(`/get-message/${currentChat?._id}`);
                setMessages(response);
                setIsMessagesLoading(false);
                setMessagesError(null);
            } catch (error) {
                setMessagesError(error);
            }
        };
        getMessages();
    }, [currentChat]);
    const sendTextMessage = useCallback(
        async (textMessage: any, sender: any, currentChatId: any, setTextMessage: any) => {
            if (!textMessage) return console.log('You must type something...');
            try {
                const response = await messageAPI.HandleMessage(
                    `/create-message`,
                    {
                        chatId: currentChatId,
                        senderId: sender.id,
                        text: textMessage,
                    },
                    'post',
                );
                setNewMessage(response);
                setMessages((prev: any) => [...prev, response]);
                setTextMessage('');
            } catch (error) {
                return setSendTextMessagesError(error);
            }
        },
        [],
    );

    const updateCurrentChat = useCallback((chat: any) => {
        setCurrentChat(chat);
    }, []);
    const createChat = useCallback(async (firstId: any, secondId: any) => {
        if (firstId != null && secondId != null) {
            try {
                const response = await chatAPI.HandleChat(
                    `/create-chat`,
                    {
                        firstId,
                        secondId,
                    },
                    'post',
                );
                setUserChats((prev: any) => [...prev, response]);
            } catch (error) {
                console.log('create chat error', error);
            }
        }
    }, []);
    const markNotificationAsRead = useCallback(({ n, userChats, user, notifications }: any) => {
        const desiredChat = userChats?.find((chat: any) => {
            const chatMembers = [user.id, n?.senderId];
            const isDesiredChat = chat?.members.every((member: any) => {
                return chatMembers.includes(member);
            });
            return isDesiredChat;
        });

        const mNotfications = notifications?.map((el: any) => {
            
            if (n?.senderId === el.senderId) {
                return {
                    ...n,
                    isRead: true,
                };
            } else {
                return el;
            }
        });
        
        updateCurrentChat(desiredChat);
        setNotifications(mNotfications);
    }, []);
    const markMessagesAsRead = useCallback(async (chatId: string) => {
        try {
            // Cập nhật trạng thái isRead cho các tin nhắn trong local state
            setMessages((prevMessages: any) =>
                prevMessages.map((msg: any) =>
                    msg.chatId === chatId && !msg.isRead
                        ? { ...msg, isRead: true }
                        : msg
                )
            );
        } catch (error) {
            console.error("Error marking messages as read:", error);
        }
    }, []);
    const markThisUserNotificationsAsRead = useCallback(({ thisUserNotifications, notifications }:any) => {
        const updatedNotifications = notifications.map((el:any) => {
            const shouldMarkAsRead = thisUserNotifications.some((n:any) => n.senderId === el.senderId);
            return shouldMarkAsRead ? { ...el, isRead: true } : el;
        });
        setNotifications(updatedNotifications);
    }, []);
    return (
        <ChatContext.Provider
            value={{
                userChats,
                isUserChatsLoading,
                potentialChats,
                createChat,
                updateCurrentChat,
                currentChat,
                messages,
                isMessgesLoading,
                sendTextMessage,
                onlineUsers,
                newMessage,
                socket,
                notifications,
                allUsers,
                markNotificationAsRead,
                markThisUserNotificationsAsRead,
                markMessagesAsRead,
                setCurrentChat,
                markNotificationAsReadUpdate,
                setUserChats
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
export const useChatContext = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('error context');
    }
    return context;
};