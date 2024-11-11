import { appInfo } from "./appInfo"
import axiosClient from "./axiosClient"

class PaymentAPI {
    HandlePayment = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) => {
        return await axiosClient(`${appInfo.BASE_URL}/payment${url}`,{
            method: method ?? 'get',
            data,
        });
    }
}

const paymentAPI = new PaymentAPI()

export default paymentAPI;