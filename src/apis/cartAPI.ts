import { appInfo } from "./appInfo"
import axiosClient from "./axiosClient"

class CartAPI {
    HandleCart = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) => {
        return await axiosClient(`${appInfo.BASE_URL}/cart${url}`,{
            method: method ?? 'get',
            data,
        });
    }
}

const cartAPI = new CartAPI()

export default cartAPI;