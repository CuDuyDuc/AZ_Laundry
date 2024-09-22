import React from 'react'
import { ActivityIndicator, Image } from 'react-native'
import { FONTFAMILY } from '../../assets/fonts'
import COLORS from '../assets/colors/Colors'
import IMAGES from '../assets/images/Images'
import { ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../components'

const SplashScreen = () => {

    return (
        <ContainerComponent>
            <SectionComponent styles={{ alignItems: 'center' }}>
                <SpaceComponent height={300} />
                <Image source={IMAGES.Logo} />
            </SectionComponent>
            <SectionComponent>
                <ActivityIndicator color={COLORS.AZURE_BLUE} size={40} />
            </SectionComponent>
            <SpaceComponent height={210}/>
            <SectionComponent>
                <RowComponent justify='center'>
                    <TextComponent 
                        text={"Chào mừng bạn đến với "} 
                        color={COLORS.HEX_LIGHT_GREY}/>
                    <TextComponent 
                        text={"AZ_Laundry"}
                        color={COLORS.AZURE_BLUE}
                        font={FONTFAMILY.montserrat_medium}/>
                </RowComponent>
            </SectionComponent>
        </ContainerComponent>
    )
}

export default SplashScreen