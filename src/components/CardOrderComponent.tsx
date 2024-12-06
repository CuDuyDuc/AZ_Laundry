import React from 'react';
import { Image, View, FlatList, TouchableOpacity } from 'react-native';
import { RowComponent, SectionComponent, ButtonComponent, TextComponent } from '../components';
import COLORS from '../assets/colors/Colors';
import { globalStyle } from './../styles/globalStyle';
import { FONTFAMILY } from '../../assets/fonts';

interface Props {
    id: string;
    imgUrl?: string;
    name: string;
    short_description: string;
    status: string;
    total: number;
    quantity: number;
}

const Test = (props: Props) => {
    const { imgUrl, name, short_description, status, total, quantity } = props

    return (
        <SectionComponent>
            <RowComponent justify="space-between" styles={{ marginTop: 10 }}>
                <Image
                    source={{ uri: imgUrl }}
                    style={{ width: 80, height: 80, resizeMode: 'contain', borderRadius: 10 }}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <RowComponent justify='space-between'>
                        <TextComponent text={name} size={16} color={COLORS.AZURE_BLUE} font={FONTFAMILY.montserrat_medium} />
                        <TextComponent text={status} size={14} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} />
                    </RowComponent>
                    <TextComponent text={short_description} size={14} color={COLORS.GRAY_WHITE} />
                    <RowComponent justify='space-between'>
                        <TextComponent
                            text={`${total.toLocaleString('vi-VN')} VND`}
                            size={16}
                            color={COLORS.RED}
                        />
                        <TextComponent text={`SL: ${quantity}`} size={16} color={COLORS.BLUE_GRAY} />
                    </RowComponent>
                </View>
            </RowComponent>

        </SectionComponent>
    );
};

export default Test;
