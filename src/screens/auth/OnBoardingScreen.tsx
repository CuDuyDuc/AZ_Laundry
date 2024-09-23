import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { FONTFAMILY } from '../../../assets/fonts';
import COLORS from '../../assets/colors/Colors';
import IMAGES from '../../assets/images/Images';
import { TextComponent } from '../../components';
import { globalStyle } from '../../styles/globalStyle';

const OnBoardingScreen = ({ navigation }: any) => {
    const [index, setIndex] = useState(0);

    return (
        <View style={[globalStyle.container]}>
            <Swiper style={{}}
                removeClippedSubviews={true}
                loop={false}
                onIndexChanged={num => setIndex(num)}
                index={index}
                dotColor={COLORS.LIGHT_SKY_BLUE}
                activeDotColor={COLORS.OCEAN_BLUE}>
                <Image source={IMAGES.OnBoarding} style={{ flex: 1, width: '100%', height: '100%' }} />
                <Image source={IMAGES.OnBoarding1} style={{ flex: 1, width: '100%', height: '100%' }} />
                <Image source={IMAGES.OnBoarding2} style={{ flex: 1, width: '100%', height: '100%' }} />
            </Swiper>
            <View style={[styles.directional]}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <TextComponent
                        text='Skip'
                        color={COLORS.OCEAN_BLUE}
                        font={FONTFAMILY.montserrat_bold} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')}>
                    <TextComponent
                        text='Next'
                        color={COLORS.OCEAN_BLUE}
                        font={FONTFAMILY.montserrat_bold} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    directional: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})


export default OnBoardingScreen