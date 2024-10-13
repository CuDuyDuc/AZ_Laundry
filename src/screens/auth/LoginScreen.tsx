import { Switch, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, InputComponent, KeyboardAvoidingViewWrapper, RowComponent, SectionComponent, TextComponent } from '../../components'
import COLORS from '../../assets/colors/Colors';
import { Lock, Sms } from 'iconsax-react-native';
import { FONTFAMILY } from '../../../assets/fonts';
import IMAGES from '../../assets/images/Images';
import { LoadingModal } from '../../modal';
import { Facebook, Google } from '../../assets/svgs';
import { globalStyle } from '../../styles/globalStyle';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { Validate } from '../../utils/validate';
import authenticationAPI from '../../apis/authAPI';
import { addAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings, LoginManager, Profile } from 'react-native-fbsdk-next';

GoogleSignin.configure({
    webClientId: '564942702249-rgi7af0a6naent9pkf08nvfeegfsp15p.apps.googleusercontent.com',
});

Settings.setAppID('505127202289060');

const LoginScreen = ({navigation}: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(true);
    const [rememberShop, setRememberShop] = useState(false);
    const [isDisable, setIsDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const emailValidation = Validate.email(email);

        if (!email || !password || !emailValidation) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [email, password]);

    const handleLogin = async () => {

        const emailValidation = Validate.email(email);
        setIsLoading(true);
        if (emailValidation) {
            setIsLoading(true);
            try {
                const res = await authenticationAPI.HandleAuthentication('/login', { email, password }, 'post');
                dispatch(addAuth(res.data));
                await AsyncStorage.setItem('auth', isRemember ? JSON.stringify(res.data) : email);
            } catch (error) {
                console.log(error)
            }

        } else {
            Alert.alert('Email is not correct!!!');
        }
    }

    const handleLoginWithGoogle = async () => {
        await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true, // hiển thị dialog chọn gg đăng nhập
        });

        const api = '/signInWithGoogle';
        setIsLoading(true);
        try {
            await GoogleSignin.hasPlayServices();

            const userInfo = await GoogleSignin.signIn();
             // gọi đến đăng nhập
            const user = userInfo.user
            const res: any = await authenticationAPI.HandleAuthentication(api, user, 'post')
            dispatch(addAuth(res.data));
            await AsyncStorage.setItem(
                'auth',
                JSON.stringify(res.data),
            );
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    const handleLoginWithFacebook = async () => {
        const api = '/signInWithGoogle';
        try {
            const result = await LoginManager.logInWithPermissions([
                'public_profile',
            ]);

            if (result.isCancelled) {
                console.log('Login cancel');
            } else {
                const profile = await Profile.getCurrentProfile();

                if (profile) {
                    setIsLoading(true);
                    const data = {
                        name: profile.name,
                        givenName: profile.firstName,
                        familyName: profile.lastName,
                        email: profile.userID, 
                        photo: profile.imageURL,
                    };

                    const res: any = await authenticationAPI.HandleAuthentication(
                        api,
                        data,
                        'post',
                    );

                    dispatch(addAuth(res.data));

                    await AsyncStorage.setItem('auth', JSON.stringify(res.data));

                    setIsLoading(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingViewWrapper>
            <SectionComponent styles={{alignItems:'center', marginTop:50}}>
                <Image source={IMAGES.Login}/>
            </SectionComponent>
            <SectionComponent>
                <TextComponent 
                    title
                    text='Đăng Nhập'
                    size={33}
                    color={COLORS.OCEAN_BLUE}
                    font={FONTFAMILY.montserrat_bold}
                    styles={{ marginBottom: 20, textAlign:'center'}}/>
                <InputComponent
                    value={email}
                    placeholder='Email'
                    onChange={val => setEmail(val)}
                    allowClear
                    affix={<Sms size={22} color={COLORS.BLUE_GRAY} />} 
                    backgroundColor={COLORS.WHITE}/>
                <InputComponent
                    value={password}
                    placeholder='Mật khẩu'
                    onChange={val => setPassword(val)}
                    isPassword
                    affix={<Lock size={22} color={COLORS.BLUE_GRAY} />} 
                    backgroundColor={COLORS.WHITE}/>
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='space-between'>
                    <RowComponent onPress={() => setIsRemember(!isRemember)}>
                        <Switch
                            trackColor={{ false: COLORS.AZURE_BLUE, true: COLORS.LIGHT_SKY_BLUE}}
                            thumbColor={isRemember ? COLORS.AZURE_BLUE : COLORS.LIGHT_SKY_BLUE}
                            value={isRemember}
                            onChange={() => setIsRemember(!isRemember)} />
                        <TextComponent text='Ghi nhớ tài khoản' color={COLORS.BLUE_GRAY}/>
                    </RowComponent>
                    <ButtonComponent
                        text='Quên mật khẩu?'
                        onPress={() => navigation.navigate('ForgotPassWord') }
                        type="link" />
                </RowComponent>
            </SectionComponent>
            <SectionComponent styles={{ marginTop: 20 }}>
                <ButtonComponent 
                    disable= {isDisable}
                    text='ĐĂNG NHẬP' 
                    type='#00ADEF' 
                    onPress={handleLogin}/>
            </SectionComponent>
            <SectionComponent>
                <TextComponent
                    text='Đăng nhập với'
                    color={COLORS.BLUE_GRAY}
                    styles={{
                        textAlign: 'center',
                        fontSize: 16,
                        fontFamily: FONTFAMILY.montserrat_medium,
                        marginBottom: 10
                    }} />
                <RowComponent justify='center'>
                    <ButtonComponent
                        text=''
                        iconFlex='left'
                        type='#00ADEF'
                        styles={[globalStyle.shadow, {flex: 0.1, marginRight: 20}]}
                        textColor={COLORS.HEX_LIGHT_GREY}
                        onPress={handleLoginWithGoogle}
                        icon={<Google  style = {{marginLeft: 13}}/>}
                    />
                    <ButtonComponent
                        text=''
                        iconFlex='left'
                        type='#00ADEF'
                        styles={[globalStyle.shadow, {flex: 0.1}]}
                        textColor={COLORS.HEX_LIGHT_GREY}
                        onPress={handleLoginWithFacebook}
                        icon={<Facebook style = {{marginLeft: 13}}/>} />
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='center'>
                    <TextComponent text="Bạn chưa có tài khoản?  " color={COLORS.BLUE_GRAY}/>
                    <ButtonComponent type='link' text='Đăng ký' onPress={() => {
                        navigation.navigate('SignUpScreen')
                    }}/>
                </RowComponent>
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </KeyboardAvoidingViewWrapper>
    )
}

export default LoginScreen