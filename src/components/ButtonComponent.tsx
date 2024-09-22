import React, { ReactNode } from 'react'
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { FONTFAMILY } from '../../assets/fonts'
import COLORS from '../assets/colors/Colors'
import { globalStyle } from '../styles/globalStyle'
import TextComponent from './TextComponent'

interface Props {
    icon?: ReactNode,
    text: string,
    type?: '#129575' | 'text' | 'link', // button mặc định hoặc kiểu text hoặc link
    color?: string,
    styles?: StyleProp<ViewStyle>,
    textColor?: string,
    textStyles?: StyleProp<TextStyle>,
    textFont?: string,
    onPress?: () => void,
    iconFlex?: 'left' | 'right',
    disable?: boolean // khóa button khi người dùng không nhập đầy đủ dữ liệu
}

const ButtonComponent = (props: Props) => {

    const {icon, text, type, color, styles, textColor, textStyles, textFont, onPress, iconFlex, disable} = props

    return type === '#129575' ? (
        <TouchableOpacity 
            disabled= {disable}
            onPress={onPress}
            style = {[globalStyle.button, {
                backgroundColor: color ? color : disable ? COLORS.HEX_LIGHT_GREY : COLORS.AZURE_BLUE,
            }, styles]}>
            {icon && iconFlex === 'left' && icon}
            <TextComponent 
                text={text}
                color={textColor ?? COLORS.WHITE}
                font={textFont ?? FONTFAMILY.montserrat_bold}
                styles= {[textStyles, {
                    marginLeft: icon ? 15 : 0,
                    fontSize: 16,
                    textAlign: 'center'
                },]}
                flex={icon && iconFlex === 'right' ? 1 : 0}/>
            {icon && iconFlex === 'right' && icon}
        </TouchableOpacity>
    ) : (
        <TouchableOpacity onPress={onPress}>
            <TextComponent 
                text={text}
                color={type === 'link' ? COLORS.AZURE_BLUE : COLORS.HEX_BLACK}/>
        </TouchableOpacity>
    )
}

export default ButtonComponent