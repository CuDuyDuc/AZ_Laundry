import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { ButtonComponent, CardOrderComponent, ContainerComponent, HeaderComponent, RowComponent, SectionComponent, TextComponent } from '../../components';
import { FONTFAMILY } from '../../../assets/fonts';
import COLORS from '../../assets/colors/Colors';
import { useEffect, useState } from 'react';
import paymentAPI from '../../apis/paymentAPI';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

const OrderHistoryScreen = ({ navigation }: any) => {
  const [payment, setPayment] = useState();
  const [filteredPayment, setFilteredPayment] = useState([]);
  const [activeTab, setActiveTab] = useState("Chờ xác nhận");

  const getDataPayment = async () => {
    try {
      const res: any = await paymentAPI.HandlePayment(`/get-order`);
      const data = res.data;
      setPayment(data);
      console.log('Payment data 1:', data);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const onOrderPress = (id: string) => {
    navigation.navigate('OrderDetatailsScreen', { paymentId: id });
  }

  const filterOrdersByStatus = (status: string) => {
    
  };

  useEffect(() => {
    getDataPayment();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getDataPayment(); // Gọi lại hàm lấy dữ liệu khi màn hình này được focus
    }, [])
  );


  console.log('Payment data 11111111111111:', payment);

  return (
    <ContainerComponent isScroll styleBackground={{ backgroundColor: COLORS.WHITE }}>
      <HeaderComponent title='Lịch sử đơn hàng' isBack onBack={() => navigation.goBack()} />
        {/* Tab Navigation */}
      {/* <SectionComponent>
        <RowComponent justify="space-around">
          {["Chờ xác nhận", "Chờ lấy hàng", "Đã xong", "Đánh giá"].map((status) => (
            <TouchableOpacity key={status} onPress={() => filterOrdersByStatus(status)}>
              <TextComponent
                text={status}
                size={16}
                color={activeTab === status ? COLORS.AZURE_BLUE : COLORS.BLUE_GRAY}
                styles={{ fontFamily: FONTFAMILY.montserrat_medium }}
              />
            </TouchableOpacity>
          ))}
        </RowComponent>
      </SectionComponent> */}

      <TouchableOpacity >

        <SectionComponent >
          <FlatList
            data={payment}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onOrderPress(item._id.toString())}>
                <View style={{ backgroundColor: COLORS.WHITE, borderRadius: 8 }}>
                  {/* Hiển thị ID đơn hàng */}
                  <TextComponent text={`#${item._id}`} size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} />

                  {/* Hiển thị danh sách sản phẩm trong id_cart */}
                  <FlatList
                    data={Array.isArray(item.id_cart) ? item.id_cart : []} // Duyệt qua từng giỏ hàng (cart) trong đơn hàng
                    keyExtractor={(cartItem) => cartItem._id.toString()}
                    renderItem={({ item: cartItem }) => (
                      <CardOrderComponent
                        imgUrl={cartItem.id_product.product_photo[0]}
                        name={cartItem.id_product.product_name}
                        short_description={cartItem.id_product.short_description}
                        status={item.confirmationStatus} // Lấy status từ đơn hàng chính
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
                          borderWidth: 1
                        }}
                      />
                      <ButtonComponent
                        text="Đánh giá"
                        type="#00ADEF"
                        styles={{ width: "30%" }}
                        textStyles={{ fontFamily: FONTFAMILY.montserrat_medium }}
                      />
                    </RowComponent>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        </SectionComponent>

      </TouchableOpacity>
    </ContainerComponent>
  );
};

export default OrderHistoryScreen;