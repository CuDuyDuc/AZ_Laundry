import { useEffect, useState } from "react"
import authenticationAPI from "../apis/authAPI";
import { UserModel } from "../model/user_model";


interface Props{
    currentLatitude?:any,
    currentLongitude?:any,
    limit?:any,
    id_product_type?:any

}

export const useAxiosGetShops=(props:Props)=>{
    const {currentLatitude,currentLongitude,limit,id_product_type}= props
    const [shop, setShop] = useState<UserModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(()=>{
        const getDataShops = async () => {
            try {
                let res:any 
                if(!id_product_type){
                    res = await authenticationAPI.HandleAuthentication('/get-shops', {
                        currentLatitude,
                        currentLongitude,
                        limit
                    }, 'post');
                }else{
                    res = await authenticationAPI.HandleAuthentication('/get-shop-by-product-type', {
                        id_product_type,
                        currentLatitude,
                        currentLongitude,
                    }, 'post');
                }
                setShop(res.data);
                setLoading(false);
            } catch (error: any) {
                console.log('Error fetching shops: ', error);
                setLoading(false);
            }
        };
        getDataShops()
    },[])
    return{shop,loading}
}