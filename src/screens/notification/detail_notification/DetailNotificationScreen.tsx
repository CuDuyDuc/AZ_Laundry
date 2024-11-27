import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Animated, Image, FlatList, ActivityIndicator } from "react-native";
import COLORS from "../../../assets/colors/Colors";
import { CardOrderComponent, HeaderComponent, KeyboardAvoidingViewWrapper, RowComponent, SectionComponent, TextComponent } from "../../../components";
import { Box, DiscountShape, NotificationBing, ShoppingBag, TicketDiscount } from "iconsax-react-native";
import { notification_type } from "../../../utils/constants";
import paymentAPI from "../../../apis/paymentAPI";
import { useRole } from "../../../permission/permission";
import productAPI from "../../../apis/productAPI";
import { log } from "console";
import authenticationAPI from "../../../apis/authAPI";

export default function DetailNotificationScreen({ navigation, route }: any) {
    const { item } = route.params;
    const { isUser, isShop, isAdmin } = useRole();

    const [dataPayment, setDataPayment] = useState<any>();
    const [product, setProduct] = useState<any>();
    const [shopName, setShopName] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    console.log({dataPayment});
    console.log({item});


    const getPaymentById = async (idPayment: string) => {
        try {
            const req = paymentAPI.HandlePayment(`/get-order-by-id/${idPayment}`);
            setDataPayment((await req).data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const formatId = (text: string, maxLength: number = 10): string => {
        if (!text || text.length <= maxLength) return text;
        return `${text.slice(-6)}`;
      };
      const getProductById = async () => {
            try {
                const req = await productAPI.HandleProduct(`/get-product-by-id-product?idProduct=${item?.object_type_id}`);
                console.log({PRODUCT : req});
                setProduct(req?.data[0]);
               setLoading(false);
            } catch (error) {
                console.log(error);
               setLoading(false);
            }
      }
      const getUserById = async (id_user: string) => {
        try {
        const req : any = await authenticationAPI.HandleAuthentication(`/get-user-by-id?id_user=${id_user}`);
        const data = await req[0];
          
       if(data) {
        console.log({dataSHOP: data});
        setShopName(data?.fullname)
    }
        } catch (error) {
          console.log(error);
        }
      }
    useEffect(() => {
        getUserById(item?.sender)
     isAdmin ? getProductById() : getPaymentById(item?.object_type_id);
    }, [])

    // Render nội dung dựa trên loại thông báo
    const renderNotificationContent = () => {
        switch (item?.notification_type) {
            case notification_type.ORDER_UPDATE:
                return (
                    <SectionComponent styles={styles.contentBox}>
                        <TextComponent color={COLORS.AZURE_BLUE} size={22} styles={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            width: '100%'
                        }}  title text={ isUser ?  "Cập nhật đơn hàng" : "Đơn hàng mới"} />
                        <RowComponent>
                        <TextComponent styles={{ fontWeight: 'bold'}}  color={COLORS.HEX_BLACK} size={16} text={`Mã Đơn: `} />
                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={`#${dataPayment?._id.toString().substring(0,10)}`} />
                        </RowComponent>
                       {!isUser ?  <RowComponent>
                        <TextComponent styles={{ fontWeight: 'bold'}}  color={COLORS.HEX_BLACK} size={16} text={`Khách Hàng: `} />
                        <TextComponent color={COLORS.AZURE_BLUE} size={16} text={dataPayment?.id_user?.fullname || 'fullname'} />
                        </RowComponent> : 
                        <RowComponent>
                        <TextComponent styles={{ fontWeight: 'bold'}}  color={COLORS.HEX_BLACK} size={16} text={`Trạng thái đơn: `} />
                        <TextComponent color={COLORS.AZURE_BLUE} size={16} text={dataPayment?.confirmationStatus || ''} />
                        </RowComponent>
                        }
                       
                        <RowComponent>
                        <TextComponent styles={{ fontWeight: 'bold'}}  color={COLORS.HEX_BLACK} size={16} text={`Phương thức thanh toán: `} />
                        <TextComponent color={COLORS.AZURE_BLUE} size={16} text={dataPayment?.method_payment || ''} />
                        </RowComponent>
                        <RowComponent>
                        <TextComponent styles={{ fontWeight: 'bold'}}  color={COLORS.HEX_BLACK} size={16} text={`Tổng Tiền: `} />
                        <TextComponent color={COLORS.AZURE_BLUE} size={16} text={`${dataPayment?.mount_money} VND`} />
                        </RowComponent>

                        <TextComponent styles={{ fontWeight: 'bold'}}  color={COLORS.HEX_BLACK} size={16} text={`${isUser ? 'Dịch vụ bạn đã đặt' : 'Dịch vụ khách đặt'}:`} />
                        <FlatList
                            data={dataPayment?.id_cart || []}
                            keyExtractor={(item: any) => item?._id.toString()}
                            renderItem={({ item }) => (
                                <CardOrderComponent
                                    imgUrl={item?.id_product?.product_photo[0] || ''}
                                    name={item?.id_product?.product_name || ''}
                                    short_description={item?.id_product?.short_description || ""}
                                    status={""}
                                    total={item?.cart_subtotal || 0}
                                    quantity={item?.product_quantity || 0}
                                    id={""}
                                />
                            )}
                        />

                    </SectionComponent>
                );
            case notification_type.REMINDER:
                return (
                    <SectionComponent styles={styles.contentBox}>
                        <TextComponent color={COLORS.AZURE_BLUE} size={20} title text={item.title} styles={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            width: '100%'
                        }} />
                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={item.body || 'Content'} />
                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={item.shortDescription || 'shortDescription'} />
                    </SectionComponent>
                );
            case notification_type.NEW_PRODUCT:
                return (
                    <SectionComponent styles={styles.contentBox}>
                          <TextComponent color={COLORS.AZURE_BLUE} size={22} styles={ {
                            fontWeight: 'bold',
                            textAlign: 'center',
                            width: '100%'
                        }}  title text={"Dịch vụ Mới"} />
                      <SectionComponent styles={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                      }}>
                        
                      <RowComponent styles={{
                        width: '100%',
                        justifyContent: 'center'
                      }}>
                      <Image source={{ uri: product?.product_photo[0] || '' }} style={styles.shopImage} />
                      </RowComponent>
                     <SectionComponent styles={{
                        paddingVertical: 16,
                        display: 'flex',
                        paddingHorizontal: 0,
                        gap: 10
                     }}>
                     <RowComponent styles={{alignItems: 'flex-start'}}>
                      <TextComponent color={COLORS.HEX_BLACK} styles={{fontWeight: 'bold'}} size={16} text={`Tên Shop: `} />
                        <TextComponent color={COLORS.AZURE_BLUE} size={16} text={`${shopName || ''}`} />
                        </RowComponent>
                        <RowComponent>
                        <TextComponent color={COLORS.HEX_BLACK} size={16} styles={{fontWeight: 'bold'}} text={`Tên dịch vụ: `} />
                        <TextComponent color={COLORS.AZURE_BLUE} size={16} text={`${product?.id_product_type?.product_type_name || ''}`} />
                        </RowComponent>
                        <RowComponent>
                        <TextComponent color={COLORS.HEX_BLACK} size={16} styles={{fontWeight: 'bold'}} text={`Giá dịch vụ: `} />
                        <TextComponent color={COLORS.AZURE_BLUE} size={16} text={`${product?.product_price || ''} VNĐ`} />
                        </RowComponent>
                        <RowComponent>
                        <TextComponent color={COLORS.HEX_BLACK} size={16} styles={{fontWeight: 'bold'}} text={`Mô tả ngắn: `} />
                        <TextComponent color={COLORS.AZURE_BLUE} size={16} text={`${product?.short_description || ''}`} />
                        </RowComponent>
                        <RowComponent styles={{alignItems: 'flex-start'}}>
                        <TextComponent color={COLORS.HEX_BLACK} size={16} styles={{fontWeight: 'bold'}} text={`Mô tả chi tiết: `} />
                        <TextComponent flex={1} color={COLORS.AZURE_BLUE} size={16} text={`${product?.product_description || ''}`} />
                        </RowComponent>
                     </SectionComponent>
                      </SectionComponent>
                    </SectionComponent>
                );
            default:
                return (
                    <TextComponent color={COLORS.HEX_BLACK} size={16} text="Không có thông tin chi tiết cho loại thông báo này." />
                );
        }
    };

    return (
        <SectionComponent styles={styles.container}>
            <HeaderComponent isBack onBack={() => navigation.goBack()} title="Thông báo chi tiết" />

            <SectionComponent styles={styles.scrollViewContent} >
                <SectionComponent styles={{
                    margin: 20,
                    paddingHorizontal: 0,
                    paddingBottom: 0,
                    backgroundColor: COLORS.WHITE,
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {item?.notification_type === notification_type.ORDER_UPDATE ? <ShoppingBag size="40" color={COLORS.AZURE_BLUE} /> :
                        item?.notification_type === notification_type.PROMOTION ? <DiscountShape size="40" color={COLORS.AZURE_BLUE} /> :
                            item?.notification_type === notification_type.NEW_PRODUCT ? <Box size="40" color={COLORS.AZURE_BLUE} /> : <NotificationBing size="40" color={COLORS.AZURE_BLUE} />}
                </SectionComponent>
                {loading ? (<ActivityIndicator size="large" color={COLORS.OCEAN_BLUE} />) : renderNotificationContent()}
            </SectionComponent>
        </SectionComponent>
    );
}

const UPPER_HEADER_HEIGHT = 60;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 0
    },
    upperHeaderPlaceholder: {
        height: UPPER_HEADER_HEIGHT,
    },
    header: {
        position: "absolute",
        width: "100%",
        backgroundColor: COLORS.AZURE_BLUE,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    notificationText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    scrollViewContent: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    contentBox: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        width: '90%',
        gap: 10,
    },
    shopImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10
    }
});
