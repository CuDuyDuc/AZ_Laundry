import axios from "axios";
import queryString from "query-string";
import { Alert } from "react-native";

const axiosClient = axios.create({
    paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config: any) => {
    config.headers = {
        Authorization: '',
        Accept: 'application/json',
        ...config.headers
    }

    config.data 

    return config
})

axiosClient.interceptors.response.use(res => {
    if(res.data && res.status === 200) {
        return res.data;
    }

    throw new Error('Error');
}, error => {
    console.log(`Error api ${JSON.stringify(error.response.data)}`);
    throw new Error(JSON.stringify(error.response.data.message));
});

export default axiosClient;