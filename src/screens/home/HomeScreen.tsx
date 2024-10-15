import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    ButtonComponent,
    CardServiceComponent,
    ContainerComponent,
    RowComponent,
    SectionComponent,
    TextComponent,
} from '../../components';
import { authSelector, removeAuth } from '../../redux/reducers/authReducer';
import COLORS from '../../assets/colors/Colors';
import { FONTFAMILY } from '../../../assets/fonts';
import { Icon, Notification } from 'iconsax-react-native';
import { Image, TouchableOpacity, View, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import IMAGES from '../../assets/images/Images';
import { useRole } from '../../permission/permission';
import { globalStyle } from '../../styles/globalStyle';


const { width } = Dimensions.get('window');
const imageWidth = width * 0.916;
const imageHeight = imageWidth * 0.39;

const HomeScreen = () => {
    const imageSlideArray = [
        IMAGES.SlideShow,
        IMAGES.SlideShow1,
        IMAGES.SlideShow2,
    ];

    const [index, setIndex] = useState(0);
    const dispatch = useDispatch();
    const user = useSelector(authSelector);
    const { isUser, isShop, isAdmin } = useRole();

    const handleSignOut = async () => {
        dispatch(removeAuth({}));
        await AsyncStorage.removeItem('auth');
        await GoogleSignin.signOut();
    };

    return (
        <ContainerComponent>
            <SectionComponent
                styles={{
                    height: 83,
                    backgroundColor: COLORS.AZURE_BLUE,
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                <RowComponent styles={{ marginTop: 35 }} justify="space-between">
                    <TextComponent
                        text={`Hi, ${user.fullname}!`}
                        font={FONTFAMILY.montserrat_medium}
                    />
                    <TouchableOpacity>
                        <Notification size="30" color={COLORS.WHITE} />
                    </TouchableOpacity>
                </RowComponent>
            </SectionComponent>
            <SectionComponent
                styles={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15, height: 185 }}>
                <Swiper
                    removeClippedSubviews={true}
                    loop={true}
                    autoplay={true}
                    autoplayTimeout={3}
                    onIndexChanged={num => setIndex(num)}
                    index={index}
                    dotColor={COLORS.HEX_LIGHT_GREY}
                    activeDotColor={COLORS.BLUE_GRAY}>
                    {imageSlideArray.map((imageUrl, index) => (
                        <Image
                            source={imageUrl}
                            key={index}
                            style={[{ width: imageWidth, height: imageHeight }, globalStyle.card]}
                            resizeMode="cover"
                        />
                    ))}
                </Swiper>
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='space-between'>
                    <RowComponent styles={{ backgroundColor: COLORS.WHITE, borderRadius: 16 }}>
                        <Image source={IMAGES.DanhMuc} style={{ width: 20, height: 20 }} />
                        <TextComponent text={" Danh mục"} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} />
                    </RowComponent>
                    <TextComponent text={"Xem tất cả"} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} />
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <CardServiceComponent/>
                <CardServiceComponent/>
            </SectionComponent>
            <ButtonComponent
                styles={{ marginTop: 100 }}
                type="#00ADEF"
                text="LogOut"
                onPress={handleSignOut}
            />
        </ContainerComponent>
    );
};

export default HomeScreen;
