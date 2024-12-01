import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LineChart } from 'react-native-chart-kit';
import { ArrowDown2, Star1 } from 'iconsax-react-native';
import {
  ButtonComponent,
  ContainerComponent,
  HeaderComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { PaymentModel } from '../../model/payment_model';
import paymentAPI from '../../apis/paymentAPI';
import { FONTFAMILY } from '../../../assets/fonts';
import COLORS from '../../assets/colors/Colors';

const screenWidth = Dimensions.get('window').width;

const OrderStatisticsScreen = ({ navigation }: any) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [payment, setPayment] = useState<PaymentModel[]>([]);
  const [totalPaidOrders, setTotalPaidOrders] = useState(0);
  const [totalCODOrders, setTotalCODOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueByDate, setRevenueByDate] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);

  const getDataPayment = async (endDate: Date) => {
    setLoading(true);
    try {
      const res: any = await paymentAPI.HandlePayment('/get-order');
      const data: PaymentModel[] = res.data;

      const revenueByDate: { [key: string]: number } = {};
      let totalRevenue = 0;
      let totalPaidOrders = 0;
      let totalCODOrders = 0;

      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 3);

      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        revenueByDate[d.toLocaleDateString('vi-VN')] = 0;
      }

      data.forEach(order => {
        const orderDate = new Date(order.createdAt);
        if (orderDate >= startDate && orderDate <= endDate && (order.status === 'Paid' || order.status === 'COD')) {
          const orderDateString = orderDate.toLocaleDateString('vi-VN');

          if (order.id_cart && Array.isArray(order.id_cart)) {
            order.id_cart.forEach((cartItem: any) => {
              if (cartItem.id_product && cartItem.id_product.id_user) {
                const price = cartItem.cart_subtotal || 0;
                const quantity = cartItem.product_quantity || 0;
                const revenue = price * quantity;

                revenueByDate[orderDateString] = (revenueByDate[orderDateString] || 0) + revenue;
                totalRevenue += revenue;
              }
            });
          }

          if (order.status === 'Paid') totalPaidOrders++;
          if (order.status === 'COD') totalCODOrders++;
        }
      });

      setRevenueByDate(revenueByDate);
      setTotalRevenue(totalRevenue);
      setTotalPaidOrders(totalPaidOrders);
      setTotalCODOrders(totalCODOrders);
      setPayment(data);
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataPayment(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const chartData = {
    labels: Object.keys(revenueByDate),
    datasets: [
      {
        data: Object.values(revenueByDate),
        color: (opacity = 1) => `rgba(0, 157, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: COLORS.WHITE,
    backgroundGradientTo: COLORS.WHITE,
    color: (opacity = 1) => `rgba(34, 139, 230, ${opacity})`,
    strokeWidth: 2,
    fillShadowGradient: 'rgba(34, 139, 230, 0.5)',
    fillShadowGradientOpacity: 0.2,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#fff',
    },
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForBackgroundLines: {
      strokeDasharray: '',
    },
  };

  const startDate = new Date(selectedDate);
  startDate.setDate(startDate.getDate() - 3);

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.OCEAN_BLUE}
          style={{ marginTop: 83 }}
        />
      ) : (
        <ContainerComponent>
          <HeaderComponent
            title="Tổng quan cửa hàng"
            isBack
            onBack={() => navigation.goBack()}
          />
          <RowComponent justify="space-around">
            <SectionComponent
              styles={{
                backgroundColor: COLORS.WHITE,
                borderRadius: 8,
                marginTop: 20,
                padding: 10,
                width: '45%',
              }}>
              <TextComponent
                text={totalPaidOrders.toString()}
                font={FONTFAMILY.montserrat_bold}
                size={32}
                color={COLORS.HEX_BLACK}
              />
              <TextComponent
                text={'Đơn hàng đang giao'}
                size={13}
                color={COLORS.HEX_LIGHT_GREY}
                font={FONTFAMILY.montserrat_bold}
              />
            </SectionComponent>
            <SectionComponent
              styles={{
                backgroundColor: COLORS.WHITE,
                borderRadius: 8,
                marginTop: 20,
                padding: 10,
                width: '45%',
              }}>
              <TextComponent
                text={totalCODOrders.toString()}
                font={FONTFAMILY.montserrat_bold}
                size={32}
                color={COLORS.HEX_BLACK}
              />
              <TextComponent
                text={'Đơn hàng yêu cầu'}
                size={13}
                color={COLORS.HEX_LIGHT_GREY}
                font={FONTFAMILY.montserrat_bold}
              />
            </SectionComponent>
          </RowComponent>
          <SectionComponent styles = {{marginTop: 5}}>
            <TextComponent
              text={'Tổng doanh thu'}
              size={13}
              color={COLORS.HEX_LIGHT_GREY}
              font={FONTFAMILY.montserrat_bold}
            />
            <RowComponent justify="space-between">
              <TextComponent
                text={`${totalRevenue.toLocaleString('vi-VN')} VND`}
                font={FONTFAMILY.montserrat_bold}
                size={20}
                color={COLORS.HEX_BLACK}
              />
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <RowComponent>
                  <Text>{`${startDate.toLocaleDateString('vi-VN')} - ${selectedDate.toLocaleDateString('vi-VN')}`}</Text>
                  <ArrowDown2
                    size="18"
                    color={COLORS.HEX_BLACK}
                    variant="Outline"
                  />
                </RowComponent>
              </TouchableOpacity>
            </RowComponent>
          </SectionComponent>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          {Object.keys(revenueByDate).length > 0 ? (
            <View
              style={{
                backgroundColor: COLORS.WHITE,
                borderRadius: 8,
                padding: 10,
              }}>
              <LineChart
                data={chartData}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  paddingRight: 40,
                  paddingBottom: 20,
                }}
                withVerticalLines={false}
                withHorizontalLines={true}
                withDots={true}
                withInnerLines={true}
                withOuterLines={false}
                withVerticalLabels={true}
                withHorizontalLabels={true}
                fromZero={true}
              />
            </View>
          ) : (
            <TextComponent text="Không có dữ liệu" />
          )}
          <SectionComponent
            styles={{
              backgroundColor: COLORS.WHITE,
              borderRadius: 8,
              marginTop: 20,
              padding: 10,
            }}>
            <RowComponent justify="space-between">
              <TextComponent
                text={'Đánh giá'}
                size={13}
                color={COLORS.HEX_LIGHT_GRAY}
                font={FONTFAMILY.montserrat_bold}
              />
              <ButtonComponent
                text="Xem tất cả đánh giá"
                type="link"
                color={COLORS.AZURE_BLUE}
                onPress={() => navigation.navigate('ReviewShopScreen')}
              />
            </RowComponent>
            <SpaceComponent height={20} />
            <RowComponent>
              <TouchableOpacity>
                <RowComponent>
                  <Star1 color={COLORS.AZURE_BLUE} size={20} variant="Bold" />
                  <TextComponent
                    text={'4.9'}
                    size={13}
                    color={COLORS.AZURE_BLUE}
                    font={FONTFAMILY.montserrat_bold}
                  />
                </RowComponent>
              </TouchableOpacity>
              <SpaceComponent width={20} />
              <TextComponent
                text={'Tổng 30 Đánh giá'}
                size={13}
                color={COLORS.HEX_LIGHT_GREY}
                font={FONTFAMILY.montserrat_bold}
              />
            </RowComponent>
          </SectionComponent>
        </ContainerComponent>
      )}
    </>
  );
};

export default OrderStatisticsScreen;

