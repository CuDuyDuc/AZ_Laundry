import { SearchNormal1 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../../../assets/colors/Colors';
import { CardShopComponent, HeaderComponent, InputComponent, SectionComponent } from '../../../components';
import { View } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { useAxiosGetShops } from '../../../hooks/useAxiosGetShops';

const AllStoresScreen = ({ route, navigation }: any) => {
  const { latitude, longitude } = route.params
  const [search, setSearch] = useState('')
  const {shop, loading}= useAxiosGetShops({currentLatitude:latitude,currentLongitude:longitude})
  const [filteredData, setFilteredData] = useState<any>([])

  useEffect(()=>{
    if(shop.length>0){
      setFilteredData(shop)
    }
    console.log('re-render');
    
  },[shop])
  const removeAccents = (str: string) => {
    return str
        .normalize("NFD") // Chuẩn hóa chuỗi
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
        .toLowerCase(); // Chuyển thành chữ thường
  };

  const handleSearchQuery = (val: string) => {
      setSearch(val);
      const filterDataShops = shop?.filter((data: any) => {
          const shopName = removeAccents(data?.data_user?.shop_name || ""); 
          const searchValue = removeAccents(val); 

          return shopName.includes(searchValue); 
      });
      setFilteredData(filterDataShops);
  };
  const handleDetailShop = (item: any) => {
    navigation.navigate('DetailsShop', { data: item })
  }
  return (
    <View>
      <HeaderComponent title={`Danh mục cửa hàng`} isBack onBack={() => navigation.goBack()} />
      <SectionComponent styles={{ marginTop: 15 }}>
        <InputComponent placeholder='Tìm kiếm' backgroundColor={COLORS.WHITE} suffix={<SearchNormal1 size="32" color={COLORS.AZURE_BLUE} />} value={search} onChange={handleSearchQuery} />
      </SectionComponent>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: -30 }}>
        <SectionComponent styles={{ paddingBottom: 200 }}>
          <CardShopComponent onPress={handleDetailShop} shops={filteredData} currentLatitude={latitude} currentLongitude={longitude} />
        </SectionComponent>
      </ScrollView>
    </View>
  )
}

export default AllStoresScreen