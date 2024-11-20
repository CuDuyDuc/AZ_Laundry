import React, { useRef } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Animated, Image } from "react-native";
import COLORS from "../../../assets/colors/Colors";
import { CardOrderComponent, HeaderComponent, KeyboardAvoidingViewWrapper, SectionComponent, TextComponent } from "../../../components";
import { Box, DiscountShape, NotificationBing, ShoppingBag, TicketDiscount } from "iconsax-react-native";
import { notification_type } from "../../../utils/constants";

export default function DetailNotificationScreen({navigation, route}: any) {
    const { item } = route.params;
    
    const renderNotificationContent = () => {
        switch ("order_update") {
            case notification_type.ORDER_UPDATE:
                return (
                    <SectionComponent styles={styles.contentBox}>
                        <TextComponent color={COLORS.AZURE_BLUE} size={22} styles={ {
                            fontWeight: 'bold',
                            textAlign: 'center',
                            width: '100%'
                        }}  title text="Đơn Hàng Mới" />
                        <TextComponent  styles={{ fontWeight: 'bold'}}  color={COLORS.HEX_BLACK} size={16} text={`Mã Đơn: #1981239188`} />
                        <TextComponent  styles={{ fontWeight: 'bold'}}  color={COLORS.HEX_BLACK} size={16} text={`Khách Hàng: #1981239188`} />
                        <SectionComponent styles={{ display: 'flex', flexDirection: 'row', paddingHorizontal:0, paddingBottom: 0}}>
                        <TextComponent  styles={{ fontWeight: 'bold'}}  color={COLORS.HEX_BLACK} size={16} text={`Phương thức thanh toán: `} />
                        <TextComponent color={COLORS.AZURE_BLUE} size={16} text={`VNPAY`} />
                        </SectionComponent>
                    

                        <TextComponent  styles={{ fontWeight: 'bold'}}  color={COLORS.HEX_BLACK} size={16} text={`Tổng Tiền: 120.000 đ`} />

                        <TextComponent  styles={{ fontWeight: 'bold'}}  color={COLORS.HEX_BLACK} size={16} text={`Dịch vụ khách đặt:`} />
                        <CardOrderComponent 
                          imgUrl={"https://firebasestorage.googleapis.com/v0/b/az-laundry.appspot.com/o/product_type_icon%2Fao.png?alt=media&token=1aff5676-861a-42c1-b0c9-15ad3343e330"}
                          name={"Áo"}
                          short_description={"ok"}
                          status={"Chờ duyệt"}
                          total={140.000}
                          quantity={2}
                          id={""}
                        />
                        <CardOrderComponent 
                          imgUrl={"https://firebasestorage.googleapis.com/v0/b/az-laundry.appspot.com/o/product_type_icon%2Fao.png?alt=media&token=1aff5676-861a-42c1-b0c9-15ad3343e330"}
                          name={"Áo"}
                          short_description={"ok"}
                          status={"Chờ duyệt"}
                          total={140.000}
                          quantity={2}
                          id={""}
                        />
                    </SectionComponent>
                );
            case notification_type.REMINDER:
                return (
                    <SectionComponent styles ={styles.contentBox}>
                        <TextComponent color={COLORS.AZURE_BLUE} size={20} title text={item.title} styles= {{
                             fontWeight: 'bold',
                             textAlign: 'center',
                             width: '100%'
                        }}/>
                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={item.body || 'Content'} />
                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={item.shortDescription || 'shortDescription'} />
                    </SectionComponent>
                );
            case notification_type.NEW_PRODUCT:
                return (
                    <SectionComponent styles={styles.contentBox}>
                        <TextComponent color={COLORS.HEX_BLACK} size={20} title text="Dịch vụ Mới" />
                        <Image source={{ uri: item.shopImage }} style={styles.shopImage} />
                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={`Tên dịch vụ: ${item.productName}`} />
                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={`Tên Shop: ${item.shopName}`} />
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
        
            <KeyboardAvoidingViewWrapper>
                <SectionComponent styles={styles.scrollViewContent} >
                    <SectionComponent styles= {{
                        marginTop: 40,
                        paddingHorizontal: 0,
                        paddingVertical: 0,
                        backgroundColor: COLORS.WHITE,
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {item?.notification_type === notification_type.ORDER_UPDATE ? <ShoppingBag size="40" color={COLORS.AZURE_BLUE}/> : 
                        item?.notification_type === notification_type.PROMOTION ?  <DiscountShape size="40" color={COLORS.AZURE_BLUE}/> : 
                        item?.notification_type === notification_type.NEW_PRODUCT ? <Box size="40" color={COLORS.AZURE_BLUE}/> : <NotificationBing size="40" color={COLORS.AZURE_BLUE}/>}
                    </SectionComponent>
                    {renderNotificationContent()}
                </SectionComponent>
            </KeyboardAvoidingViewWrapper>
        </SectionComponent>
    );
}

const UPPER_HEADER_HEIGHT = 60;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:0,
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
        gap: 10
    },
    shopImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10
    }
});
