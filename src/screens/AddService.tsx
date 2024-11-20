import React, { useState } from 'react';
import { Alert, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import COLORS from '../assets/colors/Colors';
import IMAGES from '../assets/images/Images';
import {
  ButtonComponent,
  HeaderComponent,
  InputComponent,
  KeyboardAvoidingViewWrapper,
  PickerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  SpinnerComponent,
  TextComponent
} from '../components';
import { useRole } from '../permission/permission';
import { FONTFAMILY } from '../../assets/fonts';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';
import { useGetThirdPartyAPI } from '../hooks/useGetThirdPartyAPI';
import authenticationAPI from '../apis/authAPI';
import * as Burnt from "burnt";

const initValues = {
  image: null as string | null, // Change type to 'string | null'
  serviceName: 'Áo khoác dài',
  washing: '',
  productType: '',
  price: '',
  ShortDescription: '',
  DetailedDescription: '',
};

const AddService = ({ navigation }: any) => {
  const user = useSelector(authSelector)
  const [values, setValues] = useState(initValues);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const { isShop, isAdmin } = useRole();
  const [value, setValue] = useState('')
  const [note, setNote] = useState('')
  const [specificAddress, setSpecificAddress] = useState('')
  const { valueLocation: provinceData } = useGetThirdPartyAPI(1, 0);
  const [selectedValueProvince, setSelectedValueProvince] = useState<any>({});
  const [files, setFiles] = useState<{ uri: string | undefined; type: string | undefined; name: string | undefined; }[]>([]);
  const { valueLocation: districtData } = useGetThirdPartyAPI(
    2,
    selectedValueProvince?.id,
  );
  const [selectedValueDistrict, setSelectedValueDistrict] = useState<any>({});
  const { valueLocation: wardData } = useGetThirdPartyAPI(
    3,
    selectedValueDistrict?.id,
  );
  const [selectedValueWard, setSelectedValueWard] = useState<any>({});
  const HandleGetProvince = (data: any) => {
    setSelectedValueProvince(data);
  };
  const HandleGetDistrict = (data: any) => {
    setSelectedValueDistrict(data);
  };
  const HandleGetWard = (data: any) => {
    setSelectedValueWard(data);
  };

  const handleAddFile = async (type: string) => {
    try {
      const options = {
        mediaType: type as 'photo',
        selectionLimit: 1,
      };

      const result = await launchImageLibrary(options);

      if (result.assets && result.assets.length > 0) {
        const newFile = {
          uri: result.assets[0].uri,
          type: result.assets[0].type,
          name: result.assets[0].fileName,
        };

        setFiles((prevFiles) => [...prevFiles, newFile]);
      }
    } catch (error) {
      console.log('Error adding file:', error);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };


  // Function to open the image library and select an image
  const handleImagePick = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('Image Picker Error: ', result.errorCode);
      } else if (result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri ?? null; // Provide a fallback for 'undefined'
        setValues({ ...values, image: imageUri });
      } else {
        console.log('No assets found');
        Alert.alert('Error', 'No image selected, please try again.');
      }
    } catch (error) {
      console.error('Error picking image: ', error);
      Alert.alert('Error', 'An error occurred while picking the image.');
    }
  };

  // Function to upload data and image to the API
  const handleUpload = async () => {
    if (!values.image) {
      Alert.alert('Error', 'Please select an image before saving.');
      return;
    }
    const formData = new FormData();
    formData.append('serviceName', values.serviceName);
    formData.append('washing', values.washing);
    formData.append('productType', values.productType);
    formData.append('price', values.price);
    formData.append('ShortDescription', values.ShortDescription);
    formData.append('DetailedDescription', values.DetailedDescription);

    formData.append('image', {
      uri: values.image,
      type: 'image/jpeg', 
      name: 'upload.jpg',
    });

    try {
      const response = await fetch('API_UPLOAD_URL', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        Alert.alert('Success', 'Data and image uploaded successfully.');
      } else {
        console.error('Error uploading:', response.status);
        Alert.alert('Error', 'An error occurred during the upload.');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      Alert.alert('Error', 'Unable to upload image.');
    }
  };

  const handleChangeValue = (key: string, value: string) => {
    const data: any = { ...values };
    data[`${key}`] = value;
    setValues(data);
  };

  const HandleAddShop = async () => {
    const address = `${specificAddress}, ${selectedValueWard?.full_name}, ${selectedValueDistrict?.full_name}, ${selectedValueProvince?.full_name}`
    try {
      const respones = await authenticationAPI.HandleAuthentication('/create-user', {
        
        address: address
      }, 'post')
      if (respones) {
        Burnt.toast({
          title: "Thêm thành công",

        });
      } else {
        console.log('Sai dòng 118')
      }
      navigation.navigate('AddressSelectionScreen')
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <KeyboardAvoidingViewWrapper>
      {isShop ? (
        <>
          <HeaderComponent
            title="Thêm dịch vụ"
            isBack
            onBack={() => navigation.goBack()}
          />
          <SectionComponent
            styles={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TextComponent
              text="Upload Hình Ảnh"
              color={COLORS.HEX_BLACK}
              size={15}
            />
            <SpaceComponent height={5} />
            <TouchableOpacity onPress={handleImagePick}>
              {values.image ? (
                <Image source={{ uri: values.image }} style={styles.image} />
              ) : (
                <Image source={IMAGES.ImgShop1} style={styles.image} />
              )}
            </TouchableOpacity>
          </SectionComponent>
          <SectionComponent>
            <TextComponent text="Tên Dịch vụ" color={COLORS.HEX_BLACK} size={13} />
            <SpaceComponent height={10} />
            <InputComponent
              value={values.serviceName}
              onChange={val => handleChangeValue('serviceName', val)}
              allowClear
              backgroundColor={COLORS.WHITE}
            />

            <TextComponent text="Loại Giặt" color={COLORS.HEX_BLACK} size={13} />
            <SpaceComponent height={10} />
            <SpinnerComponent
              items={[
                { label: 'Giặt Hấp', value: 'giat_hap' },
                { label: 'Giặt Sấy', value: 'giat_say' },
                { label: 'Giặt Khô', value: 'giat_kho' },
              ]}
              placeholder="Loại Giặt: "
              onValueChange={values => console.log(values)}
            />
          </SectionComponent>

          <SectionComponent>
            <TextComponent
              text="Loại sản phẩm"
              color={COLORS.HEX_BLACK}
              size={13}
            />
            <SpaceComponent height={10} />
            <SpinnerComponent
              items={[
                { label: 'áo', value: 'ao' },
                { label: 'Quần', value: 'quan' },
                { label: 'Giày dép', value: 'giay_dep' },
              ]}
              placeholder="Loại Sản Phẩm: "
              onValueChange={values => console.log(values)}
            />
          </SectionComponent>

          <SectionComponent>
            <TextComponent text="Giá" color={COLORS.HEX_BLACK} size={13} />
            <InputComponent
              placeholder="10000VNd"
              value={values.price}
              onChange={val => handleChangeValue("price", val)}
              backgroundColor={COLORS.WHITE}
            />
            <TextComponent text="Mô tả ngắn" color={COLORS.HEX_BLACK} size={13} />
            <InputComponent
              value={values.ShortDescription}
              onChange={val => handleChangeValue("ShortDescription", val)}
              backgroundColor={COLORS.WHITE}
              multiline={true}
              numberOfLines={2}
            />
            <TextComponent
              text="Mô tả chi tiết"
              color={COLORS.HEX_BLACK}
              size={13}
            />
            <TextInput
              value={values.DetailedDescription}
              onChangeText={val => handleChangeValue('DetailedDescription', val)}
              style={{
                backgroundColor: COLORS.WHITE,
                textAlignVertical: 'top',
                paddingHorizontal: 20,
                paddingTop: 10,
                paddingBottom: 0,
                borderRadius: 16,
              }}
              multiline={true}
              numberOfLines={6} />
          </SectionComponent>
          <SectionComponent>
            <ButtonComponent
              text="Thêm dịch vụ"
              type="#00ADEF"
              onPress={handleUpload}
            />
          </SectionComponent>
        </>
      ) : isAdmin ? (
        <>
          <KeyboardAvoidingViewWrapper>
            <HeaderComponent
              title="Tạo Shop"
              isBack
              onBack={() => navigation.goBack()}
            />
            <SectionComponent styles={{ marginTop: 20 }}>
              <RowComponent>
                <ButtonComponent
                  text="Thêm hình ảnh"
                  icon={<Image source={IMAGES.camera_alt} style={{ width: 20, height: 20 }} />}
                  iconFlex="left"
                  type="#00ADEF"
                  textColor={COLORS.AZURE_BLUE}
                  textStyles={{ fontFamily: FONTFAMILY.montserrat_medium }}
                  styles={{
                    width: "49%",
                    backgroundColor: COLORS.HEX_GRAY,
                    borderColor: COLORS.AZURE_BLUE,
                    borderWidth: 1,
                    borderRadius: 1,
                  }}
                  onPress={() => handleAddFile('photo')}
                />
                <ButtonComponent
                  text="Thêm baner"
                  icon={<Image source={IMAGES.camera_alt} style={{ width: 20, height: 20 }} />}
                  iconFlex="left"
                  type="#00ADEF"
                  textColor={COLORS.AZURE_BLUE}
                  textStyles={{ fontFamily: FONTFAMILY.montserrat_medium }}
                  styles={{
                    width: "49%",
                    marginLeft: 5,
                    backgroundColor: COLORS.HEX_GRAY,
                    borderColor: COLORS.AZURE_BLUE,
                    borderWidth: 1,
                    borderRadius: 1
                  }}
                  onPress={() => handleAddFile('photo')}
                />
              </RowComponent>

              <RowComponent styles={{ marginTop: 10, flexWrap: 'wrap' }}>
                {files.map((file, index) => (
                  <View key={index} style={{ margin: 5 }}>
                    <TouchableOpacity onPress={() => handleRemoveFile(index)} style={{ position: 'relative' }}>
                      <Image
                        source={{ uri: file.uri }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: COLORS.GRAY,
                        }}
                      />
                      <View style={{
                        position: 'absolute',
                        top: -5,
                        right: -5,
                        backgroundColor: COLORS.RED,
                        borderRadius: 15,
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <TextComponent
                          text="X"
                          color={COLORS.WHITE}
                          size={12}
                          font={FONTFAMILY.montserrat_bold}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </RowComponent>
            </SectionComponent>
            <SectionComponent>
              <TextComponent
                text={'Tên Shop'}
                color={COLORS.HEX_BLACK}
                size={14}
                font={FONTFAMILY.montserrat_bold} />
              <InputComponent
                value={value}
                onChange={setValue}
                backgroundColor={COLORS.WHITE}
                allowClear />
              <TextComponent
                text={'Email'}
                color={COLORS.HEX_BLACK}
                size={14}
                font={FONTFAMILY.montserrat_bold} />
              <InputComponent
                value={value}
                onChange={setValue}
                backgroundColor={COLORS.WHITE}
                allowClear />
              <TextComponent
                text={'Password'}
                color={COLORS.HEX_BLACK}
                size={14}
                font={FONTFAMILY.montserrat_bold} />
              <InputComponent
                value={value}
                onChange={setValue}
                backgroundColor={COLORS.WHITE}
                isPassword />
              <TextComponent
                text={'Mô tả Shop'}
                color={COLORS.HEX_BLACK}
                size={14}
                font={FONTFAMILY.montserrat_bold} />
              <TextInput
                placeholder='Nhập mô tả'
                placeholderTextColor={COLORS.HEX_LIGHT_GREY}
                value={note}
                onChangeText={setNote}
                multiline={true}
                numberOfLines={8}
                style={{
                  backgroundColor: COLORS.WHITE,
                  textAlignVertical: 'top',
                  paddingHorizontal: 20,
                  paddingTop: 10,
                  paddingBottom: 0,
                  borderRadius: 16,
                  color: COLORS.HEX_BLACK,
                }} />
              <TextComponent
                text={'Tỉnh / TP'}
                color={COLORS.HEX_BLACK}
                size={14}
                font={FONTFAMILY.montserrat_bold} />
              <PickerComponent
                dataLocation={provinceData}
                onDataLocation={HandleGetProvince} />
            </SectionComponent>
            <SectionComponent>
              <TextComponent
                text={'Quận / Huyện'}
                color={COLORS.HEX_BLACK}
                size={14}
                font={FONTFAMILY.montserrat_bold} />
              <PickerComponent
                dataLocation={districtData}
                onDataLocation={HandleGetDistrict} />
            </SectionComponent>
            <SectionComponent>
              <TextComponent
                text={'Phường / Xã'}
                color={COLORS.HEX_BLACK}
                size={14}
                font={FONTFAMILY.montserrat_bold} />
              <PickerComponent
                dataLocation={wardData}
                onDataLocation={HandleGetWard} />
            </SectionComponent>
            <SectionComponent>
              <TextComponent
                text={'Địa chỉ cụ thể'}
                color={COLORS.HEX_BLACK}
                size={14}
                font={FONTFAMILY.montserrat_bold} />
              <InputComponent
                placeholder='102 Hoài Thanh'
                allowClear
                value={specificAddress}
                backgroundColor={COLORS.WHITE}
                onChange={val => setSpecificAddress(val)} />
            </SectionComponent>
            <SectionComponent>
              <ButtonComponent 
                type='#00ADEF'
                text='Tạo Shop'
              />
            </SectionComponent>
          </KeyboardAvoidingViewWrapper>
        </>
      ) : null}
    </KeyboardAvoidingViewWrapper>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default AddService;
