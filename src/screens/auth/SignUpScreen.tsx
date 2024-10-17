import { Lock, Sms, User } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { FONTFAMILY } from '../../../assets/fonts';
import authenticationAPI from '../../apis/authAPI';
import COLORS from '../../assets/colors/Colors';
import IMAGES from '../../assets/images/Images';
import { ButtonComponent, InputComponent, KeyboardAvoidingViewWrapper, RowComponent, SectionComponent, TextComponent } from '../../components';
import { LoadingModal } from '../../modal';
import { Validate } from '../../utils/validate';

interface ErrorMessages {
    email: string;
    password: string;
    confirmPass: string;
}

const initValues = {
    fullname: '',
    email: '',
    password: '',
    confirmPass: '',
}


const SignUpScreen = ({ navigation }: any) => {
    const [values, setValues] = useState(initValues);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>();
    const [isDisable , setIsDisable] = useState(true);

    useEffect(() => {
        if (
            !errorMessage ||
            (errorMessage &&
                (errorMessage.email ||
                    errorMessage.password ||
                    errorMessage.confirmPass)) ||
            !values.email ||
            !values.password ||
            !values.confirmPass
        ) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [errorMessage, values]);


    const handleChangeValue = (key: string, value: string) => {
        const data: any = { ...values }
        data[`${key}`] = value;
        setValues(data);
    }

    const formValidator = (key: string) => {
        const data = { ...errorMessage };
        let message = ``;

        switch (key) {
            case 'email':
                if (!values.email) {
                    message = `Vui lòng nhập Email!`;
                } else if (!Validate.email(values.email)) {
                    message = 'Email không hợp lệ!';
                } else {
                    message = '';
                }

                break;

            case 'password':
                message = !values.password ? `Vui lòng nhập Password` : '';
                break;

            case 'confirmPass':
                if (!values.confirmPass) {
                    message = `Vui lòng nhập xác nhận mật khẩu!`;
                } else if (values.confirmPass !== values.password) {
                    message = 'Mật khẩu không khớp!';
                } else {
                    message = '';
                }

                break;
        }

        data[`${key}`] = message;

        setErrorMessage(data);
    };

    const handleRegister = async () => {
        const api = `/verification`;
        setIsLoading(true);
        try {
            const res = await authenticationAPI.HandleAuthentication(
                api,
                { email: values.email },
                'post',
            );

            setIsLoading(false);

            navigation.navigate('Verification', {
                code: res.data.code,
                ...values,
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <KeyboardAvoidingViewWrapper>
                <SectionComponent styles={{ alignItems: 'center', marginTop: 70 }}>
                    <Image source={IMAGES.SignUp} />
                </SectionComponent>
                <SectionComponent>
                    <TextComponent
                        title
                        text='Đăng Ký'
                        size={33}
                        color={COLORS.OCEAN_BLUE}
                        font={FONTFAMILY.montserrat_bold}
                        styles={{ marginBottom: 50, textAlign:'center'}} />
                    <InputComponent
                        value={values.fullname}
                        placeholder='Họ tên'
                        onChange={val => handleChangeValue('fullname', val)}
                        allowClear
                        backgroundColor={COLORS.WHITE}
                        affix={<User size={22} color={COLORS.BLUE_GRAY} />} />
                    <InputComponent
                        value={values.email}
                        placeholder='Email'
                        onChange={val => handleChangeValue('email', val)}
                        allowClear
                        backgroundColor={COLORS.WHITE}
                        affix={<Sms size={22} color={COLORS.BLUE_GRAY} />}
                        onEnd={() => formValidator('email')} />
                    <InputComponent
                        value={values.password}
                        placeholder='Mật khẩu'
                        onChange={val => handleChangeValue('password', val)}
                        isPassword
                        backgroundColor={COLORS.WHITE}
                        affix={<Lock size={22} color={COLORS.BLUE_GRAY} />}
                        onEnd={() => formValidator('password')} />
                    <InputComponent
                        value={values.confirmPass}
                        placeholder='Xác nhận mật khẩu'
                        onChange={val => handleChangeValue('confirmPass', val)}
                        isPassword
                        backgroundColor={COLORS.WHITE}
                        affix={<Lock size={22} color={COLORS.BLUE_GRAY} />}
                        onEnd={() => formValidator('confirmPass')} />
                </SectionComponent>
                {errorMessage && (
                    <SectionComponent>
                        {Object.keys(errorMessage).map(
                            (error, index) =>
                                errorMessage[`${error}`] && (
                                    <TextComponent
                                        text={errorMessage[`${error}`]}
                                        key={`error${index}`}
                                        color={COLORS.RED}
                                    />
                                ),
                        )}
                    </SectionComponent>
                )}
                <SectionComponent styles={{ marginTop: 20 }}>
                    <ButtonComponent
                        text='ĐĂNG KÝ'
                        type='#00ADEF'
                        onPress={handleRegister}
                        disable={isDisable} />
                </SectionComponent>
                <SectionComponent styles={{ marginTop: 20 }}>
                    <RowComponent justify='center'>
                        <TextComponent text="Bạn đã có tài khoản?  "  color={COLORS.BLUE_GRAY}/>
                        <ButtonComponent type='link' text='Đăng nhập' onPress={() => {
                            navigation.navigate('LoginScreen')
                        }} />
                    </RowComponent>
                </SectionComponent>
            </KeyboardAvoidingViewWrapper >
            <LoadingModal visible={isLoading} />
        </>
    )
}

export default SignUpScreen