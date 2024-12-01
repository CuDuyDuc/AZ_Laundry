import { useState } from 'react';
import { Alert, FlatList, Image, View } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { FONTFAMILY } from '../../../assets/fonts';
import paymentAPI from '../../apis/paymentAPI';
import COLORS from '../../assets/colors/Colors';
import IMAGES from '../../assets/images/Images';
import { ButtonComponent, CardOrderDetailComponent, ContainerComponent, HeaderComponent, RowComponent, SectionComponent, TextComponent } from '../../components';
import { usePaymentMethod } from '../../context/PaymentMethodContext';
import { PaymentModel } from '../../model/payment_model';
import StepProgress from './StepProgress';

const OrderDetatailsScreen = ({ navigation, route }: any) => {
  const {selectedPaymentMethod}=usePaymentMethod()
  const [payment, setPayment] = useState<PaymentModel[]>([]);
  const { productData,paymentData } = route.params;

 

  const totalProducts = Array.isArray(productData?.products)
    ? productData?.products.length
    : 0;

  console.log("Total products: ", totalProducts);

  const handleCancelOrder = () => {
    if (productData?.shopDetail?.confirmationStatus == 'Chờ duyệt') {
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
        _id: paymentData?._id,
        id_shop:productData?.shopDetail?.id_shop,
        confirmationStatus: 'Đã hủy',
      }, 'post');

      if(response){
        Alert.alert('Thành công', 'Đơn hàng đã được hủy.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('OrderHistoryScreen'),
          },
        ]);
      }

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Lỗi', 'Không thể hủy đơn hàng.');
    }
  };
  const mountServiceByIdShop=(service_fee:any,shipping_fee:any)=>{
    return service_fee + shipping_fee
  }
  return (

    <ContainerComponent>
      <HeaderComponent title='Chi tiết đơn hàng' isBack onBack={() => navigation.goBack()} />
      <SectionComponent>
        <StepProgress status={ productData?.shopDetail?.confirmationStatus} />
      </SectionComponent>

      <ScrollView>
        <SectionComponent styles={{marginBottom:400}}>


          <TextComponent text={`Sản phẩm(${totalProducts})`} size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} styles={{ marginBottom: 20, marginTop: 10 }} />
          <RowComponent>
          <FlatList
            data={productData.products} // Duyệt qua từng giỏ hàng (cart) trong đơn hàng
            keyExtractor={(cartItem) => cartItem._id.toString()}
            renderItem={({ item: cartItem }) => (
              <View style={{ backgroundColor: COLORS.WHITE, borderRadius: 8, paddingTop:15, marginBottom:8}}>
                <CardOrderDetailComponent
                imageUrl={cartItem.id_product.product_photo[0]}
                productName={cartItem.id_product.product_name}
                short_description={cartItem.id_product.short_description}
                price={cartItem.cart_subtotal}/>
              </View>
            )}/>

          </RowComponent>

          <RowComponent justify="flex-start" styles={{ alignItems: 'flex-start', marginTop: 10, marginBottom: 10 }}>
            <Image source={IMAGES.iconStatus} style={{ width: 20, height: 20, marginTop: 5, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <TextComponent text="Trạng thái đơn hàng" size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} />
              <RowComponent justify="flex-start" styles={{ marginTop: 5, alignItems: 'flex-start' }}>
                <TextComponent text={productData?.shopDetail?.confirmationStatus} size={14} color={COLORS.HEX_BLACK} styles={{ width: 100 }} />
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
                  text={paymentData?.address}
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
                <TextComponent text={paymentData.method_payment ==='COD' ?"Thanh toán khi nhận hàng"  : " Thanh toán VNPay"} size={14} color={COLORS.HEX_BLACK} styles={{ width: 200 }} />
              </RowComponent>
            </View>
          </RowComponent>

          <SectionComponent>
            <TextComponent text='Chi tiết đơn hàng' size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} />
            <SectionComponent styles={{ backgroundColor: COLORS.WHITE, padding: 20, borderRadius: 5 }}>
              <RowComponent justify="space-between" styles={{ alignItems: 'center', marginBottom: 15 }}>
                <TextComponent text="Mã đơn hàng" size={16} color={COLORS.HEX_BLACK} />
                <TextComponent text={ paymentData._id.toString().substring(0,10) } size={16} color={COLORS.HEX_BLACK} />
              </RowComponent>
              <RowComponent justify="space-between" styles={{ alignItems: 'center', marginBottom: 15 }}>
                <TextComponent text="Tiền dịch vụ" size={16} color={COLORS.HEX_BLACK} />
                <TextComponent text={ `${productData?.shopDetail?.shipping_fee.toLocaleString('vi-VN')} VND`} size={16} color={COLORS.HEX_BLACK} />
              </RowComponent>
              <RowComponent justify="space-between" styles={{ alignItems: 'center', marginBottom: 15 }}>
                <TextComponent text="Tiền vận chuyển" size={16} color={COLORS.HEX_BLACK} />
                <TextComponent text={ `${productData?.shopDetail?.service_fee.toLocaleString('vi-VN')} VND`} size={16} color={COLORS.HEX_BLACK} />
              </RowComponent>
              <RowComponent justify="space-between" styles={{ alignItems: 'center', marginBottom: 15 }}>
                <TextComponent text="Tổng tiền" size={16} color={COLORS.HEX_BLACK} />
                <TextComponent text={ `${mountServiceByIdShop(productData?.shopDetail?.service_fee,productData?.shopDetail?.shipping_fee).toLocaleString('vi-VN')} VND`} size={18} color={COLORS.RED} />
              </RowComponent>
            </SectionComponent>
          </SectionComponent>

          
          {productData?.shopDetail?.confirmationStatus==="Chờ duyệt"?(
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
                onPress={handleCancelOrder} 
              />
          </RowComponent>
          ):undefined}
        </SectionComponent>
      </ScrollView>

    </ContainerComponent>
  );
};

export default OrderDetatailsScreen;