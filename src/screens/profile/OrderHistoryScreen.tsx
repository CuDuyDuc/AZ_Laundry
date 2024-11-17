import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { BoxStatusShopOrderComponent, ButtonComponent, CardOrderComponent, ContainerComponent, HeaderComponent, RowComponent, SectionComponent, TextComponent } from '../../components';
import { FONTFAMILY } from '../../../assets/fonts';
import COLORS from '../../assets/colors/Colors';
import { useEffect, useState } from 'react';
import paymentAPI from '../../apis/paymentAPI';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { PaymentModel } from '../../model/payment_model';

const OrderHistoryScreen = ({ navigation }: any) => {
  const [payment, setPayment] = useState<PaymentModel[]>([]);
  const [filteredPayment, setFilteredPayment] = useState<PaymentModel[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('Tất cả');
  const [loading, setLoading] = useState<boolean>(true);
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

    if (status === 'Tất cả') {
      setFilteredPayment(payment);
    } else {
      const filtered = payment.filter((item) => item.confirmationStatus == status);
      setFilteredPayment(filtered);
    }
  };

  const onOrderPress = (id: string) => {
    navigation.navigate('OrderDetatailsScreen', { paymentId: id });
  };

  const getDataPayment = async () => {
    try {
      setLoading(true);
      const res: any = await paymentAPI.HandlePayment(`/get-order`);
      const data: PaymentModel[] = res.data;
      setPayment(data);
      setFilteredPayment(data);

      // Update status counts
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
    } finally {
      setLoading(false);
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
    <ContainerComponent isScroll styleBackground={{ backgroundColor: COLORS.WHITE }}>
      <HeaderComponent title="Lịch sử đơn hàng" isBack onBack={() => navigation.goBack()} />

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

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE} />
      ) : filteredPayment.length ? (
        <SectionComponent >
          <FlatList
            data={filteredPayment}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onOrderPress(item._id.toString())}>
                <View style={{ backgroundColor: COLORS.WHITE, borderRadius: 8 }}>
                  <TextComponent text={`#${item._id}`} size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} />

                  <FlatList
                    data={Array.isArray(item.id_cart) ? item.id_cart : []}
                    keyExtractor={(cartItem) => cartItem._id.toString()}
                    renderItem={({ item: cartItem }) => (
                      <CardOrderComponent
                        imgUrl={cartItem.id_product.product_photo[0]}
                        name={cartItem.id_product.product_name}
                        short_description={cartItem.id_product.short_description}
                        status={item.confirmationStatus}
                        total={cartItem.cart_subtotal}
                        quantity={cartItem.product_quantity}
                        id={cartItem._id.toString()}
                      />
                    )}
                  />

                  {item.confirmationStatus == 'Hoàn thành' && (
                    <RowComponent justify="flex-end" styles={{ marginTop: 5, marginBottom: 20 }}>
                      <ButtonComponent
                        text="Đặt lại"
                        type="#00ADEF"
                        textColor={COLORS.AZURE_BLUE}
                        textStyles={{ fontFamily: FONTFAMILY.montserrat_medium }}
                        styles={{
                          width: "30%",
                          marginRight: 10,
                          backgroundColor: COLORS.WHITE,
                          borderColor: COLORS.AZURE_BLUE,
                          borderWidth: 1,
                        }}
                      />
                      <ButtonComponent
                        text="Đánh giá"
                        type="#00ADEF"
                        styles={{ width: "30%" }}
                        textStyles={{ fontFamily: FONTFAMILY.montserrat_medium }}
                        onPress={() => navigation.navigate('ReviewProductsScreen', { paymentId: item._id })}
                      />
                    </RowComponent>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        </SectionComponent>
      ) : (
        <TextComponent text="Không có đơn hàng nào" />
      )}
    </ContainerComponent>
  );
};

export default OrderHistoryScreen;
