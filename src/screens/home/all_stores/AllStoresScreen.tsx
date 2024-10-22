import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CardShopComponent, ContainerComponent, HeaderComponent, InputComponent, SectionComponent, TextComponent } from '../../../components'
import { ProductTypeModel } from '../../../model/product_type';
import productTypeAPI from '../../../apis/product_typeAPI';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../redux/reducers/authReducer';
import { service_type } from '../../../model/service_type';
import serviceAPI from '../../../apis/serviceAPI';
import COLORS from '../../../assets/colors/Colors';
import { SearchNormal1 } from 'iconsax-react-native';

const AllStoresScreen = ({ route, navigation }: any) => {
    const dispatch = useDispatch();
    const user = useSelector(authSelector);
    const {latitude,longitude}=route.params
    const [typeService, setTypeService] = useState<service_type[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState('')
    const getDataService_Type = async () => {
        try {
            const res = await serviceAPI.HandleService('/get-service-type');
            const data: service_type[] = await res.data;
            setTypeService(data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching service types: ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDataService_Type();
    }, []);
    const handleDetailShop=(item:any)=>{
        navigation.navigate('DetailsShop', {data:item})
    }
  return (
    <ContainerComponent>
        
        <HeaderComponent title={`Danh mục cửa hàng`} isBack onBack={() => navigation.goBack()} />
        <SectionComponent styles={{marginTop:15}}>
            <InputComponent placeholder='Tìm kiếm' backgroundColor={COLORS.WHITE} suffix={<SearchNormal1 size="32"color={COLORS.AZURE_BLUE}/>} value={search} onChange={(val:any)=>setSearch(val)}/>
            <CardShopComponent  onPress={handleDetailShop}  currentLatitude={latitude} currentLongitude={longitude} />
        </SectionComponent>
    </ContainerComponent>
  )
}

export default AllStoresScreen