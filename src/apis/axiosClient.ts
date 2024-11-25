import axios from "axios";
import queryString from "query-string";
import * as Burnt from 'burnt'
const axiosClient = axios.create({
    paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config: any) => {
    config.headers = {
        Authorization: '',
        Accept: 'application/json',
        ...config.headers
    }
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config
})

axiosClient.interceptors.response.use(res => {
    if(res.data && res.status === 200) {
        return res.data;
    }

    throw new Error('Error');
}, error => {
    console.log(`Error api ${JSON.stringify(error.response.data)}`);
    Burnt.alert({
        title:JSON.stringify(error.response.data?.message)
    })
    throw new Error(JSON.stringify(error.response.data.message));
});

export default axiosClient;