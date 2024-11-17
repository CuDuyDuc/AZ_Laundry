import {useEffect, useState} from 'react';
import getThirdPartyAPI from '../apis/getThirdPartyAPI';

export const useGetThirdPartyAPI = (
  locationType: any,
  specificLocation: any,
) => {
  const [valueLocation, setValueLocation] = useState<any>([]);
  useEffect(() => {
    const HandleGetThirdPartyAPI = async () => {
      try {
        const response = await getThirdPartyAPI.HandleGetThirdPartyAPI(
          `https://esgoo.net/api-tinhthanh/${locationType}/${specificLocation}.htm`,
        );
        setValueLocation(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    HandleGetThirdPartyAPI();
  }, [specificLocation]);
  return {valueLocation};
};
