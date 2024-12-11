import React, { memo } from 'react';
import { Image, View } from 'react-native';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import { Validate } from '../utils/validate';

interface Props {
    text: string;
    colorText?: string;
    backgroundColor?: string;
}
const MessageComponent = (props: Props) => {
    const { text, colorText, backgroundColor } = props;
    return (
        <RowComponent>
           {!Validate.isURL(text)?(
            <View style={{ backgroundColor: backgroundColor, padding: 10, maxWidth: 290, borderRadius: 25, marginLeft: 8 }}>
                <TextComponent color={colorText} text={text} />
            </View>
           ):<Image source={{uri:text}} style={{width:200, height:150,resizeMode: 'contain', borderRadius: 20}} />}
        </RowComponent>
    );
};

export default memo(MessageComponent);
