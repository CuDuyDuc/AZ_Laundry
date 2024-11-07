import React from "react"
import { TouchableOpacity, ViewStyle } from "react-native"
import { RowComponent, TextComponent } from "./index"
import COLORS from "../assets/colors/Colors"

interface Props {
    status: string,
    number?: number,
    onPress: () => void,
    isSelected: boolean
}

const BoxStatusShopOrderComponent = (props: Props) => {
    const { status, number = 0, onPress, isSelected } = props

    return (
        <TouchableOpacity onPress={onPress} 
        style={{
            padding: 10,
            borderRadius: 5,
            backgroundColor: isSelected ? COLORS.WHITE : COLORS.GRAY,
            borderWidth: isSelected ? 1 : 0,
            borderColor: isSelected ? COLORS.AZURE_BLUE : 'transparent',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            marginBottom: 10,
            marginTop: 10,
        }}>
            <RowComponent justify="center">
                <TextComponent text={status} color={COLORS.HEX_BLACK} styles={{ marginRight: 5 }} />
                <TextComponent text={`(${number})`} color={COLORS.AZURE_BLUE} />
            </RowComponent>
        </TouchableOpacity>
    )
}

export default BoxStatusShopOrderComponent
