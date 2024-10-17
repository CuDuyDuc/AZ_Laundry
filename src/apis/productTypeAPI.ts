import { appInfo } from "./appInfo";
import axiosClient from "./axiosClient";


class ProductTypeAPI {
    HandleProductType = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) => {
        return await axiosClient(`${appInfo.BASE_URL}/product-type${url}`,{
            method: method ?? 'get',
            data,
        });
    }
}

const productTypeAPI = new ProductTypeAPI()

export default productTypeAPI;