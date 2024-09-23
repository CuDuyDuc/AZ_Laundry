import { View, Text, Switch, Image } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, InputComponent, KeyboardAvoidingViewWrapper, RowComponent, SectionComponent, TextComponent } from '../../components'
import COLORS from '../../assets/colors/Colors';
import { Lock, Sms } from 'iconsax-react-native';
import { FONTFAMILY } from '../../../assets/fonts';
import IMAGES from '../../assets/images/Images';
import { LoadingModal } from '../../modal';
import { Facebook, Google } from '../../assets/svgs';
import { globalStyle } from '../../styles/globalStyle';

const LoginScreen = ({navigation}: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(true);
    const [rememberShop, setRememberShop] = useState(false);
    const [isDisable, setIsDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <KeyboardAvoidingViewWrapper>
            <SectionComponent styles={{alignItems:'flex-end', marginTop:50}}>
                <RowComponent onPress={() => setRememberShop(!rememberShop)}>
                    <Switch 
                        trackColor={{ false: COLORS.AZURE_BLUE, true: COLORS.LIGHT_SKY_BLUE }}
                        thumbColor={rememberShop ? COLORS.AZURE_BLUE : COLORS.LIGHT_SKY_BLUE}
                        value={rememberShop}
                        onChange={() => setRememberShop(!rememberShop)}/>
                    <TextComponent 
                        text="Tôi là Shop" 
                        color={COLORS.HEX_BLACK}
                        font={FONTFAMILY.montserrat_bold}/>
                </RowComponent>
            </SectionComponent>
            <SectionComponent styles={{alignItems:'center'}}>
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
                    type='#00ADEF' />
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
                        icon={<Google  style = {{marginLeft: 13}}/>}
                    />
                    <ButtonComponent
                        text=''
                        iconFlex='left'
                        type='#00ADEF'
                        styles={[globalStyle.shadow, {flex: 0.1}]}
                        textColor={COLORS.HEX_LIGHT_GREY}
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