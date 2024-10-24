import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { RowComponent, TextComponent, CardOrderComponent, ContainerComponent, HeaderComponent } from '../../components';
import COLORS from '../../assets/colors/Colors';

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
    status: 'Đã xong',
    price: 250000,
    quantity: 1,
    imageUrl: 'https://product.hstatic.net/1000360022/product/untitled-1_5e528fba12a8424da3337e0a0766b434.jpg',
  },
];

const OrderHistoryScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Chờ xác nhận');

  const filterOrdersByTab = () => {
    return orders.filter((order) => order.status === activeTab);
  };

  return (
    <ContainerComponent>
      <HeaderComponent title='Thông tin cá nhân' />
      <RowComponent justify="space-around" styles={{ paddingVertical: 10, backgroundColor: '#fff' }}>
        {['Chờ xác nhận', 'Chờ lấy hàng', 'Đã xong', 'Đánh giá'].map((tab) => ( // set trạng thái cho tab
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{ borderBottomWidth: activeTab === tab ? 2 : 0, borderBottomColor: '#2A9DF4' }}>
            <TextComponent
              text={tab}
              size={14}
              color={activeTab === tab ? '#2A9DF4' : '#999'}
              font={activeTab === tab ? 'bold' : 'normal'}/>
          </TouchableOpacity>
        ))}
      </RowComponent>
      <ScrollView>
        <CardOrderComponent orders={filterOrdersByTab()} />
      </ScrollView>
    </ContainerComponent>
  );
};

export default OrderHistoryScreen;
