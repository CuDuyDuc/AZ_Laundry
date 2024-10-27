import { TouchableOpacity } from 'react-native';
import { CardOrderComponent, ContainerComponent, HeaderComponent, RowComponent, TextComponent } from '../../components';
import { FONTFAMILY } from '../../../assets/fonts';
import { ScrollView } from 'react-native-virtualized-view';
import COLORS from '../../assets/colors/Colors';
import { Image } from 'react-native-svg';
import { useState } from 'react';

const orders = [
  {
    id: '#123456',
    productName: 'Áo sơ mi trắng',
    status: 'Chờ xác nhận',
    price: 150000,
    quantity: 2,
    imageUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg',
  },
  {
    id: '#654321',
    productName: 'Quần jean nam',
    status: 'Chờ lấy hàng',
    price: 300000,
    quantity: 1,
    imageUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg',
  },
  {
    id: '#789012',
    productName: 'Váy nữ',
    status: 'Chờ xác nhận',
    price: 250000,
    quantity: 1,
    imageUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg',
  },
  {
    id: '#789013',
    productName: 'Váy nữ',
    status: 'Chờ xác nhận',
    price: 250000,
    quantity: 1,
    imageUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg',
  },
  {
    id: '#789014',
    productName: 'Váy nữ',
    status: 'Chờ xác nhận',
    price: 250000,
    quantity: 1,
    imageUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg',
  },
  {
    id: '#789015',
    productName: 'Váy nữ',
    status: 'Chờ xác nhận',
    price: 250000,
    quantity: 1,
    imageUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg',
  },
  {
    id: '#789016',
    productName: 'Váy nữ',
    status: 'Đã xong',
    price: 250000,
    quantity: 1,
    imageUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg',
  },
  {
    id: '#789017',
    productName: 'Váy nữ',
    status: 'Đã xong',
    price: 250000,
    quantity: 1,
    imageUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg',
  },
  {
    id: '#789018',
    productName: 'Váy nữ',
    status: 'Chờ xác nhận',
    price: 250000,
    quantity: 1,
    imageUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg',
  },
];

const OrderHistoryScreen= ({navigation}: any) => {
  const [activeTab, setActiveTab] = useState<string>('Chờ xác nhận');

  const filterOrdersByTab = () => {
    return orders.filter((order) => order.status === activeTab);
  };

  const tabs = [
    { key: 'Chờ xác nhận', label: 'Chờ xác nhận', Image: require('../../assets/images/bo_vest.png') },
    { key: 'Chờ lấy hàng', label: 'Chờ lấy hàng'},
    { key: 'Đã xong', label: 'Đã xong'},
    { key: 'Đánh giá', label: 'Đánh giá' },
  ];

  return (
    <ContainerComponent isScroll styleBackground={{backgroundColor: COLORS.WHITE}}>

      <HeaderComponent title='Lịch sử đơn hàng'  isBack onBack={() => navigation.goBack()}/>
      <RowComponent justify="space-around" styles={{ paddingVertical: 10, backgroundColor: COLORS.WHITE }}>

        {tabs.map((tab) => ( // set trạng thái cho tab
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}

            style={{ borderBottomWidth: activeTab === tab.key ? 2 : 0, borderBottomColor: '#2A9DF4' }}>
            <TextComponent
              text={tab.key}
              size={14}
              color={activeTab === tab.key ? '#2A9DF4' : '#999'}
              font={activeTab === tab.key ? 'bold' : 'normal'}
              styles={{ borderBottomWidth: activeTab === tab.key ? 2 : 0, borderBottomColor: COLORS.AZURE_BLUE }}/>

          </TouchableOpacity>
        ))}
      </RowComponent>
      <ScrollView>
        <CardOrderComponent orders={filterOrdersByTab()} onPress={() => {navigation.navigate('OrderDetatailsScreen')}}/>
      </ScrollView>
    </ContainerComponent>
  );
};

export default OrderHistoryScreen;