import { appInfo } from "./appInfo";
import axiosClient from "./axiosClient";


class TipAPI {
    Handletip = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) => {
        return await axiosClient(`${appInfo.BASE_URL}/tip${url}`,{
            method: method ?? 'get',
            data,
        });
    }
}

const tipAPI = new TipAPI()

export default tipAPI;