import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { Validate } from '../../utils/validate';
import { globalStyle } from '../../styles/globalStyle';
import { ButtonComponent, InputComponent, SectionComponent, TextComponent } from '../../components';
import { ArrowLeft2, Sms } from 'iconsax-react-native';
import COLORS from '../../assets/colors/Colors';
import { FONTFAMILY } from '../../../assets/fonts';
import { LoadingModal } from '../../modal';
import IMAGES from '../../assets/images/Images';
import authenticationAPI from '../../apis/authAPI';

const ForgotPassWord = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [isDisable, setIsDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckEmail = () => {
        const isValidEmail = Validate.email(email);
        setIsDisable(!isValidEmail);
    }

    const handleForgotPassword = async () => {
        const api = `/forgotPassword`;
        setIsLoading(true);
        try {
            const res: any = await authenticationAPI.HandleAuthentication(api, { email }, 'post');
            console.log(res);
            Alert.alert('Send Password to You: ', 'We have sent your email including the new password!');
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(`Unable to create new password forgot password api, ${error}`);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.WHISPER_GRAY }}>
            <SectionComponent>
                <TouchableOpacity style={{ paddingTop: 50, paddingBottom: 10 }}>
                    <ArrowLeft2 size={24} color={COLORS.OCEAN_BLUE}
                        onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <TextComponent text='Resset Mật Khẩu' title font={FONTFAMILY.montserrat_bold} color={COLORS.OCEAN_BLUE} />
                <TextComponent text='Để đặt lại mật khẩu, bạn cần có email có thể được xác thực.' styles={{ paddingBottom: 30 }} color={COLORS.BLUE_GRAY} />
            </SectionComponent>
            <SectionComponent styles={{ alignItems: 'center'}}>
                <Image source={IMAGES.ForgotPass}/>
            </SectionComponent>
            <SectionComponent styles={{marginTop: 40}}>
                <InputComponent
                    value={email}
                    placeholder='abc123@gmail.com'
                    onChange={val => setEmail(val)}
                    backgroundColor={COLORS.WHITE}
                    affix={<Sms size={24} color={COLORS.HEX_LIGHT_GREY} />}
                    onEnd={handleCheckEmail} />
            </SectionComponent>
            <SectionComponent styles={{ alignItems: 'center' }}>
                <ButtonComponent
                    text='Gửi'
                    type='#00ADEF'
                    onPress={handleForgotPassword}
                    styles={{ width: '80%' }}
                    disable={isDisable} />
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </View>
    )
}

export default ForgotPassWord