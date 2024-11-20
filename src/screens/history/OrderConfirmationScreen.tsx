import React, { useEffect, useState } from 'react';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';
import { 
  HeaderComponent, 
  SectionComponent, 
  RowComponent, 
  ButtonComponent, 
  TextComponent, 
  CardOrderComponent 
} from '../../components';
import COLORS from '../../assets/colors/Colors';
import { FONTFAMILY } from '../../../assets/fonts';
import { PaymentModel } from '../../model/payment_model';
import paymentAPI from '../../apis/paymentAPI';
import { useFocusEffect } from '@react-navigation/native';

const OrderConfirmationScreen = ({ navigation, route }: any) => {
  const [payment, setPayment] = useState<PaymentModel[]>([]);
  const [confirmationStatus, setConfirmationStatus] = useState(route.params?.confirmationStatus || '');

  const handleAction = async (newStatus: string, itemId: string) => {
    try {
      const response = await paymentAPI.HandlePayment('/update-confirmation-status', {
        _id: itemId,
        confirmationStatus: newStatus,
      }, 'post');

      // Cập nhật danh sách cục bộ
      setPayment((prevPayment) => prevPayment.filter(item => item._id.toString() !== itemId));

      Alert.alert('Thành công', `Đơn hàng đã chuyển sang trạng thái "${newStatus}".`, [
        {
          text: 'OK',
          onPress: () => getDataPayment(), // Lấy lại dữ liệu
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật trạng thái đơn hàng.');
    }
  };

  const getButtonConfig = (status: string, itemId: string) => {
    switch (status) {
      case 'Chờ duyệt':
        return { text: 'Xác nhận', nextStatus: 'Đang giặt', onPress: () => handleAction('Đang giặt', itemId) };
      case 'Đang giặt':
        return { text: 'Giao hàng', nextStatus: 'Đang giao', onPress: () => handleAction('Đang giao', itemId) };
      case 'Đang giao':
        return { text: 'Hoàn thành', nextStatus: 'Hoàn thành', onPress: () => handleAction('Hoàn thành', itemId) };
      default:
        return null;
    }
  };

  const handleCancelOrder = async (itemId: string) => {
    try {
      const response = await paymentAPI.HandlePayment('/update-confirmation-status', {
        _id: itemId,
        confirmationStatus: 'Đã hủy',
      }, 'post');

      // Cập nhật danh sách cục bộ
      setPayment((prevPayment) => prevPayment.filter(item => item._id.toString() !== itemId));

      Alert.alert('Thành công', 'Đơn hàng đã được hủy.', [
        {
          text: 'OK',
          onPress: () => getDataPayment(), // Lấy lại dữ liệu
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Lỗi', 'Không thể hủy đơn hàng.');
    }
  };

  const getDataPayment = async () => {
    try {
      const res: any = await paymentAPI.HandlePayment(`/get-orders-by-status?status=${confirmationStatus}`);
      const data: PaymentModel[] = res.data;
      setPayment(data);
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
    }, [confirmationStatus])
  );

  return (
    <View>
      <HeaderComponent title="Đơn hàng yêu cầu" isBack onBack={() => navigation.goBack()} />

      <SectionComponent styles={{ paddingBottom: 150 }}>
        <FlatList
          data={payment}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const buttonConfig = getButtonConfig(item.confirmationStatus, item._id.toString());

            return (
              <TouchableOpacity>
                <View style={{ backgroundColor: COLORS.WHITE, borderRadius: 8 }}>
                  {/* Header */}
                  <RowComponent justify="space-between" styles={{ padding: 10 }}>
                    <TextComponent text={`#${item._id}`} size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} />
                    <TextComponent text={new Date(item.createdAt).toLocaleDateString('vi-VN')} color={COLORS.BLUE_GRAY} size={15} />
                  </RowComponent>

                  {/* Cart Items */}
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

                  {/* Payment Info */}
                  <SectionComponent>
                  <RowComponent>
                    <TextComponent text="Thông tin thanh toán" color={COLORS.BLUE_GRAY} size={15} font={FONTFAMILY.montserrat_bold} />
                  </RowComponent>

                  <RowComponent justify="space-between">
                    <TextComponent text="Tiền dịch vụ" color={COLORS.BLUE_GRAY} size={15} font={FONTFAMILY.montserrat_bold} />
                    <TextComponent text={`${item.data_payment.total.toLocaleString('vi-VN')} VND`} color={COLORS.HEX_BLACK} size={15} />
                  </RowComponent>

                  <RowComponent justify="space-between">
                    <TextComponent text="Phí ship" color={COLORS.BLUE_GRAY} size={15} font={FONTFAMILY.montserrat_bold} />
                    <TextComponent text={`${item.data_payment.shipping_fee.toLocaleString('vi-VN')} VND`} color={COLORS.HEX_BLACK} size={15} />
                  </RowComponent>
                    <RowComponent justify="space-between">
                      <TextComponent text="Tổng thanh toán" color={COLORS.BLUE_GRAY} size={15} font={FONTFAMILY.montserrat_bold} />
                      <TextComponent text={`${item.mount_money.toLocaleString('vi-VN')} VND`} color={COLORS.HEX_BLACK} size={15} />
                    </RowComponent>
                  </SectionComponent>

                  {/* Buttons */}
                  {buttonConfig && (
                    <RowComponent justify="center" styles={{ marginTop: 5, marginBottom: 20 }}>
                      <ButtonComponent
                        text="Hủy"
                        type="#00ADEF"
                        textColor={COLORS.RED}
                        styles={{
                          width: "45%",
                          marginRight: 10,
                          backgroundColor: COLORS.WHITE,
                          borderColor: COLORS.RED,
                          borderWidth: 1,
                        }}
                        onPress={() => handleCancelOrder(item._id.toString())}
                      />
                      <ButtonComponent
                        text={buttonConfig.text}
                        type="#00ADEF"
                        styles={{ width: "45%" }}
                        onPress={buttonConfig.onPress}
                      />
                    </RowComponent>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </SectionComponent>
    </View>
  );
};

export default OrderConfirmationScreen;
