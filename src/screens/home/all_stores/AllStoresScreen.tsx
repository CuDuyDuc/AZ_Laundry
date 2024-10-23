import { SearchNormal1 } from 'iconsax-react-native';
import React, { useState } from 'react';
import COLORS from '../../../assets/colors/Colors';
import { CardShopComponent, ContainerComponent, HeaderComponent, InputComponent, SectionComponent } from '../../../components';

const AllStoresScreen = ({ route, navigation }: any) => {
    const {latitude,longitude}=route.params
    const [search, setSearch] = useState('')
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