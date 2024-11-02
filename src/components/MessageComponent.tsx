import React from 'react';
import { View } from 'react-native';
import COLORS from './../assets/colors/Colors';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';

interface Props {
    text?: string;
    colorText?: string;
    backgroundColor?: string;
    timeCurrent?: string;
}
const MessageComponent = (props: Props) => {
    const { text, colorText, backgroundColor ,timeCurrent} = props;
    return (
        <RowComponent>
            <TextComponent text={timeCurrent} color={COLORS.HEX_LIGHT_GRAY} />
            <View style={{ backgroundColor: backgroundColor, padding: 15, maxWidth: 170, borderRadius: 25, marginLeft: 8 }}>
                <TextComponent color={colorText} text={text} />
            </View>
        </RowComponent>
    );
};

export default MessageComponent;
