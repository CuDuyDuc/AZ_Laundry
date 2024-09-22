import { View, StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyle } from '../styles/globalStyle';

interface Props {
    justify?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined;
    styles?: StyleProp<ViewStyle>;
    children: ReactNode;
    onPress?: () => void;
}

const RowComponent = (props: Props) => {

    const { justify, styles, children, onPress } = props;
    const localStyleRemember = [
        globalStyle.row, 
        {
            justifyContent: justify
        }, 
        styles 
    ]
    return onPress ? ( <TouchableOpacity activeOpacity={0.9} onPress={onPress} style = {localStyleRemember}>
        {children}
    </TouchableOpacity>) : (
        <View style={localStyleRemember}>
            {children}
        </View>
    )
}

export default RowComponent;