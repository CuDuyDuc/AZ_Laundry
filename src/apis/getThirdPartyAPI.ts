import axiosClient from "./axiosClient";

class GetThirdPartyAPI {
    HandleGetThirdPartyAPI = async (
        url: string,
    ) => {
        return await axiosClient(`${url}`,{
            method:  'get',
        });
    }
}

const getThirdPartyAPI = new GetThirdPartyAPI()

export default getThirdPartyAPI;