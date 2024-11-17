import React from 'react'
import { Image } from 'react-native'
import IMAGES from '../../../../../assets/images/Images'
import { ButtonComponent, ContainerComponent, HeaderComponent, RowComponent, SectionComponent } from '../../../../../components'

const SuccessPaymentScreen = ({navigation, route}: any) => {
  return (
    <ContainerComponent>
        <HeaderComponent title={`Đặt hàng thành công`}/>
        <SectionComponent>
            <RowComponent justify="center">
                <Image source={IMAGES.SuccessPayment} style={{width: 304, height: 300}} />
            </RowComponent>
            <ButtonComponent onPress={()=>navigation.replace('OrderHistoryScreen')} type='#00ADEF' text='Xong'/>
        </SectionComponent>
    </ContainerComponent>
  )
}

export default SuccessPaymentScreen