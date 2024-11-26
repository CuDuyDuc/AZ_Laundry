import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import COLORS from '../assets/colors/Colors';
import IMAGES from '../assets/images/Images';
import {
  ButtonComponent,
  HeaderComponent,
  InputComponent,
  KeyboardAvoidingViewWrapper,
  SectionComponent,
  PickerComponent,
  RowComponent,
  SpaceComponent,
  SpinnerComponent,
  TextComponent
} from '../components';
import { useRole } from '../permission/permission';
import serviceAPI from '../apis/serviceAPI';
import { service_type } from '../model/service_type';
import productTypeAPI from '../apis/product_typeAPI';
import { ProductTypeModel } from '../model/product_type';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';
import { appInfo } from '../apis/appInfo';
import { useGetThirdPartyAPI } from '../hooks/useGetThirdPartyAPI';
import * as Burnt from "burnt";
import authenticationAPI from '../apis/authAPI';
import { FONTFAMILY } from '../../assets/fonts';
import NotificationService from './notification/service/NotificationService';
import { ObjectId } from 'mongoose';
import { log } from 'console';

const initValues = {
  images: [] as { uri: string, type: string, name: string }[],
  serviceName: '',
  serviceType: '',
  idServiceType: '',
  idproductType: '',
  productType: '',
  price: '',
  ShortDescription: '',
  DetailedDescription: '',
};

interface FormState {
  fullName: string;
  nameShop: string;
  emailShop: string;
  passwordShop: string;
  specificAddress: string;
}


