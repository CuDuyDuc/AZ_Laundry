import React, { useState } from 'react';
import { Alert, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import COLORS from '../assets/colors/Colors';
import IMAGES from '../assets/images/Images';
import {
  ButtonComponent,
  HeaderComponent,
  InputComponent,
  KeyboardAvoidingViewWrapper,
  SectionComponent,
  SpaceComponent,
  SpinnerComponent,
  TextComponent
} from '../components';

const initValues = {
  image: null as string | null, // Change type to 'string | null'
  serviceName: 'Áo khoác dài',
  washing: '',
  productType: '',
  price: '',
  ShortDescription: '',
  DetailedDescription: '',
};

const AddService = ({navigation}: any) => {
  const [values, setValues] = useState(initValues);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

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
        setValues({...values, image: imageUri});
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
      type: 'image/jpeg', // or 'image/png' depending on the selected image format
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
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };

  return (
    <KeyboardAvoidingViewWrapper>
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
            <Image source={{uri: values.image}} style={styles.image} />
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
            {label: 'Giặt Hấp', value: 'giat_hap'},
            {label: 'Giặt Sấy', value: 'giat_say'},
            {label: 'Giặt Khô', value: 'giat_kho'},
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
            {label: 'áo', value: 'ao'},
            {label: 'Quần', value: 'quan'},
            {label: 'Giày dép', value: 'giay_dep'},
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
          style = {{
            backgroundColor: COLORS.WHITE, 
            textAlignVertical: 'top',
            paddingHorizontal: 20,
            paddingTop: 10, 
            paddingBottom: 0, 
            borderRadius: 16,}}
            multiline={true}
            numberOfLines={6}/>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="Thêm dịch vụ"
          type="#00ADEF"
          onPress={handleUpload}
        />
      </SectionComponent>
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
