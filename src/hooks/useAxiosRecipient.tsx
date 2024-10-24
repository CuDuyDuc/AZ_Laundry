import { useEffect, useState } from 'react';
import authenticationAPI from '../apis/authAPI';

export const useAxiosRecipient = ({ chats, user }: {chats:any,user:any}) => {
    const [recipientUser, setRecipientUser] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const recipientId = chats?.members.find((id: any) => id !== user?.id);
    useEffect(()=>{
        const getUserById = async()=>{
            if(!recipientId) return null
            try {
                const response = await authenticationAPI.HandleAuthentication(`/find-user/${recipientId}`)
                setRecipientUser(response)
            } catch (error) {
                setError(error)
            }
        }
        getUserById()
    },[])
    return {recipientUser,error}
};
