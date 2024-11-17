import React, { useEffect, useState } from 'react';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';
import { HeaderComponent, SectionComponent, BoxStatusShopOrderComponent, CardOrderShopComponent, RowComponent, ButtonComponent, TextComponent, CardOrderComponent } from '../../components';
import COLORS from '../../assets/colors/Colors';
import { FONTFAMILY } from '../../../assets/fonts';
import { PaymentModel } from '../../model/payment_model';
import paymentAPI from '../../apis/paymentAPI';
import { useFocusEffect } from '@react-navigation/native';

const OrderConfirmationScreen = ({ navigation }: any) => {
  const [payment, setPayment] = useState<PaymentModel[]>([]);

  const handleCancelOrder = () => {
    if (payment[0]?.confirmationStatus == 'Chờ duyệt') {
      Alert.alert(
        'Xác nhận hủy đơn',
        'Bạn có chắc chắn muốn hủy đơn hàng này?',
        [
          { text: 'Hủy', style: 'cancel' },
          { text: 'Đồng ý', onPress: () => cancelOrder() }
        ]
      );
    } else {
      Alert.alert('Không thể hủy', 'Đơn hàng không ở trạng thái có thể hủy.');
    }
  };

  const handleComfirmOrder = () => {
    if (payment[0]?.confirmationStatus == 'Chờ duyệt') {
      Alert.alert(
        'Xác nhận đơn hàng',
        'Bạn có chắc chắn muốn xác nhận đơn hàng này?',
        [
          { text: 'Hủy', style: 'cancel' },
          { text: 'Đồng ý', onPress: () => comfirmOrder() }
        ]
      );
    } else {
      Alert.alert('Không thể hủy', 'Đơn hàng không ở trạng thái có thể hủy.');
    }
  };

  const comfirmOrder = async () => {
    try {
      const response = await paymentAPI.HandlePayment('/update-confirmation-status', {
        _id: payment[0]._id,
        confirmationStatus: 'Đang giặt',
      }, 'post');

      Alert.alert('Thành công', 'Đơn hàng đã được xác nhận.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('OrderConfirmationScreen'),
        },
      ]);

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Lỗi', 'Không thể xác nhận đơn hàng.');
    }
  };

  const cancelOrder = async () => {
    try {
      const response = await paymentAPI.HandlePayment('/update-confirmation-status', {
        _id: payment[0]._id,
        confirmationStatus: 'Đã hủy',
      }, 'post');

      Alert.alert('Thành công', 'Đơn hàng đã được hủy.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('OrderConfirmationScreen'),
        },
      ]);

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Lỗi', 'Không thể hủy đơn hàng.');
    }
  };

  const getDataPayment = async () => {
    try {
      const res: any = await paymentAPI.HandlePayment(`/get-pending-orders`);
      const data: PaymentModel[] = res.data;
      setPayment(data);
    } catch (error) {
      console.log('Error: ', error);
    };
  }

  useEffect(() => {
    getDataPayment();
  }, [payment]);

  useFocusEffect(
    React.useCallback(() => {
      getDataPayment();
    }, [])
  );

  return (
    <View >
      <HeaderComponent title="Đơn hàng yêu cầu" isBack onBack={() => navigation.goBack()} />

      <SectionComponent styles={{ paddingBottom: 150 }}>
        <FlatList
          data={payment}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={{ backgroundColor: COLORS.WHITE, borderRadius: 8 }}>
                <RowComponent justify="space-between" styles={{ padding: 10 }}>
                  <TextComponent text={`#${item._id}`} size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} />
                  <TextComponent text={new Date(item.createdAt).toLocaleDateString('vi-VN')} color={COLORS.BLUE_GRAY} styles={{ marginRight: 30 }} size={15} />
                </RowComponent>
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
                <SectionComponent>
                  <RowComponent>
                    <TextComponent text="Thông tin thanh toán" color={COLORS.BLUE_GRAY} size={15} font={FONTFAMILY.montserrat_bold} />
                  </RowComponent>

                  <RowComponent justify="space-between">
                    <TextComponent text="Tiền dịch vụ" color={COLORS.BLUE_GRAY} size={15} font={FONTFAMILY.montserrat_bold} />
                    <TextComponent text={`${item.data_payment.discount.toLocaleString('vi-VN')} VND`} color={COLORS.HEX_BLACK} styles={{ marginRight: 30 }} size={15} />
                  </RowComponent>

                  <RowComponent justify="space-between">
                    <TextComponent text="Phí ship" color={COLORS.BLUE_GRAY} size={15} font={FONTFAMILY.montserrat_bold} />
                    <TextComponent text={`${item.data_payment.shipping_fee.toLocaleString('vi-VN')} VND`} color={COLORS.HEX_BLACK} styles={{ marginRight: 30 }} size={15} />
                  </RowComponent>

                  <RowComponent justify="space-between">
                    <TextComponent text="Tổng thanh toán" color={COLORS.BLUE_GRAY} size={15} font={FONTFAMILY.montserrat_bold} />
                    <TextComponent text={`${item.data_payment.total.toLocaleString('vi-VN')} VND`} color={COLORS.HEX_BLACK} styles={{ marginRight: 30 }} size={15} />
                  </RowComponent>

                </SectionComponent>

                {item.confirmationStatus == 'Chờ duyệt' && (
                  <RowComponent justify="center" styles={{ marginTop: 5, marginBottom: 20 }}>
                    <ButtonComponent
                      text="Hủy"
                      type="#00ADEF"
                      textColor={COLORS.RED}
                      textStyles={{ fontFamily: FONTFAMILY.montserrat_medium }}
                      styles={{
                        width: "45%",
                        marginRight: 10,
                        backgroundColor: COLORS.WHITE,
                        borderColor: COLORS.RED,
                        borderWidth: 1,
                      }}
                      onPress={handleCancelOrder}
                    />
                    <ButtonComponent
                      text="Xác nhận"
                      type="#00ADEF"
                      styles={{ width: "45%" }}
                      textStyles={{ fontFamily: FONTFAMILY.montserrat_medium }}
                      onPress={handleComfirmOrder}
                    />
                  </RowComponent>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </SectionComponent>

    </View>
  );
};


export default OrderConfirmationScreen;
