import { SearchNormal1 } from 'iconsax-react-native';
import React, { useState } from 'react';
import COLORS from '../../../assets/colors/Colors';
import { CardShopComponent, HeaderComponent, InputComponent, SectionComponent } from '../../../components';
import { View } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

const AllStoresScreen = ({ route, navigation }: any) => {
  const { latitude, longitude } = route.params
  const [search, setSearch] = useState('')
  const handleDetailShop = (item: any) => {
    navigation.navigate('DetailsShop', { data: item })
  }
  return (
    <View>
      <HeaderComponent title={`Danh mục cửa hàng`} isBack onBack={() => navigation.goBack()} />
      <SectionComponent styles={{ marginTop: 15 }}>
        <InputComponent placeholder='Tìm kiếm' backgroundColor={COLORS.WHITE} suffix={<SearchNormal1 size="32" color={COLORS.AZURE_BLUE} />} value={search} onChange={(val: any) => setSearch(val)} />
      </SectionComponent>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: -30 }}>
        <SectionComponent styles={{ paddingBottom: 200 }}>
          <CardShopComponent onPress={handleDetailShop} currentLatitude={latitude} currentLongitude={longitude} />
        </SectionComponent>
      </ScrollView>
    </View>
  )
}

export default AllStoresScreen