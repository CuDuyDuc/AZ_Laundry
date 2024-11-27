import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import WebView from 'react-native-webview';
import * as Burnt from "burnt";
import { HeaderComponent } from '../../../../../components';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../../../redux/reducers/authReducer';
import NotificationService from '../../../../notification/service/NotificationService';

const getQueryParams = (url: string) => {
    const urlParams = queryString.parseUrl(url);
    return urlParams.query; // Trả về các tham số query dưới dạng object
  };
const VNPayPaymentScreen = ({navigation, route}: any) => {
  const user = useSelector(authSelector);
    const [loading, setLoading] = useState(true);
    const { vnpayUrl, orderId } = route.params
    const handleNavigationStateChange = (navState: any) => {
        if (navState.url.includes('vnpay_return')) {
          // Lấy tham số từ URL trả về từ VNPay
            const urlParams = getQueryParams(navState.url);
            const vnp_ResponseCode = urlParams.vnp_ResponseCode; // Mã trạng thái thanh toán
            // Kiểm tra mã phản hồi từ VNPay
            if (vnp_ResponseCode === '00') {
                Burnt.toast({
                title: 'Thanh toán thành công',
                });
                navigation.replace('SuccessPaymentScreen'); // Điều hướng đến màn hình thành công
                if(orderId) {
                  NotificationService.sendNotificationToServer({
                    title: "Bạn có một đơn hàng mới" ,
                    body: "Có đơn hàng mới Shop ơi💎💎",
                    sender: user?.id,
                    object_type_id: orderId,
                    notification_type: "order_update",
                })
                }
            }else {
                Burnt.toast({
                title: 'Thanh toán thất bại',
                });
                navigation.goBack()
            }
        }
    };
    

  return (
    <View style={{flex:1}}>
      <HeaderComponent title={`Thanh toán VNPay`} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <WebView
        source={{ uri: vnpayUrl }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
};



export default VNPayPaymentScreen;
