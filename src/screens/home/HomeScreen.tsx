import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Notification } from 'iconsax-react-native';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FONTFAMILY } from '../../../assets/fonts';
import COLORS from '../../assets/colors/Colors';
import IMAGES from '../../assets/images/Images';
import {
    ButtonComponent,
    CardServiceComponent,
    ContainerComponent,
    RowComponent,
    SectionComponent,
    SwipeComponent,
    TextComponent,
} from '../../components';
import { useRole } from '../../permission/permission';
import { authSelector, removeAuth } from '../../redux/reducers/authReducer';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const user = useSelector(authSelector);
    const { isUser, isShop, isAdmin } = useRole();
    const handleSignOut = async () => {
        dispatch(removeAuth({}));
        await AsyncStorage.removeItem('auth');
        await GoogleSignin.signOut();
    };

    return (
        <ContainerComponent styleBackground={{ backgroundColor: COLORS.WHISPER_GRAY }} isScroll>
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
                <SwipeComponent />
            </SectionComponent>
            <SectionComponent styles={{ marginTop: -30 }}>
                <RowComponent justify='space-between'>
                    <RowComponent styles={{ backgroundColor: COLORS.WHITE, borderRadius: 16 }}>
                        <Image source={IMAGES.DanhMuc} style={{ width: 20, height: 20 }} />
                        <TextComponent text={" Danh mục"} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} />
                    </RowComponent>
                    <TextComponent text={"Xem tất cả"} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} />
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <CardServiceComponent />
            </SectionComponent>
            <SectionComponent styles={{ marginTop: -20 }}>
                <TextComponent text={"Mách mẹo vặt"} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} />
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