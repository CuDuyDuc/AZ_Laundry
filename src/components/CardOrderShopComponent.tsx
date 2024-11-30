import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import SectionComponent from "./SectionComponent";
import { RowComponent, TextComponent } from "./index";
import COLORS from "../assets/colors/Colors";
import { FONTFAMILY } from "../../assets/fonts";

interface Props {
    id: string;
    status: string;
    price: number;
    imgUrl?: string;
    dateOrder: string;
    onPress: () => void;
}

const CardOrderShopComponent = (props: Props) => {
    const {
        id,
        status,
        price,
        dateOrder,
        imgUrl , // Default value
        onPress,
    } = props;
    
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ marginBottom: 15, backgroundColor: COLORS.WHITE, padding: 8, borderRadius: 16, elevation: 5 }}
        >
            <RowComponent>
                <Image source={{ uri: imgUrl }} style={{ width: 80, height: 80, marginRight: 10, borderRadius:8 }} />
                <View style={{ width: '78%' }}>
                    <RowComponent justify="space-between">
                        <TextComponent text={`Mã đơn: ${id}`} color={COLORS.BLUE_GRAY} size={15} font={FONTFAMILY.montserrat_bold} />
                        <TextComponent text={dateOrder} color={COLORS.BLUE_GRAY} styles={{ marginRight: 10 }} size={15} />
                    </RowComponent>
                    <RowComponent justify="space-between">
                        <TextComponent text="Tổng thanh toán" color={COLORS.BLUE_GRAY} size={15} font={FONTFAMILY.montserrat_bold} />
                        <TextComponent text={`${price.toLocaleString('vi-VN')} VND`} color={COLORS.HEX_BLACK} styles={{ marginRight: 10 }} size={15} />
                    </RowComponent>
                    <RowComponent justify="space-between">
                        <TextComponent text="Trạng thái" color={COLORS.BLUE_GRAY} size={15} font={FONTFAMILY.montserrat_bold} />
                        <TextComponent text={status} color={COLORS.BLUE_GRAY} styles={{ marginRight: 10 }} size={15} />
                    </RowComponent>
                </View>
            </RowComponent>
        </TouchableOpacity>
    );
}

export default CardOrderShopComponent;
