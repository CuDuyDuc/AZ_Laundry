import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ArrowRight2, Book, LanguageCircle, Logout, Trash, Unlock } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { LoginManager } from 'react-native-fbsdk-next';
import ReactNativeModal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../assets/colors/Colors';
import { AccountComponent, HeaderComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { authSelector, removeAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authenticationAPI from '../../apis/authAPI';
import { useRole } from '../../permission/permission';
import { eventEmitterUpdateInfo } from './InfoScreen';

const ProfileScreen = ({ navigation }: any) => {

    const user = useSelector(authSelector);
    const { isUser } = useRole()
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(false);
    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState('');

    const getUserById = async () => {
        try {
        const req : any = await authenticationAPI.HandleAuthentication(`/get-user-by-id?id_user=${user?.id}`);
       if(req) {
        setPhone(req[0].phone_number);
        setPhoto(req[0].photo);
       }
        } catch (error) {
          console.log(error);
        }
      }
    const handleLogout = async () => {
        setModalVisible(true);
    };

    const handleSignOut = async () => {

        await AsyncStorage.removeItem('auth'); 
        await GoogleSignin.signOut();
        await LoginManager.logOut();
        dispatch(removeAuth({}));

        setModalVisible(false);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {

    getUserById();
    const subscriptionUpdateInfo = eventEmitterUpdateInfo.on('updateInfo', getUserById);
        
        return () => {
            subscriptionUpdateInfo.off('updateInfo', getUserById);
        };
    }, [])
    
    return (
        <>
            <SectionComponent
                styles={{ paddingHorizontal: 0,}}>
                <HeaderComponent title="Tài khoản" isBack onBack={() => navigation.goBack()}/>
                <RowComponent
                    onPress={() => {
                        navigation.navigate('EditInfoAccount')
                    }}
                    justify="space-between"
                    styles={{
                        padding: 20,
                        backgroundColor: COLORS.WHITE,
                        height: 100,
                    }}>
                    <RowComponent>
                        {photo ? (
                            <Image
                                style={{ borderRadius: 40, width: 60, height: 60,}}
                                source={{ uri: photo }}/>
                        ) : (
                            <Image
                                style={{ borderRadius: 40, width: 60, height: 60, }}
                                source={{
                                    uri: 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png',
                                }}/>)}
                        <SectionComponent styles={{
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            height: '100%',
                            marginTop:20}}>
                            <TextComponent
                                text={user?.fullname}
                                size={16}
                                styles={{ fontWeight: 'bold', }}
                                color="black"/>
                            {user?.phone ? <TextComponent
                                text={'0367459404'}
                                size={14}
                                color={COLORS.BLUE_GRAY}
                            /> : <TextComponent
                                text={phone || 'Add new phone number'}
                                size={14}
                                color={COLORS.BLUE_GRAY}
                            />}
                        </SectionComponent>
                    </RowComponent>
                    <ArrowRight2 size={32} color={COLORS.HEX_BLACK} />
                </RowComponent>
                <SpaceComponent height={10} />
                {isUser?(
                    <TouchableOpacity onPress={() => {navigation.navigate('OrderHistoryScreen')}}>
                        <AccountComponent
                            icon={<Book size="28" color={COLORS.AZURE_BLUE} />}
                            title="Lịch sử đặt hàng"/>
                    </TouchableOpacity>
                ):(
                    <TouchableOpacity onPress={() => {navigation.navigate('OrderStatisticsScreen')}}>
                        <AccountComponent
                            icon={<Book size="28" color={COLORS.AZURE_BLUE} />}
                            title="Thống kê"/>
                    </TouchableOpacity>
                )}
                <TouchableOpacity>
                    <AccountComponent
                        icon={<LanguageCircle size="28" color={COLORS.AZURE_BLUE} />}
                        title="Ngôn ngữ"/>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => {
                        navigation.navigate('ChangePasswordScreen');
                    }}>
                    <AccountComponent
                        icon={<Unlock size="28" color={COLORS.AZURE_BLUE} />}
                        title="Đổi mật khẩu"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                    <AccountComponent
                        icon={<Logout size="28" color={COLORS.AZURE_BLUE} />}
                        title="Đăng xuất" />
                </TouchableOpacity>
            </SectionComponent>
            <ReactNativeModal
                isVisible={isModalVisible}
                onBackdropPress={closeModal}
                onBackButtonPress={closeModal}
                style={{ marginHorizontal: 10, justifyContent: 'center' }}>
                <View style={{ borderRadius: 10, padding: 20, backgroundColor: COLORS.WHITE }}>
                    <TextComponent text='Bạn có chắc muốn đăng xuất không?' color={COLORS.AZURE_BLUE} size={15} />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 40 }}>
                        <TouchableOpacity
                            style={{
                                marginRight: 30,
                                borderWidth: 1,
                                backgroundColor: COLORS.HEX_LIGHT_GREY,
                                padding: 8,
                                borderRadius: 10,
                                width: 70,
                                borderColor: COLORS.HEX_LIGHT_GREY
                            }}
                            onPress={closeModal}>
                            <TextComponent text='No' color={COLORS.WHITE} styles={{ textAlign: 'center' }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                marginRight: 10,
                                borderWidth: 1,
                                backgroundColor: COLORS.AZURE_BLUE,
                                padding: 8,
                                borderRadius: 10,
                                width: 70,
                                borderColor: COLORS.AZURE_BLUE
                            }}
                            onPress={handleSignOut}>
                            <TextComponent text='Yes' color={COLORS.WHITE} styles={{ textAlign: 'center' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ReactNativeModal>
        </>
    );
}

export default ProfileScreen