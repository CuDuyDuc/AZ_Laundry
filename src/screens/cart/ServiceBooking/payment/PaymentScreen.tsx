import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { ButtonComponent, ContainerComponent, HeaderComponent, RowComponent, SectionComponent, TextComponent } from '../../../../components'
import COLORS from '../../../../assets/colors/Colors'
import { ArrowRight2, Location } from 'iconsax-react-native'
import { FONTFAMILY } from '../../../../../assets/fonts'
import { useSelector } from 'react-redux'
import { authSelector } from '../../../../redux/reducers/authReducer'
import moment from 'moment'
import { ScrollView } from 'react-native-virtualized-view'
import { useDateTime } from '../../../../context/DateTimeContext'
import { globalStyle } from '../../../../styles/globalStyle'
import { useAddresses } from '../../../../context/AddressesContext'
import { usePaymentMethod } from '../../../../context/PaymentMethodContext'
import paymentAPI from '../../../../apis/paymentAPI'
import * as Burnt from "burnt";
import NotificationService from '../../../notification/service/NotificationService'

const PaymentScreen = ({navigation, route}: any) => {
    const user = useSelector(authSelector);
    const {selectedPaymentMethod}=usePaymentMethod()
    const {dataInfoUser}= useAddresses()
    const {dataCarts,totalCarts,notes,selectedProductType,selectedShipOption}= route.params
    
    const productOwnerIds = dataCarts.map((cart:any) => cart.id_product.id_user._id);
    const { sendValue, receiveValue, sendTime, receiveTime}= useDateTime()
    console.log(sendValue);
    console.log(sendTime);
    const calculateShippingFee = (coords1:any, coords2:any) => {
        console.log(coords1);
        
        if(coords1){
            const [latitude,longitude] =coords1
            // Tọa độ user
            const lat2 = coords2[1]; // Shop latitude
            const lon2 = coords2[0]; // Shop longitude
            // Công thức Haversine
            const R = 6371; // Bán kính của Trái Đất tính bằng km
            const dLat = (lat2 - latitude) * (Math.PI / 180);
            const dLon = (lon2 - longitude) * (Math.PI / 180);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(latitude * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            // Khoảng cách (km)
            const distance = R * c;
            let shippingFee = 5000+(distance * 3000);
            if(selectedShipOption!=='oneway'){
                shippingFee=shippingFee*2
            }
            return Math.round(shippingFee);
        }else{
            return 'Chưa chọn địa chỉ'
        }
      };
    const totalShippingFee = dataCarts.reduce((total:any, item:any) => {
        const fee = calculateShippingFee(dataInfoUser?.location?.coordinates, item?.id_product?.id_user?.location?.coordinates);
        return total + fee;
    }, 0);
    const handlePayment=async()=>{
        if (selectedPaymentMethod && dataInfoUser && selectedProductType && selectedShipOption && totalCarts && sendValue && receiveValue){
            console.log(sendValue);
            
            try {
                const res:any = await paymentAPI.HandlePayment('/create-payment',{
                    id_user:user.id,
                    paymentMethod:selectedPaymentMethod,
                    full_name:dataInfoUser.full_name,
                    number_phone:dataInfoUser?.phone_number,
                    address:dataInfoUser?.address,
                    data_payment:{
                        shipping_fee:totalShippingFee,
                        shipping_date:sendValue,
                        delivery_date:receiveValue,
                        product_condition:selectedShipOption==='oneway'?'1 chiều':'2 chiều',
                        shipping_mode:selectedProductType==='wet'?'Sản phẩm dạng ướt':'Sản phẩm dạng khô',
                        note:notes,
                        total:totalCarts
                    }
                },'post')
                if(res){
                    if(res.paymentUrl){
                        navigation.replace('VNPayPaymentScreen',{vnpayUrl:res.paymentUrl, orderId: res?.orderId})
                    }else{
                        navigation.replace('SuccessPaymentScreen')
                        NotificationService.sendNotificationToServer({
                            title: "Bạn có một đơn hàng mới" ,
                            body: "Có đơn hàng mới Shop ơi💎💎",
                            sender: user?.id,
                            object_type_id: res?.data?._id,
                            notification_type: "order_update",
                        })
                    }
                }
            } catch (error) {
                console.log('Lỗi payment Screen',error);
                
            }
        }else{
            Burnt.toast({
                title: "Vui lòng nhập đủ thông tin",
      
            });
        }
        
    }
  return (
    <View style={{backgroundColor:COLORS.WHISPER_GRAY,position:'relative', flex:1}}>
        <HeaderComponent title={`Thanh toán`} isBack onBack={() => navigation.goBack()}/>
        <ScrollView style={{marginBottom:80}}>
            <SectionComponent styles={globalStyle.styleSection}>
            <TouchableOpacity onPress={()=>navigation.navigate('AddressSelectionScreen')}>
                    <RowComponent justify='space-between'>
                        <RowComponent styles={{flex:9}}>
                            <Location size="32" color={COLORS.ORANGE} variant="Bold"/>
                            <View style={{marginStart:8 , flex:1}} >
                                {dataInfoUser?(
                                    <>
                                        <TextComponent text={'Địa chỉ của bạn'} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} size={13} />
                                        <TextComponent text={`${dataInfoUser.full_name} ${dataInfoUser.phone_number}`} color={COLORS.HEX_BLACK}  size={13}/>
                                        <TextComponent text={`${dataInfoUser.address}`} color={COLORS.HEX_BLACK}  size={13}/>
                                    </>
                                ):<TextComponent text={'Chưa nhập đầy đủ thông tin'} color={COLORS.HEX_BLACK}/>}
                            </View>
                        </RowComponent>
                        <View style={{flex:1}}>
                            <ArrowRight2 size="32" color={COLORS.HEX_LIGHT_GREY}/>
                        </View>
                    </RowComponent>
            </TouchableOpacity>
            </SectionComponent>
            <SectionComponent styles={globalStyle.styleSection}>
                <TextComponent text={'Thông tin dịch vụ'} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} size={13}/>
                <FlatList 
                    data={dataCarts}
                    keyExtractor={(item) => item._id.toString()} 
                    renderItem={({item})=>(
                        <>
                            <RowComponent justify='space-between' styles={{marginTop:5}}>
                                <TextComponent text={'Cửa hàng'} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                                <TextComponent text={`${item?.id_product?.id_user?.data_user?.shop_name}`} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                            </RowComponent>
                            <RowComponent justify='space-between' styles={{marginTop:5,flex:9,alignItems:'flex-start'}}>
                                <TextComponent text={'Dịch vụ'} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                                <TextComponent text={`${item?.id_product?.id_product_type?.id_service_type?.service_type_name}`} styles={{flexWrap:'wrap',maxWidth: '70%', textAlign:'right'}} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                            </RowComponent>
                        </>
                        
                    )}
                />
                <RowComponent justify='space-between' styles={{marginTop:5}}>
                    <TextComponent text={'Đầu ship'} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                    <TextComponent text={`${selectedShipOption==='oneway'?'1 chiều':'2 chiều'}`} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                </RowComponent>
                <RowComponent justify='space-between' styles={{marginTop:5}}>
                    <TextComponent text={'Phân loại'} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                    <TextComponent text={`${selectedProductType==='wet'?'Sản phẩm dạng ướt':'Sản phẩm dạng khô'}`} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                </RowComponent>
                <RowComponent justify='space-between' styles={{marginTop:5}}>
                    <TextComponent text={'Ghi chú'} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                    <TextComponent text={`${notes??''}`} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                </RowComponent>
            </SectionComponent>
            <SectionComponent styles={globalStyle.styleSection}>
                <TextComponent text={'Thông tin khách hàng'} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} size={13}/>
                <RowComponent justify='space-between' styles={{marginTop:5}}>
                    <TextComponent text={'Họ và tên'} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                    <TextComponent text={`${dataInfoUser?.full_name??'Chưa có thông tin'}`} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                </RowComponent>
                <RowComponent justify='space-between' styles={{marginTop:5}}>
                    <TextComponent text={'Số điện thoại'} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                    <TextComponent text={`${dataInfoUser?.phone_number??'Chưa có thông tin'}`} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                </RowComponent>
                <RowComponent justify='space-between' styles={{marginTop:5,flex:9, alignItems:'flex-start'}}>
                    <TextComponent text={'Địa chỉ'} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                    <TextComponent text={`${dataInfoUser?.address??'Chưa có thông tin'}`} styles={{flexWrap:'wrap',maxWidth: '70%', textAlign:'right'}} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                </RowComponent>
                <RowComponent justify='space-between' styles={{marginTop:5}}>
                    <TextComponent text={'Ngày/giờ gửi đồ'} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                    <TextComponent text={`${moment(sendValue).format('DD-MM-YYYY')}  ${moment(sendTime).format('HH:mm')}`} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                </RowComponent>
                <RowComponent justify='space-between' styles={{marginTop:5}}>
                    <TextComponent text={'Ngày/giờ nhận đồ'} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                    <TextComponent text={`${moment(receiveValue).format('DD-MM-YYYY')}  ${moment(receiveTime).format('HH:mm')}`} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                </RowComponent>
            </SectionComponent>
            <SectionComponent styles={globalStyle.styleSection}>
            <TouchableOpacity onPress={()=>navigation.navigate('SelectPaymentMethodScreen')}>
                    <RowComponent justify='space-between'>
                        <TextComponent text={'Phương thức thanh toán'} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} size={12} />
                        <TextComponent text={`${selectedPaymentMethod==='COD'?'Thanh toán khi nhận hàng':'Thanh toán VNPay'}`} styles={{ marginStart:5,flexWrap:'wrap', width:'50%'}} color={COLORS.HEX_LIGHT_GREY}  size={12}/>
                        <ArrowRight2 size="20" color={COLORS.HEX_LIGHT_GREY}/>
                    </RowComponent>
            </TouchableOpacity>
            </SectionComponent>
            <SectionComponent styles={globalStyle.styleSection}>
                <TextComponent text={'Thông tin thanh toán'} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} size={13}/>
                <RowComponent justify='space-between' styles={{marginTop:5}}>
                    <TextComponent text={'Tiền dịch vụ'} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                    <TextComponent text={`${totalCarts} vnđ`} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                </RowComponent>
                <FlatList 
                    data={dataCarts}
                    keyExtractor={(item) => item._id.toString()} 
                    renderItem={({item,index})=>(
                        <>
                            <RowComponent justify='space-between' styles={{marginTop:5}}>
                                <TextComponent text={`Phí ship`} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                                <TextComponent text={`${calculateShippingFee(dataInfoUser?.location?.coordinates,item?.id_product?.id_user?.location?.coordinates)} vnđ`} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                            </RowComponent>
                        </>
                        
                    )}
                />
                <RowComponent justify='space-between' styles={{marginTop:5}}>
                    <TextComponent text={'Tổng thanh toán'} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                    <TextComponent text={`${totalCarts+totalShippingFee} vnđ`} color={COLORS.HEX_LIGHT_GREY} size={13}/>
                </RowComponent>
            </SectionComponent>
        </ScrollView>
        <View style={{position:'absolute', left:0, right:0, bottom:0}}>
            <SectionComponent>
                <ButtonComponent
                    onPress={handlePayment}
                    type="#00ADEF"
                    text="Thanh toán"/>
            </SectionComponent>
        </View>
    </View>
  )
}

export default PaymentScreen