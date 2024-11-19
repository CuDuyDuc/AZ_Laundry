import { Alert, Button, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { ButtonComponent, CardOrderDetailComponent, ContainerComponent, HeaderComponent, RowComponent, SectionComponent, TextComponent } from '../../components';
import { FONTFAMILY } from '../../../assets/fonts';
import COLORS from '../../assets/colors/Colors';
import IMAGES from '../../assets/images/Images';
import StepProgress from './StepProgress';
import { useEffect, useState } from 'react';
import { PaymentModel } from '../../model/payment_model';
import paymentAPI from '../../apis/paymentAPI';
import { usePaymentMethod } from '../../context/PaymentMethodContext';

const OrderDetatailsScreen = ({ navigation, route }: any) => {
  const {selectedPaymentMethod}=usePaymentMethod()
  const [payment, setPayment] = useState<PaymentModel[]>([]);
  const { paymentId } = route.params;

  const getDataPayment = async () => {
    try {
      const res: any = await paymentAPI.HandlePayment(`/get-order-by-id/${paymentId}`);
      const data = res.data;
      setPayment([data]);
      console.log('Payment data details:', data);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const totalProducts = payment.length > 0 && Array.isArray(payment[0].id_cart)
    ? payment[0].id_cart.length
    : 0;

  console.log("Total products: ", totalProducts);

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

  const cancelOrder = async () => {
    try {
      const response = await paymentAPI.HandlePayment('/update-confirmation-status', {
        _id: payment[0]._id,
        confirmationStatus: 'Đã hủy',
      }, 'post');

      Alert.alert('Thành công', 'Đơn hàng đã được hủy.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('OrderHistoryScreen'),
        },
      ]);

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Lỗi', 'Không thể hủy đơn hàng.');
    }
  };

  useEffect(() => {
    getDataPayment();
  }, [setPayment]);

  console.log('Payment data hihihihi:', payment);

  return (

    <ContainerComponent isScroll >
      <HeaderComponent title='Chi tiết đơn hàng' isBack onBack={() => navigation.goBack()} />

      <SectionComponent>

        <StepProgress status={payment.length > 0 ? payment[0].confirmationStatus : ''} />

        <TextComponent text={`Sản phẩm(${totalProducts})`} size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} styles={{ marginBottom: 20, marginTop: 10 }} />
        <RowComponent>
          <FlatList
            data={payment}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity >
                <View style={{ backgroundColor: COLORS.WHITE, borderRadius: 8 }}>
                  {/* Hiển thị danh sách sản phẩm trong id_cart */}
                  <FlatList
                    data={Array.isArray(item.id_cart) ? item.id_cart : []} // Duyệt qua từng giỏ hàng (cart) trong đơn hàng
                    keyExtractor={(cartItem) => cartItem._id.toString()}
                    renderItem={({ item: cartItem }) => (
                      <CardOrderDetailComponent
                        imageUrl={cartItem.id_product.product_photo[0]}
                        productName={cartItem.id_product.product_name}
                        short_description={cartItem.id_product.short_description}
                        price={cartItem.cart_subtotal}
                      />
                    )}
                  />
                </View>
              </TouchableOpacity>
            )}
          />

        </RowComponent>

        <RowComponent justify="flex-start" styles={{ alignItems: 'flex-start', marginTop: 10, marginBottom: 10 }}>
          <Image source={IMAGES.iconStatus} style={{ width: 20, height: 20, marginTop: 5, marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <TextComponent text="Trạng thái đơn hàng" size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} />
            <RowComponent justify="flex-start" styles={{ marginTop: 5, alignItems: 'flex-start' }}>
              <TextComponent text={payment.length > 0 ? payment[0].confirmationStatus : ''} size={14} color={COLORS.HEX_BLACK} styles={{ width: 100 }} />
            </RowComponent>
          </View>
        </RowComponent>

        <RowComponent justify="center" styles={{ marginBottom: 5, marginTop: 5 }}>
          <Image source={IMAGES.line} />
        </RowComponent>

        <RowComponent justify="flex-start" styles={{ alignItems: 'flex-start', marginTop: 10, marginBottom: 10 }}>
          <Image source={IMAGES.iconadress} style={{ width: 20, height: 20, marginTop: 5, marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <TextComponent text="Địa chỉ nhận hàng" size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} />
            <RowComponent justify="flex-start" styles={{ marginTop: 5, alignItems: 'flex-start' }}>
              <TextComponent text="Địa chỉ" size={14} color={COLORS.HEX_BLACK} styles={{ width: 60 }} />
              <TextComponent
                text={payment.length > 0 ? payment[0].address : ''}
                size={15}
                color={COLORS.HEX_BLACK}
                font={FONTFAMILY.montserrat_medium}
                styles={{ flex: 1, flexWrap: 'wrap', marginLeft: 10 , textAlign:'right'}}
              />
            </RowComponent>
          </View>
        </RowComponent>

        <RowComponent justify="center" styles={{ marginBottom: 5, marginTop: 5 }}>
          <Image source={IMAGES.line} />
        </RowComponent>

        <RowComponent justify="flex-start" styles={{ alignItems: 'flex-start', marginTop: 10, marginBottom: 10 }}>
          <Image source={IMAGES.iconpayment} style={{ width: 20, height: 20, marginTop: 5, marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <TextComponent text="Phương thức thanh toán" size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} />
            <RowComponent justify="flex-start" styles={{ marginTop: 5, alignItems: 'flex-start' }}>
              <TextComponent text={payment[0]?.method_payment ==='COD' ?"Thanh toán khi nhận hàng"  : " Thanh toán VNPay"} size={14} color={COLORS.HEX_BLACK} styles={{ width: 200 }} />
            </RowComponent>
          </View>
        </RowComponent>

        <SectionComponent>
          <TextComponent text='Chi tiết đơn hàng' size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} />
          <SectionComponent styles={{ backgroundColor: COLORS.WHITE, padding: 20, borderRadius: 5 }}>
            <RowComponent justify="space-between" styles={{ alignItems: 'center', marginBottom: 15 }}>
              <TextComponent text="Mã đơn hàng" size={16} color={COLORS.HEX_BLACK} />
              <TextComponent text={payment.length > 0 ? payment[0]._id.toString() : ""} size={16} color={COLORS.HEX_BLACK} />
            </RowComponent>
            <RowComponent justify="space-between" styles={{ alignItems: 'center', marginBottom: 15 }}>
              <TextComponent text="Giao hàng" size={16} color={COLORS.HEX_BLACK} />
              <TextComponent text={payment.length > 0 ? `${payment[0].data_payment.shipping_fee.toLocaleString('vi-VN')} VND` : ""} size={16} color={COLORS.HEX_BLACK} />
            </RowComponent>
            <RowComponent justify="space-between" styles={{ alignItems: 'center', marginBottom: 15 }}>
              <TextComponent text="Giảm giá" size={16} color={COLORS.HEX_BLACK} />
              <TextComponent text={payment.length > 0 ? `${payment[0].data_payment.discount.toLocaleString('vi-VN')} VND` : ""} size={16} color={COLORS.HEX_BLACK} />
            </RowComponent>
            <RowComponent justify="space-between" styles={{ alignItems: 'center', marginBottom: 15 }}>
              <TextComponent text="Tổng tiền" size={16} color={COLORS.HEX_BLACK} />
              <TextComponent text={payment.length > 0 ? `${payment[0].mount_money.toLocaleString('vi-VN')} VND` : ""} size={18} color={COLORS.RED} />
            </RowComponent>
          </SectionComponent>
        </SectionComponent>

        <RowComponent justify='center'>
          <ButtonComponent
            text="Hủy đơn"
            type="#00ADEF"
            textColor={COLORS.AZURE_BLUE}
            textStyles={{ fontFamily: FONTFAMILY.montserrat_medium }}
            styles={{
              width: "50%",
              marginRight: 10,
              backgroundColor: COLORS.WHITE,
              borderColor: COLORS.AZURE_BLUE,
              borderWidth: 1
            }}
            onPress={handleCancelOrder}  // Gọi hàm xử lý hủy đơn
            disable={!payment[0]?.confirmationStatus.includes("Chờ duyệt")}
          />
        </RowComponent>


      </SectionComponent>

    </ContainerComponent>
  );
};

export default OrderDetatailsScreen;