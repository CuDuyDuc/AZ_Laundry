import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Animated, Image, FlatList, ActivityIndicator } from "react-native";
import COLORS from "../../../assets/colors/Colors";
import { CardOrderComponent, HeaderComponent, KeyboardAvoidingViewWrapper, SectionComponent, TextComponent } from "../../../components";
import { Box, DiscountShape, NotificationBing, ShoppingBag, TicketDiscount } from "iconsax-react-native";
import { notification_type } from "../../../utils/constants";
import paymentAPI from "../../../apis/paymentAPI";

export default function DetailNotificationScreen({ navigation, route }: any) {
    const { item } = route.params;
    console.log(item);
    const [dataPayment, setDataPayment] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    console.log({ dataPayment });

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

    useEffect(() => {
        getPaymentById(item?.object_type_id);
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
                        }} title text="Đơn Hàng Mới" />
                        <SectionComponent styles={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 0, paddingBottom: 0 }}>
                            <TextComponent styles={{ fontWeight: 'bold' }} color={COLORS.HEX_BLACK} size={16} text={`Mã Đơn: `} />
                            <TextComponent color={COLORS.HEX_BLACK} size={16} text={`#${formatId(dataPayment?._id, 7)}`} />
                        </SectionComponent>
                        <SectionComponent styles={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 0, paddingBottom: 0 }}>
                            <TextComponent styles={{ fontWeight: 'bold' }} color={COLORS.HEX_BLACK} size={16} text={`Khách Hàng: `} />
                            <TextComponent color={COLORS.AZURE_BLUE} size={16} text={dataPayment?.id_user?.fullname || 'fullname'} />
                        </SectionComponent>

                        <SectionComponent styles={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 0, paddingBottom: 0 }}>
                            <TextComponent styles={{ fontWeight: 'bold' }} color={COLORS.HEX_BLACK} size={16} text={`Phương thức thanh toán: `} />
                            <TextComponent color={COLORS.AZURE_BLUE} size={16} text={dataPayment?.method_payment || ''} />
                        </SectionComponent>
                        <SectionComponent styles={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 0, paddingBottom: 0 }}>
                            <TextComponent styles={{ fontWeight: 'bold' }} color={COLORS.HEX_BLACK} size={16} text={`Tổng Tiền: `} />
                            <TextComponent color={COLORS.AZURE_BLUE} size={16} text={`${dataPayment?.mount_money} VND`} />
                        </SectionComponent>

                        <TextComponent styles={{ fontWeight: 'bold' }} color={COLORS.HEX_BLACK} size={16} text={`Dịch vụ khách đặt:`} />
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
        gap: 10
    },
    shopImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10
    }
});
