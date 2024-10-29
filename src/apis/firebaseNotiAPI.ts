import { appInfo } from "./appInfo";
import axiosClient from "./axiosClient";


class FirebaseNotiAPI {
    HandleFirebaseToken = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) => {
        return await axiosClient(`${appInfo.BASE_URL}/firebase${url}`,{
            method: method ?? 'get',
            data,
        });
    }
}

const firebaseAPI = new FirebaseNotiAPI()

export default firebaseAPI;