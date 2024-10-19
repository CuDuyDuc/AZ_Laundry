import { appInfo } from "./appInfo";
import axiosClient from "./axiosClient";


class ProductAPI {
    HandleProduct = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) => {
        return await axiosClient(`${appInfo.BASE_URL}/product${url}`,{
            method: method ?? 'get',
            data,
        });
    }
}

const productAPI = new ProductAPI()

export default productAPI;