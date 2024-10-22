import { Notification } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { useDispatch, useSelector } from 'react-redux';
import { FONTFAMILY } from '../../../assets/fonts';
import serviceAPI from '../../apis/serviceAPI';
import COLORS from '../../assets/colors/Colors';
import IMAGES from '../../assets/images/Images';
import {
    CardServiceComponent,
    CardShopComponent,
    CardTipCompnent,
    ContainerComponent,
    RowComponent,
    SectionComponent,
    SwipeComponent,
    TextComponent
} from '../../components';
import { service_type } from '../../model/service_type';
import { useRole } from '../../permission/permission';
import { authSelector } from '../../redux/reducers/authReducer';

type Coordinates = {
    latitude: number | null;
    longitude: number | null;
};

const HomeScreen = ({ route, navigation }: any) => {
    const dispatch = useDispatch();
    const user = useSelector(authSelector);
    const [currentLocation, setCurrentLocation] = useState<Coordinates>({
        latitude: null,
        longitude: null,
    });
    const [typeService, setTypeService] = useState<service_type[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getDataService_Type = async () => {
        try {
            const res = await serviceAPI.HandleService('/get-service-type');
            const data: service_type[] = await res.data;
            setTypeService(data);
            setLoading(false);
        } catch (error) {
            console.log('Error fetching service types: ', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDataService_Type();
    }, []);
    const { isUser, isShop, isAdmin } = useRole();
    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Permission to access location',
                    message: 'We need access to your location for the app to work',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
            const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            return result === RESULTS.GRANTED;
        }
    };

    const getCurrentLocation = async () => {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
            Alert.alert(
                'Permission Denied',
                'We need location permission to proceed.',
            );
            return;
        }
        Geolocation.getCurrentPosition(
            (position: any) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
            },
            error => {
                console.log(error);
                Alert.alert('Error', 'Unable to retrieve your location.');
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    };
    useEffect(() => {
        getCurrentLocation();
    }, [user]);
    const handleServiceType=(item:any)=>{
        navigation.navigate('ProductType', {data:item})
    }
    const handleDetailShop=(item:any)=>{
        navigation.navigate('DetailsShop', {data:item})

    }

    return (
        <ContainerComponent styleBackground={{ backgroundColor: COLORS.WHISPER_GRAY }} isScroll>
            <SectionComponent
                styles={{
                    height: 83,
                    backgroundColor: COLORS.AZURE_BLUE,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderBottomRightRadius: 16,
                    borderBottomLeftRadius:16
                }}>
                <RowComponent styles={{ marginTop: 35 }} justify="space-between">
                    <TextComponent
                        text={`Hi, ${user.fullname}!`}
                        font={FONTFAMILY.montserrat_medium}
                    />
                    <TouchableOpacity>
                        <Notification size="30" color={COLORS.WHITE} />
                    </TouchableOpacity>
                </RowComponent>
            </SectionComponent>
            <SectionComponent
                styles={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, height: 185 }}>
                <SwipeComponent />
            </SectionComponent>
            <SectionComponent styles={{ marginTop: -30 }}>
                <RowComponent justify='space-between'>
                    <RowComponent styles={{ backgroundColor: COLORS.WHITE, borderRadius: 16 , padding: 10}}>
                        <Image source={IMAGES.DanhMuc} style={{ width: 20, height: 20 }} />
                        <TextComponent text={" Danh mục"} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} size={15}/>
                    </RowComponent>
                    <TextComponent text={"Xem tất cả"} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} size={15}/>
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <CardServiceComponent  data={typeService} isLoading={loading} onPress={handleServiceType} />
            </SectionComponent>
            <SectionComponent styles={{ marginTop: -20 }}>
                <TextComponent text={"Mách mẹo vặt"} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} size={15}/>
            </SectionComponent>
            <SectionComponent>
                <CardTipCompnent />
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='space-between'>
                    <TextComponent text={"Cửa hàng nổi bật"} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} size={15}/>
                    <TouchableOpacity onPress={()=>navigation.navigate('AllStores',{latitude:currentLocation.latitude,longitude:currentLocation.longitude})}>
                        <TextComponent text={"Xem thêm"} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} size={15}/>
                    </TouchableOpacity>
                </RowComponent>
            </SectionComponent>
            <SectionComponent styles = {{marginTop: -20}}>
                <CardShopComponent onPress={handleDetailShop} limit={3} currentLatitude={currentLocation.latitude} currentLongitude={currentLocation.longitude} />
            </SectionComponent>
        </ContainerComponent>
    );
};

export default HomeScreen;