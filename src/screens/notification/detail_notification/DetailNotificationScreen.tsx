import React, { useRef } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Animated, Image } from "react-native";
import COLORS from "../../../assets/colors/Colors";
import { SectionComponent, TextComponent } from "../../../components";
import { DiscountShape, TicketDiscount } from "iconsax-react-native";
import { notification_type } from "../../../utils/constants";

export default function DetailNotificationScreen({navigation, route}: any) {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const { item } = route.params;
    
    // Animation for text to move up and change color
    const textAnimation = {
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 50],
                    outputRange: [0, -50],
                    extrapolate: "clamp",
                }),
            },
            {
                translateX: animatedValue.interpolate({
                    inputRange: [0, 50],
                    outputRange: [0, -20],
                    extrapolate: "clamp",
                }),
            },
        ],
        color: animatedValue.interpolate({
            inputRange: [0, 50],
            outputRange: ["black", "white"],
            extrapolate: "clamp",
        }),
    };

    // Render nội dung dựa trên loại thông báo
    const renderNotificationContent = () => {
        switch (item.notification_type) {
            case notification_type.ORDER_UPDATE:
                return (
                    <SectionComponent styles={styles.contentBox}>
                        <TextComponent color={COLORS.HEX_BLACK} size={20} title text="Đơn Hàng Mới" />
                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={`Mã Đơn: ${item.orderId}`} />
                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={`Khách Hàng: ${item.customerName}`} />
                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={`Tổng Tiền: ${item.totalAmount} đ`} />
                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={`Số lượng dịch vụ: ${item.serviceCount}`} />
                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={`Chi tiết dịch vụ: ${item.serviceItems.join(", ")}`} />
                    </SectionComponent>
                );
            case notification_type.REMINDER:
                return (
                    <SectionComponent styles ={styles.contentBox}>
                        <TextComponent color={COLORS.HEX_BLACK} size={20} title text={item.title} />
                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={item.body || 'Content'} />

                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={item.shortDescription || 'shortDescription'} />
                    </SectionComponent>
                );
            case notification_type.NEW_PRODUCT:
                return (
                    <SectionComponent styles={styles.contentBox}>
                        <TextComponent color={COLORS.HEX_BLACK} size={20} title text="Sản Phẩm Mới" />
                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={`Tên Sản Phẩm: ${item.productName}`} />
                        <TextComponent color={COLORS.HEX_BLACK} size={16} text={`Tên Shop: ${item.shopName}`} />
                        <Image source={{ uri: item.shopImage }} style={styles.shopImage} />
                    </SectionComponent>
                );
            default:
                return (
                    <TextComponent color={COLORS.HEX_BLACK} size={16} text="Không có thông tin chi tiết cho loại thông báo này." />
                );
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <SafeAreaView>
                <View style={styles.upperHeaderPlaceholder} />
            </SafeAreaView>

            <View style={styles.header}>
                <Animated.Text style={[styles.notificationText, textAnimation]}>
                    Thông báo Chi tiết
                </Animated.Text>
            </View>
            <ScrollView
                onScroll={(e) => {
                    const offsetY = e.nativeEvent.contentOffset.y;
                    animatedValue.setValue(offsetY);
                }}
                scrollEventThrottle={16}
            >
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
                        <DiscountShape size="40" color="#FF8A65"/>
                    </SectionComponent>
                    {renderNotificationContent()}
                </SectionComponent>
            </ScrollView>
        </View>
    );
}

const UPPER_HEADER_HEIGHT = 60;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        height: 1000,
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
        alignItems: 'flex-start'
    },
    shopImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10
    }
});
