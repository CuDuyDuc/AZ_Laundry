import { appInfo } from "./appInfo"
import axiosClient from "./axiosClient"

class ReviewAPI {
    HandleReview = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) => {
        return await axiosClient(`${appInfo.BASE_URL}/review${url}`,{
            method: method ?? 'get',
            data,
        });
    }
}

const reviewAPI = new ReviewAPI()

export default reviewAPI;