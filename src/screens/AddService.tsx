import React, {useState} from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  ButtonComponent,
  ContainerComponent,
  HeaderComponent,
  InputComponent,
  KeyboardAvoidingViewWrapper,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import COLORS from '../assets/colors/Colors';
import IMAGES from '../assets/images/Images';

const initValues = {
  serviceName: 'Áo khoác dài',
  category: 'Giặt hấp > áo',
  image: null as string | null, // Change type to 'string | null'
  price: '',
  description: '',
};

const AddService = ({navigation}: any) => {
  const [values, setValues] = useState(initValues);

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
    formData.append('category', values.category);
    formData.append('price', values.price);
    formData.append('description', values.description);

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

  return (
    <ContainerComponent>
      <HeaderComponent
        title="Chi tiết dịch vụ"
        isBack
        onBack={() => navigation.goBack()}
      />

      <SectionComponent styles={{marginTop: 40}}>
        <TextComponent text="Tên Dịch vụ" color={COLORS.HEX_BLACK} size={15} />
        <InputComponent
          value={values.serviceName}
          onChange={text => setValues({...values, serviceName: text})}
          backgroundColor={COLORS.WHITE}
        />
        <TextComponent text="Danh mục" color={COLORS.HEX_BLACK} size={15} />
        <InputComponent
          value={values.category}
          onChange={text => setValues({...values, category: text})}
          backgroundColor={COLORS.WHITE}
        />
        <TextComponent text="Upload hình ảnh:" color={COLORS.HEX_BLACK} />

        {/* TouchableOpacity wraps the image or placeholder to trigger handleImagePick */}
        <TouchableOpacity onPress={handleImagePick}>
          {values.image ? (
            <Image source={{uri: values.image}} style={styles.image} />
          ) : (
            <Image source={IMAGES.Rectangle} />
          )}
        </TouchableOpacity>
        <SpaceComponent height={20} />
        <TextComponent text="Giá" color={COLORS.HEX_BLACK} size={15} />
        <RowComponent justify="space-between">
          <SectionComponent styles={{flex: 1}}>
            <InputComponent
              placeholder="0"
              value={values.price}
              onChange={text => setValues({...values, price: text})}
              backgroundColor={COLORS.WHITE}
            />
          </SectionComponent>
          <SectionComponent styles={{flex: 1}}>
            <InputComponent
              placeholder="KG"
              value={values.price}
              onChange={text => setValues({...values, price: text})}
              backgroundColor={COLORS.WHITE}
            />
          </SectionComponent>
        </RowComponent>
        <TextComponent text="Mô Tả:" color={COLORS.HEX_BLACK} size={15} />
        <InputComponent
          value={values.description}
          onChange={text => setValues({...values, description: text})}
          backgroundColor={COLORS.WHITE}
          multiline={true}
          numberOfLines={5}
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          styles={{marginTop: 20}}
          text="Lưu thay đổi"
          type="#00ADEF"
          onPress={handleUpload}
        />
      </SectionComponent>
    </ContainerComponent>
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