interface type_spinner {
  label: string;
  value: string;
}
const AddService = ({ navigation }: any) => {
  const user = useSelector(authSelector);
  const [values, setValues] = useState(initValues);
  const [serviceTypeList, setServiceTypeList] = useState<service_type[]>();
  const [productTypeList, setProductTypeList] = useState<ProductTypeModel[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const [formState, setFormState] = useState<FormState>({
    fullName: '',
    nameShop: '',
    emailShop: '',
    passwordShop: '',
    specificAddress: '',
  });

  const { isShop, isAdmin } = useRole();
  const { valueLocation: provinceData } = useGetThirdPartyAPI(1, 0);
  const [selectedValueProvince, setSelectedValueProvince] = useState<any>({});
  const [thumbnails, setThumbnails] = useState<{ uri: string | undefined; type: string | undefined; name: string | undefined; }[]>([]);
  const [shopBanner, setShopBanner] = useState<{ uri: string | undefined; type: string | undefined; name: string | undefined; }[]>([]);
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

  const handleAddFile = async (type: string, check: number) => {
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

        if (check === 1) {
          setThumbnails((prevFiles) => [...prevFiles, newFile]);
          newFile={uri:'',type:'',name:'',}
        } else {
          setShopBanner((prevFiles) => [...prevFiles, newFile]);
          newFile={uri:'',type:'',name:'',}


        }

      }
    } catch (error) {
      console.log('Error adding file:', error);
    }
  };

  const handleRemoveFile = (index: number, check: number) => {
    if (check === 1) {
      setThumbnails((prevFiles) => prevFiles.filter((_, i) => i !== index));
    } else {
      setShopBanner((prevFiles) => prevFiles.filter((_, i) => i !== index));

    }
  };

  const handleImagePick = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 5,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('Image Picker Error: ', result.errorCode);
      } else if (result.assets && result.assets.length > 0) {
        const images = result.assets.map(asset => ({
          uri: asset.uri ?? '',
          type: asset.type ?? 'image/jpg',
          name: asset.fileName ?? `${new Date().toISOString()}.jpg`,
        }));
        setValues({ ...values, images });
      } else {
        console.log('No assets found');
        Alert.alert('Error', 'No image selected, please try again.');
      }
    } catch (error) {
      console.error('Error picking images: ', error);
      Alert.alert('Error', 'An error occurred while picking the images.');
    }
  };

  const handleUpload = async () => {
    setLoadingButton(true);
    if (values?.images?.length === 0) {
      Alert.alert('Error', 'Please select images before saving.');
      return;
    }

    const formData = new FormData();
    formData.append('product_name', values.productType);
    formData.append('product_price', values.price);
    formData.append('short_description', values.ShortDescription);
    formData.append('product_description', values.DetailedDescription);
    formData.append('id_user', user?.id);
    formData.append('id_product_type', values.productType);

    values.images.forEach((image, index) => {
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
    });

    try {
      const response = await fetch(`${appInfo.BASE_URL}/product/addProduct`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Data and images uploaded successfully.');
        setLoadingButton(false);
        console.log({ dataPRODUCTADDED: data });
        NotificationService.sendNotificationToServer({
          title: "Dịch vụ mới",
          body: `Shop ${user?.fullname} vừa thêm dịch vụ!💎💎`,
          sender: user?.id,
          userId: '670cdc31290fa9791067df19' as unknown as ObjectId,
          object_type_id: data?.data?._id,
          notification_type: "product",
        })
      } else {
        console.error('Error uploading:', response.status);
        setLoadingButton(false);
        Alert.alert('Error', 'An error occurred during the upload.');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      setLoadingButton(false);
      Alert.alert('Error', 'Unable to upload images.');
    }
  };

  const handleChangeValue = (key: string, value: string) => {
    const data: any = { ...values };
    data[`${key}`] = value;
    setValues(data);
  };

  const updateField = (key: keyof FormState, value: string | number | object | any[]) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  const getDataService_Type = async () => {
    try {
      const res = await serviceAPI.HandleService('/get-service-type');
      setServiceTypeList(() => res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching service types:', error);
      setLoading(false);
    }
  };
  const getDataProductType = async (serviceType: string) => {
    try {
      const res = await productTypeAPI.HandleProductType(`/get-product-type?id_service_type=${serviceType}`);
      const dataProduct: ProductTypeModel[] = res.data;
      setProductTypeList(dataProduct);
      setLoading(false);

    } catch (error) {
      console.log('Error fetching service types: ', error);
      setLoading(false);
    }
  };
  const transformedDataSpinner = (data: any, type: string): type_spinner[] | undefined => {
    return data?.map((item: any) => ({
      label: type === 'service' ? item?.service_type_name : item?.product_type_name,
      value: item?._id
    }));
  };

  const HandleAddShop = async () => {
    // Kiểm tra các trường bắt buộc
    if (!formState.nameShop || !formState.emailShop || !formState.passwordShop) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ các trường bắt buộc.');
      return;
    }
    // Kiểm tra địa chỉ để đảm bảo tất cả các phần được chọn
    const address = `${formState.specificAddress}, ${selectedValueWard?.full_name ?? ''}, ${selectedValueDistrict?.full_name ?? ''}, ${selectedValueProvince?.full_name ?? ''}`;
    const formData = new FormData();
    formData.append('fullname', formState.fullName);
    formData.append('email', formState.emailShop);
    formData.append('password', formState.passwordShop);
    formData.append('address', address);
    formData.append('shop_name', formState.nameShop);
    thumbnails.forEach((file) => {
      formData.append(`thumbnail`, {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });
    });
    shopBanner.forEach((file) => {
      formData.append(`shop_banner`, {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });
    });
    console.log(shopBanner)
    console.log(thumbnails)

    try {
      setLoadingButton(true);
      const response = await authenticationAPI.HandleAuthentication('/create-user', formData, 'post');
      setLoadingButton(false);
      if (response) {
        Burnt.toast({
          title: 'Thành công!',
          message: 'Shop đã được thêm.',
        });
        navigation.goBack();
        setFormState({
          fullName: '',
          nameShop: '',
          emailShop: '',
          passwordShop: '',
          specificAddress: '',
        });
      } else {
        Burnt.toast({
          title: 'Thất bại!',
          message: response,
        });
      }
    } catch (error: any) {
      // Đảm bảo loading được tắt khi có lỗi
      setLoadingButton(false);
      const errorMessage = error?.message || error?.response?.data?.message || 'Không thể thêm shop.';
      Burnt.toast({
        title: 'Lỗi!',
        message: errorMessage,
      });
    }
  };

  useEffect(() => {
    getDataService_Type();
  }, []);

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
              {values?.images[0]?.uri ? (
                <Image source={{ uri: values?.images[0]?.uri }} style={styles.image} />
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
              isLoading={loading}
              items={transformedDataSpinner(serviceTypeList, 'service') ?? []}
              placeholder="Loại Giặt: "
              onValueChange={(values) => {
                getDataProductType(values);
              }}
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
              isLoading={loading}
              items={transformedDataSpinner(productTypeList, 'product') ?? []}
              placeholder="Loại Sản Phẩm: "
              onValueChange={values => handleChangeValue('productType', values)}
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
            <TextComponent text="Mô Tả ngắn" color={COLORS.HEX_BLACK} size={13} />
            <InputComponent
              value={values.ShortDescription}
              onChange={val => handleChangeValue("ShortDescription", val)}
              backgroundColor={COLORS.WHITE}
              multiline={true}
              numberOfLines={2}
            />
            <TextComponent
              text="Mô Tả chi tiết"
              color={COLORS.HEX_BLACK}
              size={13}
            />
            <InputComponent
              value={values.DetailedDescription}
              onChange={val => handleChangeValue('DetailedDescription', val)}
              allowClear
              backgroundColor={COLORS.WHITE}
              multiline={true}
              numberOfLines={6}
            />
          </SectionComponent>
          <SectionComponent>
            {loadingButton ? <ActivityIndicator size={30} /> : <ButtonComponent
              text="Thêm dịch vụ"
              type="#00ADEF"
              onPress={handleUpload}
            />}
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
            <SectionComponent styles={{ marginTop: 20, alignItems: 'center' }}>
              <TextComponent
                text={'Ảnh đại diện'}
                color={COLORS.HEX_BLACK}
                size={14}
                font={FONTFAMILY.montserrat_bold} 
                styles={{marginBottom: 3}}/>
              <TouchableOpacity onPress={() => handleAddFile('photo', 0)}>
                {shopBanner[0]?.uri ? (
                  <Image source={{ uri: shopBanner[0]?.uri }} style={styles.image} />
                ) : (
                  <Image source={IMAGES.ImgShop1} style={[styles.image]} />
                )}
              </TouchableOpacity>
            </SectionComponent>
            <SectionComponent styles={{alignItems:'center'}}>
              <TextComponent
                text={'Ảnh bìa'}
                color={COLORS.HEX_BLACK}
                size={14}
                font={FONTFAMILY.montserrat_bold} 
                styles={{marginBottom: 3}}/>
              <TouchableOpacity onPress={() => handleAddFile('photo', 1)}>
                {thumbnails[0]?.uri ? (
                  <Image source={{ uri: thumbnails[0]?.uri }} style={styles.image1} />
                ) : (
                  <Image source={IMAGES.AnhBia} style={styles.image1} />
                )}
              </TouchableOpacity>
            </SectionComponent>
            <SectionComponent>
              <TextComponent
                text={'Tên người đại diện'}
                color={COLORS.HEX_BLACK}
                size={14}
                font={FONTFAMILY.montserrat_bold} />
              <InputComponent
                value={formState.fullName}
                onChange={(value) => updateField('fullName', value)}
                backgroundColor={COLORS.WHITE}
                allowClear />

              <TextComponent
                text={'Tên cửa hàng'}
                color={COLORS.HEX_BLACK}
                size={14}
                font={FONTFAMILY.montserrat_bold} />
              <InputComponent
                value={formState.nameShop}
                onChange={(value) => updateField('nameShop', value)}
                backgroundColor={COLORS.WHITE}
                allowClear />
              <TextComponent
                text={'Email'}
                color={COLORS.HEX_BLACK}
                size={14}
                font={FONTFAMILY.montserrat_bold} />
              <InputComponent
                value={formState.emailShop}
                onChange={(value) => updateField('emailShop', value)}
                backgroundColor={COLORS.WHITE}
                allowClear />
              <TextComponent
                text={'Password'}
                color={COLORS.HEX_BLACK}
                size={14}
                font={FONTFAMILY.montserrat_bold} />
              <InputComponent
                value={formState.passwordShop}
                onChange={(value) => updateField('passwordShop', value)}
                backgroundColor={COLORS.WHITE}
                isPassword />
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
                value={formState.specificAddress}
                backgroundColor={COLORS.WHITE}
                onChange={(val) => updateField('specificAddress', val)} />
            </SectionComponent>
            <SectionComponent>
              {loadingButton ? <ActivityIndicator size={30} /> : <ButtonComponent
                text="Tạo Cửa Hàng"
                type="#00ADEF"
                onPress={HandleAddShop}
              />}
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
  image1: {
    width: 400,
    height: 100,
    borderRadius: 16
  },
});

export default AddService;