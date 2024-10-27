import React from 'react';
import { FlatList, View } from 'react-native';
import { HeaderComponent, RowComponent, SectionComponent, BoxStatusShopOrderComponent, CardOrderShopComponent } from '../../components';
import IMAGES from '../../assets/images/Images';
import { Scroll } from 'iconsax-react-native';
import { ScrollView } from 'react-native-virtualized-view';
import COLORS from '../../assets/colors/Colors';


const HistoryScreen = ({ navigation }: any) => {
  const statusList = [
    { status: 'Tất cả', number: 2 },
    { status: 'Chờ duyệt', number: 0 },
    { status: 'Đang giặt', number: 0 },
    { status: 'Đang giao', number: 0 },
    { status: 'Hoàn thành', number: 0 },
    { status: 'Đã hủy', number: 0 },
  ];

  const orderList = [
    { id: '#972297A1', status: 'Chờ duyệt', price: 300000, imgUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg', dateOrder: '28/09/2024' },
    { id: '#972297A2', status: 'Chờ duyệt', price: 300000, imgUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg', dateOrder: '28/09/2024' },
    { id: '#972297A3', status: 'Chờ duyệt', price: 300000, imgUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg', dateOrder: '28/09/2024' },
    { id: '#972297A4', status: 'Chờ duyệt', price: 300000, imgUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg', dateOrder: '28/09/2024' },
    { id: '#972297A5', status: 'Chờ duyệt', price: 300000, imgUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg', dateOrder: '28/09/2024' },
    { id: '#972297A6', status: 'Chờ duyệt', price: 300000, imgUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg', dateOrder: '28/09/2024' },
    { id: '#972297A7', status: 'Chờ duyệt', price: 300000, imgUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg', dateOrder: '28/09/2024' },
    { id: '#972297A8', status: 'Chờ duyệt', price: 300000, imgUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg', dateOrder: '28/09/2024' },
    { id: '#972297A9', status: 'Chờ duyệt', price: 300000, imgUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg', dateOrder: '28/09/2024' },
  ];

  // Hàm xử lý khi nhấn vào từng trạng thái
  const handleStatusPress = (status: string) => {
    console.log(`Selected status: ${status}`);
    // Thêm logic để xử lý khi nhấn vào trạng thái, ví dụ: lọc orderList
  };

  const handleOrderPress = (status: string) => {
    console.log('Selected order: ', status);
  };

  return (
    <View style={{backgroundColor: COLORS.WHITE}}>
      <HeaderComponent title="Đơn hàng" isBack onBack={() => navigation.goBack()} />

      <SectionComponent>
        <FlatList
          data={statusList}
          horizontal
          keyExtractor={(item) => item.status}
          renderItem={({ item }) => (
            <BoxStatusShopOrderComponent
              status={item.status}
              number={item.number}
              onPress={() => handleStatusPress(item.status)}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}
        />
      </SectionComponent>

      <SectionComponent styles={{ paddingBottom: 200 }}>

        <FlatList
          data={orderList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardOrderShopComponent
              id={item.id}
              status={item.status}
              price={item.price}
              imgUrl={item.imgUrl}
              dateOrder={item.dateOrder}
              onPress={() => handleOrderPress(item.id)}
            />
          )}
        />

      </SectionComponent>
    </View>
  );
};

export default HistoryScreen;
