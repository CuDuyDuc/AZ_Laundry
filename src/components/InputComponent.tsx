import { CloseSquare, Eye, EyeSlash } from 'iconsax-react-native';
import React, { ReactNode, useState } from 'react';
import { KeyboardType, StyleProp, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import COLORS from '../assets/colors/Colors';
import { globalStyle } from '../styles/globalStyle';

interface Props {
    value: string,
    onChange: (val: string) => void,
    affix?: ReactNode, 
    placeholder?: string, 
    suffix?: ReactNode, 
    isPassword?: boolean, 
    allowClear?: boolean,
    type?: KeyboardType,
    onEnd?: () => void,
    backgroundColor?: string,
    style?: StyleProp<ViewStyle>;
    styleInput?: StyleProp<ViewStyle>;
    editKeyboard?: boolean;
}

const InputComponent = (props: Props) => {

    const { value, onChange, affix, placeholder, suffix, isPassword, allowClear, type, onEnd, backgroundColor, style, styleInput, editKeyboard} = props;

    const [isShowPass, setIsShowPass] = useState(isPassword ?? false);
    return (
        <View style = {[styles.inputContainer, { backgroundColor: backgroundColor ?? 'transparent' }, style]}>
            {affix ?? affix}
            <TextInput
                style = {[styles.input, globalStyle.text, styleInput]}
                value={value}
                placeholder={placeholder ?? ''}
                onChangeText={val => onChange(val)} 
                secureTextEntry={isShowPass}
                placeholderTextColor={COLORS.BLUE_GRAY}
                keyboardType={type ?? 'default'}
                autoCapitalize="none"
                onEndEditing={onEnd}
                editable={editKeyboard ? false : true}/> 
            {suffix ?? suffix}
            <TouchableOpacity onPress={isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')}>
                {isPassword ? (
                    isShowPass ? (
                        <EyeSlash size={22} color={COLORS.BLUE_GRAY} />
                    ) : (
                        <Eye size={22} color={COLORS.BLUE_GRAY} />
                    )
                ) : (
                    value.length > 0 && allowClear && (
                        <CloseSquare size={22} color={COLORS.BLUE_GRAY} />
                    )
                )}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.WHITE,
        width: '100%',
        minHeight: 56,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 19,
    },
    input: {
        padding: 0,
        margin: 0,
        flex: 1,
        paddingHorizontal: 14
    }
})

export default InputComponent;
