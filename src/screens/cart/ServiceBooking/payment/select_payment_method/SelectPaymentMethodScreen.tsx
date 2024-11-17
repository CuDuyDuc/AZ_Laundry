import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CheckBoxComponent, ContainerComponent, HeaderComponent, RowComponent, SectionComponent, TextComponent } from '../../../../../components'
import { Card, Cd, MoneyRecive } from 'iconsax-react-native'
import COLORS from '../../../../../assets/colors/Colors'
import { FONTFAMILY } from '../../../../../../assets/fonts'
import { globalStyle } from '../../../../../styles/globalStyle'
import { usePaymentMethod } from '../../../../../context/PaymentMethodContext'

const SelectPaymentMethodScreen = ({navigation, route}: any) => {
    const {selectedPaymentMethod, setSelectedPaymentMethod}=usePaymentMethod()
    const handlePaymentMethod=(data:string)=>{
        setSelectedPaymentMethod(data)
        navigation.goBack()
    }
    return (
        <ContainerComponent>
            <HeaderComponent title={`Phương thức thanh toán`} isBack onBack={() => navigation.goBack()}/>
            <SectionComponent styles={globalStyle.styleSection}>
                <TouchableOpacity onPress={()=>handlePaymentMethod('COD')} >
                    <RowComponent>
                        <CheckBoxComponent icon={<Cd size="18" color={selectedPaymentMethod === 'COD'? COLORS.AZURE_BLUE: COLORS.HEX_LIGHT_GREY}/>}/>
                        <MoneyRecive size="32" color={COLORS.ORANGE} variant="Bold"/>
                        <TextComponent text={'Thanh toán khi nhận hàng'} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_medium} styles={{marginStart:5}}/>
                    </RowComponent>
                </TouchableOpacity>
            </SectionComponent>
            <SectionComponent styles={globalStyle.styleSection}>
                <TouchableOpacity onPress={()=>handlePaymentMethod('VNPay')} >
                    <RowComponent>
                        <CheckBoxComponent icon={<Cd size="18" color={selectedPaymentMethod === 'VNPay'? COLORS.AZURE_BLUE: COLORS.HEX_LIGHT_GREY}/>}/>
                        <Card size="32" color={COLORS.ORANGE} variant="Bold"/>
                        <TextComponent text={'Thanh toán VNPay'} color={COLORS.HEX_BLACK} font={FONTFAMILY.montserrat_medium} styles={{marginStart:5}}/>
                    </RowComponent>
                </TouchableOpacity>
            </SectionComponent>
        </ContainerComponent>
    )
}

export default SelectPaymentMethodScreen