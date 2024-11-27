import { Camera, Lock } from 'iconsax-react-native';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import COLORS from '../../assets/colors/Colors';
import { ButtonComponent, ContainerComponent, HeaderComponent, InputComponent, RowComponent, SectionComponent } from '../../components';
import { authSelector } from '../../redux/reducers/authReducer';
import authenticationAPI from '../../apis/authAPI';
import * as Burnt from "burnt";
const ChangePasswordSceen = ({ navigation }: any) => {
  const user = useSelector(authSelector);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {

    if(!oldPassword || !newPassword || !confirmPassword) {
      return  Burnt.toast({
        title: 'Các trường không được để trống!'
      });
    }
    if(newPassword !== confirmPassword) {
      return  Burnt.toast({
        title: 'Mật khẩu không khớp với mật khẩu mới!'
      });
    }
   try {
    const req = await authenticationAPI.HandleAuthentication('/change-password', {
      userId: user?.id,
      oldPassword,
      newPassword,
      confirmPassword
    }, 
    'put'
  );
    req.status == 200 && Burnt.toast({
      title: 'Đổi thông tin thành công'
    })
   } catch (error) {
    console.log(error);
   }
  }
  return (
    <ContainerComponent>
      <HeaderComponent title='Đổi mật khẩu' isBack onBack={() => navigation.goBack()} />
      <SectionComponent styles={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
      }}>
          
        <InputComponent
          value={oldPassword}
          placeholder='Mật khẩu cũ'
          onChange={val => setOldPassword(val)}
          isPassword
          affix={<Lock size={22} color={COLORS.BLUE_GRAY} />} 
          backgroundColor={COLORS.WHITE} />
        <InputComponent
          value={newPassword}
          placeholder='Mật khẩu mới'
          onChange={val => setNewPassword(val)}
          allowClear
          isPassword
          affix={<Lock size={22} color={COLORS.BLUE_GRAY} />} 

          backgroundColor={COLORS.WHITE} />
        <InputComponent
          value={confirmPassword}
          placeholder='Nhập lại mật khẩu'
          onChange={val => setConfirmPassword(val)}
          allowClear
          isPassword
          affix={<Lock size={22} color={COLORS.BLUE_GRAY} />} 

          backgroundColor={COLORS.WHITE} />
        <ButtonComponent
          text='Lưu thay đổi'
          type='#00ADEF'
          styles = {{width: '80%'}}
          onPress={handleChangePassword} />
      </SectionComponent>

    </ContainerComponent>
  );
};

export default ChangePasswordSceen;
