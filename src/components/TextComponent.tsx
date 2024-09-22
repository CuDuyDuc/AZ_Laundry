import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { FONTFAMILY } from '../../assets/fonts';
import COLORS from '../assets/colors/Colors';
import { globalStyle } from '../styles/globalStyle';

interface Props {
    text: string | undefined | number;
    color?: string,
    size?: number,
    flex?: number,
    font?: string,
    styles?: StyleProp<TextStyle>,
    title?: boolean,
    numberOfLines?: number | undefined
}

const TextComponent = (props: Props) => {
    const {text, color, size, flex, font, styles, title, numberOfLines} = props

    return (
        <Text numberOfLines={numberOfLines} style = {[
            globalStyle.text , {
                color: color ?? COLORS.WHITE,
                flex: flex ?? 0,
                fontSize: size ? size : title ? 34 : 16,
                fontFamily: font ? font : FONTFAMILY.montserrat_regular,
            }, 
            styles,
            ]}>{text}</Text>
    )
}

export default TextComponent