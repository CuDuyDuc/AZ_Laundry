import React from 'react';
import { Image, View, FlatList, TouchableOpacity } from 'react-native';
import { RowComponent, SectionComponent, ButtonComponent, TextComponent } from '../components';
import COLORS from '../assets/colors/Colors';

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
                        style={{ width: 80, height: 80, resizeMode: 'contain' }}
                    />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <TextComponent text={name} size={16} color={COLORS.BLUE_GRAY} />
                        <TextComponent text={short_description} size={14} color={COLORS.GRAY_WHITE} />
                        <TextComponent text={status} size={14} color={COLORS.BLUE_GRAY} />
                        <TextComponent
                            text={`${total.toLocaleString('vi-VN')} VND`}
                            size={16}
                            color={COLORS.RED}
                        />
                    </View>
                    <TextComponent text={`SL: ${quantity}`} size={16} color={COLORS.BLUE_GRAY} />
                </RowComponent>

            </SectionComponent>
    );
};

export default Test;
