import { appInfo } from "./appInfo";
import axiosClient from "./axiosClient";


class AuthAPI {
    HandleService = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) => {
        return await axiosClient(`${appInfo.BASE_URL}/service-type${url}`,{
            method: method ?? 'get',
            data,
        });
    }
}

const serviceAPI = new AuthAPI()

export default serviceAPI;