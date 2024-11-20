import { Camera } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import COLORS from '../../assets/colors/Colors';
import { ButtonComponent, ContainerComponent, HeaderComponent, InputComponent, RowComponent, SectionComponent } from '../../components';
import { authSelector } from '../../redux/reducers/authReducer';
import authenticationAPI from '../../apis/authAPI';
import * as Burnt from "burnt";
const InfoScreen = ({ navigation }: any) => {
  const user = useSelector(authSelector);
  console.log(user);
  
  const [fullname, setFullname] = useState(user?.fullname || '');
  const [address, setAddress] = useState(user?.address || '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  const getUserById = async (id_user: string) => {
  
    try {
    const req : any = await authenticationAPI.HandleAuthentication(`/get-user-by-id?id_user=${id_user}`);
    console.log({req});
   if(req) {
    setAddress(req[0]?.address);
    setPhone(req[0]?.phone_number);
   }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserById(user?.id);
    
    return () => {
      
    }
  }, [])
  
  const handleChangeInfo = async () => {

    if(!phone || !address) {
      return  Burnt.toast({
        title: 'Địa chỉ hoặc số điện thoại không được để trống!'
      });
    }
    const req = await authenticationAPI.HandleAuthentication('/update-info', {
      userId: user?.id,
      phone_number : phone,
      address
    }, 
    'put'
  );
   if ( req.status == 200 ) {
    Burnt.toast({
      title: 'Đổi thông tin thành công'
    })
    getUserById(user?.id);

  }
  }
  return (
    <ContainerComponent>
      <HeaderComponent title='Thông tin cá nhân' isBack onBack={() => navigation.goBack()} />
      <SectionComponent>
        <RowComponent justify={'center'} styles={{ padding: 20 }} onPress={() => { }}>
          <SectionComponent>
            {user?.photo ? (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                }}
                source={{ uri: user?.photo }} />
            ) : (
              <Image
                style={{
                  borderRadius: 40,
                  width: 60,
                  height: 60,
                }}
                source={{
                  uri: 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png',
                }} />
            )}
            <RowComponent
              styles={{
                borderRadius: 1000,
                backgroundColor: 'white',
                position: 'absolute',
                bottom: 20,
                right: 15,
                height: 40,
                width: 40,
                justifyContent: 'center',
              }}>
              <Camera size="28" color={COLORS.AZURE_BLUE} variant="Bold" />
            </RowComponent>
          </SectionComponent>
        </RowComponent>
        <InputComponent
          value={fullname}
          placeholder='Họ và tên'
          onChange={val => setFullname(val)}
          editKeyboard={true}
          backgroundColor={COLORS.WHITE} />
        <InputComponent
          value={address}
          placeholder='Địa chỉ'
          onChange={val => setAddress(val)}
          allowClear
          backgroundColor={COLORS.WHITE} />
        <InputComponent
          value={phone}
          placeholder='Phone'
          onChange={val => setPhone(val)}
          allowClear
          backgroundColor={COLORS.WHITE} />
      </SectionComponent>
      <SectionComponent styles={{alignItems: 'center'}}>
        <ButtonComponent
          text='Lưu thay đổi'
          type='#00ADEF'
          styles = {{width: '80%'}}
          onPress={handleChangeInfo} />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default InfoScreen;
