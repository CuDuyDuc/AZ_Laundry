import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { HeaderComponent, SectionComponent, BoxStatusShopOrderComponent, CardOrderShopComponent } from '../../components';
import COLORS from '../../assets/colors/Colors';
import { PaymentModel } from '../../model/payment_model';
import paymentAPI from '../../apis/paymentAPI';
import { useFocusEffect } from '@react-navigation/native';

const HistoryScreen = ({ navigation }: any) => {
  const [payment, setPayment] = useState<PaymentModel[]>([]);
  const [filteredPayment, setFilteredPayment] = useState<PaymentModel[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('Tất cả'); // Trạng thái được chọn
  const [statusList, setStatusList] = useState([
    { status: 'Tất cả', number: 0 },
    { status: 'Chờ duyệt', number: 0 },
    { status: 'Đang giặt', number: 0 },
    { status: 'Đang giao', number: 0 },
    { status: 'Hoàn thành', number: 0 },
    { status: 'Đã hủy', number: 0 },
  ]);

  const handleStatusPress = (status: string) => {
    setSelectedStatus(status);
    console.log(`Selected status: ${status}`);

    if (status === 'Tất cả') {
      setFilteredPayment(payment);
      console.log('Payment data:', payment);
    } else {
      console.log(`Selected status 1: ${status}`);
      const filtered = payment.filter((item) => item.confirmationStatus == status);
      setFilteredPayment(filtered);
      console.log('Filtered data:', filtered);
    }
  };

  const handleOrderPress = (id: string) => {
    console.log('Selected payment: ', id);
  };

  const getDataPayment = async () => {
    try {
      const res: any = await paymentAPI.HandlePayment(`/get-order`);
      const data: PaymentModel[] = res.data;
      setPayment(data);
      setFilteredPayment(data);

      // Đếm số lượng đơn hàng theo từng trạng thái
      const updatedStatusList = statusList.map((statusItem) => {
        if (statusItem.status === 'Tất cả') {
          return { ...statusItem, number: data.length };
        }
        const count = data.filter((item) => item.confirmationStatus == statusItem.status).length;
        return { ...statusItem, number: count };
      });

      setStatusList(updatedStatusList);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    getDataPayment();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getDataPayment();
    }, [])
  );

  return (
    <View style={{ backgroundColor: COLORS.WHITE, flex: 1 }}>
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
              isSelected={selectedStatus === item.status}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}
        />
      </SectionComponent>

      <SectionComponent styles={{ paddingBottom: 200 }}>
        <FlatList
          data={filteredPayment}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <CardOrderShopComponent
              id={item._id.toString()}
              status={item.confirmationStatus.toString()}
              price={item.mount_money}
              imgUrl={item.imgUrl}
              dateOrder={new Date(item.createdAt).toLocaleDateString('vi-VN')}
              onPress={() => navigation.navigate('OrderConfirmationScreen')}
            />
          )}
        />
      </SectionComponent>
    </View>
  );
};

export default HistoryScreen;
