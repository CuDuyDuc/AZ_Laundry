import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { RowComponent, TextComponent } from "./index"
import COLORS from "../assets/colors/Colors"

interface Props {
    status: string,
    number: number,
    onPress: () => void
}

const BoxStatusShopOrderComponent = (props: Props) => {
    const { status, number, onPress } = props
    return (
        <TouchableOpacity onPress={onPress} style={{
            padding: 10,
            borderRadius: 5,
            backgroundColor: COLORS.GRAY,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            marginBottom: 10,
            marginTop: 10
        }}>
            <RowComponent justify="center">
                <TextComponent text={status} color={COLORS.HEX_BLACK} styles={{marginRight: 5}}/>
                <TextComponent text={`(${number})`} color={COLORS.AZURE_BLUE} />
            </RowComponent>
        </TouchableOpacity>
    )
}

export default BoxStatusShopOrderComponent