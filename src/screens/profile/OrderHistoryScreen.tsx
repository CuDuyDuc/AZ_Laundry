import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { FONTFAMILY } from '../../../assets/fonts';
import paymentAPI from '../../apis/paymentAPI';
import COLORS from '../../assets/colors/Colors';
import { BoxStatusShopOrderComponent, ButtonComponent, CardOrderComponent, ContainerComponent, HeaderComponent, RowComponent, SectionComponent, TextComponent } from '../../components';
import { PaymentModel } from '../../model/payment_model';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
import { ScrollView } from 'react-native-virtualized-view';
import { globalStyle } from '../../styles/globalStyle';

const OrderHistoryScreen = ({ navigation, route }: any) => {
  const user = useSelector(authSelector);
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

  };

  const getDataPayment = async () => {
    try {
      setLoading(true);
      const res: any = await paymentAPI.HandlePayment(`/get-order-by-id-user/${user?.id}`);
      const data: PaymentModel[] = res.data;
      setPayment(data);
      setFilteredPayment(data);
      const updatedStatusList = statusList.map((statusItem) => {
        if (statusItem.status === 'Tất cả') {
            return { ...statusItem, number: data.length };
        }
    
        const count = data.reduce((acc, item) => {
            // Duyệt qua tất cả các shop_details và kiểm tra confirmationStatus
            const matchingStatus = item.shop_details.some((shop) => shop.confirmationStatus === statusItem.status);
            return matchingStatus ? acc + 1 : acc;
        }, 0);
    
        return { ...statusItem, number: count };
    });
      setStatusList(updatedStatusList);
    } catch (error) {
      console.log('Error: ', error);
      setPayment([]); // Gán mảng rỗng khi gặp lỗi
      setFilteredPayment([]);
    } finally {
      setLoading(false);
    }
  };
 
  const groupedProducts = (paymentData: any) => {
    if (!paymentData || !Array.isArray(paymentData.id_cart) || !Array.isArray(paymentData.shop_details)) {
        console.log(paymentData);
        // Nếu paymentData không hợp lệ hoặc id_cart/shop_details không phải là mảng, trả về paymentData như ban đầu
        return paymentData;
    }

    // Bước 1: Nhóm sản phẩm trong id_cart theo id_user của id_product
    const groupedByUserId = paymentData.id_cart.reduce((acc: any, cartItem: any) => {
        const userId = cartItem.id_product?.id_user?.toString();

        if (!userId) {
            return acc;  // Nếu không có id_user, bỏ qua item này
        }

        if (!acc[userId]) {
            acc[userId] = {
                userId,
                products: [],
                shopDetail: null,  // Đảm bảo rằng sẽ có shopDetail sau này
            };
        }

        acc[userId].products.push(cartItem);  // Thêm sản phẩm vào nhóm

        return acc;
    }, {});

    // Bước 2: Kết hợp shop_details vào các nhóm theo id_shop
    paymentData.shop_details.forEach((shop: any) => {
        const shopId = shop?.id_shop?.toString();
        if (shopId && groupedByUserId[shopId]) {
            groupedByUserId[shopId].shopDetail = shop;  // Kết hợp shopDetail vào nhóm có id_user tương ứng
        }
    });

    // Bước 3: Lọc các nhóm sản phẩm theo selectedStatus
    const groupedWithShopDetails = Object.values(groupedByUserId).map((group: any) => {
        // Nếu selectedStatus là "Tất cả", không cần kiểm tra confirmStatus
        if (selectedStatus === "Tất cả") {
            return group;  // Trả về tất cả các nhóm mà không cần kiểm tra confirmStatus
        }
        if (group.shopDetail && group.shopDetail.confirmationStatus === selectedStatus) {
            return group;
        }
        return null;
    }).filter((group: any) => group !== null);  // Loại bỏ các nhóm null (không hợp lệ)

    // Bước 4: Thêm thuộc tính `groupedProducts` vào paymentData
    paymentData.groupedProducts = groupedWithShopDetails;


    return paymentData;
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
    <ContainerComponent>
      <HeaderComponent title="Lịch sử đơn hàng" isBack onBack={() => navigation.goBack()} />

      <SectionComponent >
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
      ) : filteredPayment.length > 0 ? (
        <ScrollView>
          <SectionComponent styles={{paddingBottom:350}} >
            <FlatList
              data={filteredPayment}
              keyExtractor={(item) => item._id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
              <>
                {groupedProducts(item).groupedProducts && groupedProducts(item).groupedProducts.length > 0?(
                  <View style={{backgroundColor: COLORS.WHITE, borderRadius: 8, padding:5 , marginBottom:8}}>
                    <TextComponent text={`#${item._id.toString().substring(0,10)}`} size={16} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_bold} />
                    <FlatList
                      data={groupedProducts(item).groupedProducts}
                      keyExtractor={(paymentData,index) => index.toString()}
                      renderItem={({ item:paymentData }) => (
                        <>
                            <TouchableOpacity onPress={()=>{ navigation.navigate('OrderDetatailsScreen',{productData:paymentData,paymentId:filteredPayment[0]._id, paymentData:groupedProducts(item)})}}>

                                <FlatList
                                  data={paymentData.products}
                                  keyExtractor={(data) => data._id.toString()}
                                  renderItem={({ item:data }) => (
                                <>
                                  <CardOrderComponent
                                    imgUrl={data.id_product.product_photo[0]}
                                    name={data.id_product.product_name}
                                    short_description={data.id_product.short_description}
                                    status={paymentData?.shopDetail?.confirmationStatus}
                                    total={data.cart_subtotal}
                                    quantity={data.product_quantity}
                                    id={data._id.toString()}
                                  />
                                </>
                                )}
                              />
                            </TouchableOpacity>
                            {paymentData?.shopDetail?.confirmationStatus == 'Hoàn thành' && (
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
                                  onPress={() => navigation.navigate('Cart')}
                                />
                                <ButtonComponent
                                  text="Đánh giá"
                                  type="#00ADEF"
                                  styles={{ width: "30%" }}
                                  textStyles={{ fontFamily: FONTFAMILY.montserrat_medium }}
                                  onPress={() => navigation.navigate('ReviewProductsScreen', { productData:paymentData })}
                                />
                              </RowComponent>
                            )}
                        </>
                      )}
                    />

                    
                  </View>
                ):undefined}
              </>
                
              )}
            />
          </SectionComponent>
        </ScrollView>
      ) : (
        <TextComponent text="Không có đơn hàng nào" />
      )}
    </ContainerComponent>
  );
};

export default OrderHistoryScreen;
