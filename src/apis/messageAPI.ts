import { appInfo } from './appInfo';
import axiosClient from './axiosClient';

class MessageAPI {
    HandleMessage = async (url: string, data?: any, method?: 'get' | 'post' | 'put' | 'delete') => {
        return await axiosClient(`${appInfo.BASE_URL}/messages${url}`, {
            method: method ?? 'get',
            data,
        });
    };
}

const messageAPI = new MessageAPI();

export default messageAPI;
