import React, { memo } from 'react';
import { View } from 'react-native';
import COLORS from './../assets/colors/Colors';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';

interface Props {
    text?: string;
    colorText?: string;
    backgroundColor?: string;
}
const MessageComponent = (props: Props) => {
    const { text, colorText, backgroundColor } = props;
    return (
        <RowComponent>
            <View style={{ backgroundColor: backgroundColor, padding: 10, maxWidth: 290, borderRadius: 25, marginLeft: 8 }}>
                <TextComponent color={colorText} text={text} />
            </View>
        </RowComponent>
    );
};

export default memo(MessageComponent);
