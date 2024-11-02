import axiosClient from './axiosClient';
import { appInfo } from "./appInfo";

class NotificationAPI {
    HandleNotification = async (
    url: string,
    data?: any,
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch',
  ) => {
    return await axiosClient(`${appInfo.BASE_URL}/notification${url}`,{
        method: method ?? 'get',
        data,
      });
  };
}

const notificationAPI = new NotificationAPI();
export default notificationAPI;
