import { Camera } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import COLORS from '../../assets/colors/Colors';
import { ButtonComponent, ContainerComponent, HeaderComponent, InputComponent, RowComponent, SectionComponent } from '../../components';
import { authSelector } from '../../redux/reducers/authReducer';
import authenticationAPI from '../../apis/authAPI';
import * as Burnt from "burnt";
import { launchImageLibrary } from 'react-native-image-picker';
import { useRole } from '../../permission/permission';
import { Validate } from '../../utils/validate';
var EventEmitter = require('eventemitter3');
export const eventEmitterUpdateInfo = new EventEmitter();
const InfoScreen = ({ navigation }: any) => {
  const user = useSelector(authSelector);
  const { isShop } = useRole();

  const [fullname, setFullname] = useState(user?.fullname || '');
  const [address, setAddress] = useState(user?.address || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [photo, setPhoto] = useState(user?.photo || '');
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<{ uri: string | undefined; type: string | undefined; name: string | undefined; }[]>([])

  const handleImagePick = async (type: string) => {
    try {
      const options = {
        mediaType: type as 'photo',
        selectionLimit: 1,
      };

      const result = await launchImageLibrary(options);

      if (result.assets && result.assets.length > 0) {
        let newFile = {
          uri: result.assets[0].uri,
          type: result.assets[0].type,
          name: result.assets[0].fileName,
        };
        const image = [...images, newFile];
        setImages(image);
        newFile = { uri: '', type: '', name: '', }

      }
    } catch (error) {
      console.log('Error adding file:', error);
    }
  };
  const getUserById = async (id_user: string) => {

    try {
      const req: any = await authenticationAPI.HandleAuthentication(`/get-user-by-id?id_user=${id_user}`);
      const data = await req[0];

      if (data) {
        setAddress(data?.address);
        setPhone(data?.phone_number);
        setPhoto(data?.photo);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserById(user?.id);
  }, [])

  const handleChangeInfo = async () => {

    if (!phone || !address) {
      return Burnt.toast({
        title: 'Địa chỉ hoặc số điện thoại không được để trống!'
      });
    }
    if (!Validate.Phone(phone)) {
      Burnt.toast({
        title: "Số điện thoại không hợp lệ! Số điện thoại phải đủ 10 số và bắt đầu bằng 0.",
      });
    }
    if (images?.length === 0) {
      Alert.alert('Error', 'Please select images before saving.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', user?.id);
    formData.append('address', address);
    formData.append('phone_number', phone);

    images.forEach((image, index) => {
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
    });
    try {
      setLoading(true);
      if (formData) {
        const response = await authenticationAPI.HandleAuthentication(`/update-info`, formData, 'patch');
        if (response) {
          Alert.alert('Success', 'Data and images uploaded successfully.');
          getUserById(user?.id);
          setLoading(false);
          eventEmitterUpdateInfo.emit('updateInfo');
        } else {
          Alert.alert('Error', 'An error occurred during the upload.');
          setLoading(false);
        }
      }else{
        console.log('không có formdataa');
        Burnt.toast({
          title: 'Vui lòng nhập đầy đủ dữ liệu!'
        });
      }
    } catch (error) {
      console.error('Upload Error:', error);
      Alert.alert('Error', 'Unable to upload images.');
      setLoading(false);
    }
  }

  return (
    <ContainerComponent>
      <HeaderComponent title='Thông tin cá nhân' isBack onBack={() => navigation.goBack()} />
      <SectionComponent>
        <RowComponent justify={'center'} styles={{ padding: 20 }} onPress={() => { }}>
          <SectionComponent>
            <TouchableOpacity onPress={() => handleImagePick('photo')}>

              {images[0]?.uri ? (
                <Image source={{ uri: images[0]?.uri }} style={{
                  borderRadius: 40,
                  width: 80,
                  height: 80,
                }} />
              ) : photo ? (
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                  }}
                  source={{ uri: photo }} />
              ) : (
                <Image
                  style={{
                    borderRadius: 40,
                    width: 80,
                    height: 80,
                  }}
                  source={{
                    uri: 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png',
                  }} />
              )}
            </TouchableOpacity>

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
          value={fullname || ''}
          placeholder='Họ và tên'
          onChange={val => setFullname(val)}
          editKeyboard={true}
          backgroundColor={COLORS.WHITE} />
        <InputComponent
          value={address || ''}
          placeholder='Địa chỉ'
          onChange={val => setAddress(val)}
          allowClear={isShop ? false : true}
          editKeyboard={isShop ? true : false}
          backgroundColor={COLORS.WHITE} />
        <InputComponent
          value={phone || ''}
          placeholder='Phone'
          onChange={val => setPhone(val)}
          allowClear
          backgroundColor={COLORS.WHITE} />
      </SectionComponent>
      <SectionComponent styles={{ alignItems: 'center' }}>
        {loading ? (<ActivityIndicator size={30} />) : (<ButtonComponent
          text='Lưu thay đổi'
          type='#00ADEF'
          styles={{ width: '80%' }}
          onPress={handleChangeInfo} />)}
      </SectionComponent>
    </ContainerComponent>
  );
};

export default InfoScreen;
