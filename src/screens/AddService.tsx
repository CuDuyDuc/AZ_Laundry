import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
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
import serviceAPI from '../apis/serviceAPI';
import { service_type } from '../model/service_type';
import productTypeAPI from '../apis/product_typeAPI';
import { ProductTypeModel } from '../model/product_type';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';
import { appInfo } from '../apis/appInfo';

// const initValues = {
//     image: null as string | null,
//     serviceName: 'Áo khoác dài',
//     serviceType: '',
//     idServiceType: '',
//     productType: '',
//     price: '',
//     ShortDescription: '',
//     DetailedDescription: '',
// };
const initValues = {
    images: [] as { uri: string, type: string, name: string }[], // Sửa thành mảng chứa các đối tượng ảnh
    serviceName: 'Áo khoác dài',
    serviceType: '',
    idServiceType: '',
    idproductType: '',
    productType: '',
    price: '',
    ShortDescription: '',
    DetailedDescription: '',
};

interface type_spinner {
    label: string;
    value: string;
}
const AddService = ({ navigation }: any) => {
    const user = useSelector(authSelector);
    const [values, setValues] = useState(initValues);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [serviceTypeList, setServiceTypeList] = useState<service_type[]>();
    const [serviceTypeSpinner, setserviceTypeName] = useState<string | null>();
    const [productTypeList, setProductTypeList] = useState<ProductTypeModel[]>();
    const [loading, setLoading] = useState<boolean>(true);
    console.log(values);
    // console.log({productTypeList});
    // Function to open the image library and select images
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

    // Function to upload data and image to the API
    // const handleUpload = async () => {
    //     if (!values.image) {
    //         Alert.alert('Error', 'Please select an image before saving.');
    //         return;
    //     }
    //     // product_photo : downloadURLs,
    //     // product_name:data.product_name,
    //     // product_price:data.product_price,
    //     // id_user:data.id_user,
    //     // data_product:data.data_product,
    //     // product_description:data.product_description,
    //     // short_description:data.short_description,
    //     // id_product_type: data.id_product_type
    //     const formData = new FormData();
    //     // formData.append('product_name', values.serviceType);
    //     formData.append('product_name', values.productType);
    //     formData.append('product_price', values.price);
    //     formData.append('short_description', values.ShortDescription);
    //     formData.append('product_description', values.DetailedDescription);
    //     formData.append('id_user', user?.id);
    //     formData.append('id_product_type', values.productType);

    //     formData.append('image', {
    //         uri: values.image,
    //         type: 'image/jpg', 
    //         name: new Date() + 'product.jpg',
    //     });

    //     // images.forEach((image, index) => {
    //     //     formData.append('image', {
    //     //       uri: image.uri,
    //     //       type: image.type,
    //     //       name: image.fileName || `photo_${index}.jpg`
    //     //     });
    //     //   });
    //     try {
    //         const response = await fetch(`${appInfo.BASE_URL}/product/addProduct`, {
    //             method: 'POST',
    //             body: formData,
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         if (response.ok) {
    //             Alert.alert('Success', 'Data and image uploaded successfully.');
    //         } else {
    //             console.error('Error uploading:', response.status);
    //             Alert.alert('Error', 'An error occurred during the upload.');
    //         }
    //     } catch (error) {
    //         console.error('Upload Error:', error);
    //         Alert.alert('Error', 'Unable to upload image.');
    //     }
    // };
 // Function to upload data and images to the API
 const handleUpload = async () => {
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

        if (response.ok) {
            Alert.alert('Success', 'Data and images uploaded successfully.');
        } else {
            console.error('Error uploading:', response.status);
            Alert.alert('Error', 'An error occurred during the upload.');
        }
    } catch (error) {
        console.error('Upload Error:', error);
        Alert.alert('Error', 'Unable to upload images.');
    }
};

    const handleChangeValue = (key: string, value: string) => {
        const data: any = { ...values };
        data[`${key}`] = value;
        setValues(data);
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
    const getDataProductType = async (serviceType : string ) => {
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

    useEffect(() => {
        getDataService_Type();
        
    }, []);

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
                    onChange={ val =>  handleChangeValue('serviceName', val)}
                    allowClear
                    backgroundColor={COLORS.WHITE}
                />

                <TextComponent text="Loại Giặt" color={COLORS.HEX_BLACK} size={13} />
                <SpaceComponent height={10} />
                <SpinnerComponent
                isLoading= {loading}
                    items={transformedDataSpinner(serviceTypeList, 'service') ?? []}
                    placeholder="Loại Giặt: "
                    onValueChange={(values)  => {
                        // handleChangeValue('serviceType', values);
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
                    isLoading = {loading}
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