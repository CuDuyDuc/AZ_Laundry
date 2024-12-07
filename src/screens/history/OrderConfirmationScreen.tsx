import React, {useEffect, useState} from 'react';
import {Alert, FlatList, TouchableOpacity, View} from 'react-native';
import {
  HeaderComponent,
  SectionComponent,
  RowComponent,
  ButtonComponent,
  TextComponent,
  CardOrderComponent,
} from '../../components';
import COLORS from '../../assets/colors/Colors';
import {FONTFAMILY} from '../../../assets/fonts';
import {PaymentModel} from '../../model/payment_model';
import paymentAPI from '../../apis/paymentAPI';
import {useFocusEffect} from '@react-navigation/native';
import NotificationService from '../notification/service/NotificationService';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';
import {ScrollView} from 'react-native-virtualized-view';

const OrderConfirmationScreen = ({navigation, route}: any) => {
  const [payment, setPayment] = useState<PaymentModel[]>([]);
  const [confirmationStatus, setConfirmationStatus] = useState(
    route.params?.confirmationStatus || '',
  );
  const user = useSelector(authSelector);
  const {paymentData} = route.params;

  const handleAction = async (newStatus: string, itemId: string) => {
    try {
      if (user.id) {
        const response = await paymentAPI.HandlePayment(
          '/update-confirmation-status',
          {
            _id: itemId,
            confirmationStatus: newStatus,
            id_shop: user.id,
          },
          'post',
        );
      }

      // Cập nhật danh sách cục bộ
      setPayment(prevPayment =>
        prevPayment.filter(item => item._id.toString() !== itemId),
      );
      navigation.navigate('History',{confirmStatus:newStatus})
      NotificationService.sendNotificationToServer({
        title: 'Cập nhật đơn hàng',
        body: 'Đơn hàng của bạn đã được xác nhận!💎💎',
        sender: user?.id,
        userId: payment[0].id_user?._id,
        object_type_id: payment[0]._id,
        notification_type: 'order_update',
      });
      Alert.alert(
        'Thành công',
        `Đơn hàng đã chuyển sang trạng thái "${newStatus}".`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('History',{ confirmStatus:newStatus})
              return getDataPayment()
            }
          },
        ],
      );
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật trạng thái đơn hàng.');
    }
  };

  const getButtonConfig = (status: string, itemId: string) => {
    switch (status) {
      case 'Chờ duyệt':
        return {
          text: 'Xác nhận',
          nextStatus: 'Đang giặt',
          onPress: () => handleAction('Đang giặt', itemId),
        };
      case 'Đang giặt':
        return {
          text: 'Giao hàng',
          nextStatus: 'Đang giao',
          onPress: () => handleAction('Đang giao', itemId),
        };
      case 'Đang giao':
        return {
          text: 'Hoàn thành',
          nextStatus: 'Hoàn thành',
          onPress: () => handleAction('Hoàn thành', itemId),
        };
      default:
        return null;
    }
  };
  const buttonConfig = getButtonConfig(
    confirmationStatus,
    paymentData._id.toString(),
  );

  const handleCancelOrder = async (itemId: string) => {
    try {
      const response = await paymentAPI.HandlePayment(
        '/update-confirmation-status',
        {
          _id: itemId,
          id_shop: user.id,
          confirmationStatus: 'Đã hủy',
        },
        'post',
      );

      // Cập nhật danh sách cục bộ
      if (response) {
        setPayment(prevPayment =>
          prevPayment.filter(item => item._id.toString() !== itemId),
        );
        NotificationService.sendNotificationToServer({
          title: 'Cập nhật đơn hàng',
          body: 'Đơn hàng của bạn đã bị huỷ!💎💎',
          sender: user?.id,
          userId: payment[0].id_user?._id,
          object_type_id: payment[0]._id,
          notification_type: 'order_update',
        });
        Alert.alert('Thành công', 'Đơn hàng đã được hủy.', [
          {
            text: 'OK',
            onPress: () =>{
              navigation.navigate('History',{ confirmStatus:"Đã hủy"})
              return getDataPayment() // Lấy lại dữ liệu
            }  
          },
        ]);
        
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Lỗi', 'Không thể hủy đơn hàng.');
    }
  };

  const getDataPayment = async () => {
    try {
      const res: any = await paymentAPI.HandlePayment(
        `/get-orders-by-status?status=${confirmationStatus}&userId=${user?.id}`,
      );
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
    }, [confirmationStatus]),
  );
  const getProductByIdShop = (product: any) => {
    return product?.filter((cart: any) => cart.id_product.id_user === user.id);
  };
  const mountServiceByIdShop = (service_fee: any, shipping_fee: any) => {
    return service_fee + shipping_fee;
  };
  return (
    <ScrollView>
      <HeaderComponent
        title="Đơn hàng yêu cầu"
        isBack
        onBack={() => navigation.navigate('History',{ confirmStatus:confirmationStatus})}
      />

      <SectionComponent styles={{paddingBottom: 150}}>
        <TouchableOpacity>
          <View style={{backgroundColor: COLORS.WHITE, borderRadius: 8}}>
            <RowComponent justify="space-between" styles={{padding: 10}}>
              <TextComponent
                text={`#${paymentData._id.toString().substring(0, 10)}`}
                size={16}
                color={COLORS.HEX_BLACK}
                font={FONTFAMILY.montserrat_bold}
              />
              <TextComponent
                text={new Date(paymentData.createdAt).toLocaleDateString('vi-VN')}
                color={COLORS.BLUE_GRAY}
                size={15}
              />
            </RowComponent>

            <FlatList
              data={getProductByIdShop(paymentData.id_cart)}
              keyExtractor={item => item._id.toString()}
              renderItem={({item}) => (
                <CardOrderComponent
                  imgUrl={item.id_product.product_photo[0]}
                  name={item.id_product.product_name}
                  short_description={item.id_product.short_description}
                  status={item.confirmationStatus}
                  total={item.cart_subtotal}
                  quantity={item.product_quantity}
                  id={item._id.toString()}
                />
              )}
            />
            
            <SectionComponent>
              <RowComponent justify='space-between'>
                <TextComponent text={'Tên khách hàng: '} size={15} color={COLORS.BLUE_GRAY} font={FONTFAMILY.montserrat_medium} />
                <TextComponent text={paymentData.full_name} size={15} color={COLORS.BLUE_GRAY}  />
              </RowComponent>
              <RowComponent justify='flex-start' styles={{alignItems:'flex-start'}}>
                <TextComponent text={'Địa chỉ: '} size={15} color={COLORS.BLUE_GRAY} font={FONTFAMILY.montserrat_medium} />
                <TextComponent text={paymentData.address} size={15} color={COLORS.BLUE_GRAY} styles={{ flex: 1, flexWrap: 'wrap', marginLeft: 10, textAlign: 'right' }}/>
              </RowComponent>
              <RowComponent justify='space-between'>
                <TextComponent text={'Số điện thoại: '} size={15} color={COLORS.BLUE_GRAY} font={FONTFAMILY.montserrat_medium} />
                <TextComponent text={paymentData.number_phone} size={15} color={COLORS.BLUE_GRAY}  />
              </RowComponent>
              <RowComponent>
                <TextComponent
                  text="Thông tin thanh toán"
                  color={COLORS.BLUE_GRAY}
                  size={15}
                  font={FONTFAMILY.montserrat_medium}
                />
              </RowComponent>

              <RowComponent justify="space-between">
                <TextComponent
                  text="Tiền dịch vụ"
                  color={COLORS.BLUE_GRAY}
                  size={15}
                  font={FONTFAMILY.montserrat_medium}
                />
                <TextComponent
                  text={`${paymentData.shop_details[0].service_fee.toLocaleString(
                    'vi-VN',
                  )} VND`}
                  color={COLORS.BLUE_GRAY}
                  size={15}
                />
              </RowComponent>

              <RowComponent justify="space-between">
                <TextComponent
                  text="Phí ship"
                  color={COLORS.BLUE_GRAY}
                  size={15}
                  font={FONTFAMILY.montserrat_medium}
                />
                <TextComponent
                  text={`${paymentData.shop_details[0].shipping_fee.toLocaleString(
                    'vi-VN',
                  )} VND`}
                  color={COLORS.BLUE_GRAY}
                  size={15}
                />
              </RowComponent>
              <RowComponent justify="space-between">
                <TextComponent
                  text="Tổng thanh toán"
                  color={COLORS.BLUE_GRAY}
                  size={15}
                  font={FONTFAMILY.montserrat_medium}
                />
                <TextComponent
                  text={`${mountServiceByIdShop(
                    paymentData.shop_details[0].shipping_fee,
                    paymentData.shop_details[0].service_fee,
                  ).toLocaleString('vi-VN')} VND`}
                  color={COLORS.BLUE_GRAY}
                  size={15}
                />
              </RowComponent>
            </SectionComponent>
            {buttonConfig && (
              <RowComponent
                justify="center"
                styles={{marginTop: 5, marginBottom: 20}}>
                <ButtonComponent
                  text="Hủy"
                  type="#00ADEF"
                  disable={confirmationStatus!=='Chờ duyệt'}
                  textColor={COLORS.RED}
                  styles={{
                    width: '45%',
                    marginRight: 10,
                    backgroundColor: COLORS.WHITE,
                    borderColor: COLORS.RED,
                    borderWidth: 1,
                  }}
                  onPress={() => handleCancelOrder(paymentData._id.toString())}
                />
                <ButtonComponent
                  text={buttonConfig.text}
                  type="#00ADEF"
                  styles={{width: '45%'}}
                  onPress={buttonConfig.onPress}
                />
              </RowComponent>
            )}
          </View>
        </TouchableOpacity>
      </SectionComponent>
    </ScrollView>
  );
};

export default OrderConfirmationScreen;
