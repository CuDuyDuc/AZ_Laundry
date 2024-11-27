import { Notification } from 'iconsax-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, PermissionsAndroid, Platform, TouchableOpacity, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { useSelector } from 'react-redux';
import { FONTFAMILY } from '../../../assets/fonts';
import serviceAPI from '../../apis/serviceAPI';
import COLORS from '../../assets/colors/Colors';
import IMAGES from '../../assets/images/Images';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

import {
    BottomSheetComponent,
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
import { authSelector } from '../../redux/reducers/authReducer';
import { TipModel } from '../../model/tip_model';
import Firebase from '../../configs/firebaseConfig';
import { eventEmitter } from '../../../index.js';
import notificationAPI from '../../apis/notificationApi.ts';
import { eventEmitterUpdateRead } from '../../components/NotificationItem.tsx';
import authenticationAPI from '../../apis/authAPI';
import * as Burnt from "burnt";
import { navigate } from '../../navigators/service/RootNavigation.ts';
type Coordinates = {
    latitude: number | null;
    longitude: number | null;
};

const HomeScreen = ({ route, navigation }: any) => {

    const user = useSelector(authSelector);
    const [currentLocation, setCurrentLocation] = useState<Coordinates>({
        latitude: null,
        longitude: null,
    });
    const [typeService, setTypeService] = useState<service_type[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [countUnread, setCountUnread] = useState<string>('0');
    console.log({ countUnread });

    const [selectedTip, setSelectedTip] = useState<TipModel | null>(null);
    const bottomSheetRef = useRef<any>(null);

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
    const getUnreadNotificationCount = async () => {
        try {
            console.log(user);

            const res = await notificationAPI.HandleNotification(`/get-count-unread?userId=${user?.id}`);
            setCountUnread(res.data);
        } catch (error) {
            console.log('Error fetching service types: ', error);
        }
    };

    useEffect(() => {
        getDataService_Type();
        Firebase(user?.id);
        getUnreadNotificationCount();
        const subscription = eventEmitter.on('newNotification', getUnreadNotificationCount);
        const subscriptionUpdateNoti = eventEmitterUpdateRead.on('updateCountNotiRead', getUnreadNotificationCount);

        return () => {
            subscription.off('newNotification', getUnreadNotificationCount);
            subscriptionUpdateNoti.off('updateCountNotiRead', getUnreadNotificationCount);

        };

    }, []);
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

    const addAddressByCoordinates = async () => {
        try {
            const respones = await authenticationAPI.HandleAuthentication('/add-address-by-id-user', {
                id_user: user.id,
                longitude: currentLocation.longitude,
                latitude: currentLocation.latitude,
                addToStart: true
            }, 'post')
            if (respones) {
                Burnt.toast({
                    title: "Cập nhật địa chỉ",

                });
            } else {
                console.log('Sai dòng 118')
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getCurrentLocation();
    }, [user]);

    useEffect(() => {
        if (currentLocation.longitude || currentLocation.latitude) {
            console.log(currentLocation.longitude);
            addAddressByCoordinates()
        }
    }, [currentLocation.latitude, currentLocation.longitude, user])

    const handleServiceType = (item: any) => {
        navigation.navigate('ProductType', { data: item, latitude: currentLocation.latitude, longitude: currentLocation.longitude })
    }
    const handleDetailShop = (item: any) => {
        navigation.navigate('DetailsShop', { data: item })

    }


    const handlePressItem = (item: TipModel) => {
        setSelectedTip(item);
        bottomSheetRef.current?.toggleBottomSheet();
    };
    return (
        <>
            <ContainerComponent styleBackground={{ backgroundColor: COLORS.WHISPER_GRAY }} isScroll>
                <SectionComponent
                    styles={{
                        height: 83,
                        backgroundColor: COLORS.AZURE_BLUE,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderBottomRightRadius: 16,
                        borderBottomLeftRadius: 16
                    }}>
                    <RowComponent styles={{ marginTop: 35 }} justify="space-between">
                        <TextComponent
                            text={`Hi, ${user.fullname}!`}
                            font={FONTFAMILY.montserrat_medium}
                        />
                        <TouchableOpacity onPress={() => navigate('Notification', { from: 'background' })}>
                            <SectionComponent styles= {{
                                position : 'relative',
                                paddingHorizontal: 0,
                                paddingBottom:0
                            }}>
                            <Notification size="30" color={COLORS.WHITE} />                       
                           {(countUnread === '10+' || parseInt(countUnread) > 0)  && <RowComponent styles={{
                                position: 'absolute',
                                top: -5,
                                right: -5,
                                backgroundColor: 'red',
                                borderRadius: 10,
                                width: 20, 
                                height: 20,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                         <TextComponent color={COLORS.WHITE} size={12}  text={Number(countUnread) > 10 ? '10+' :  countUnread}/>
                            </RowComponent>}
                            </SectionComponent>
                        </TouchableOpacity>
                    </RowComponent>
                </SectionComponent>
                <SectionComponent
                    styles={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, height: 185 }}>
                    <SwipeComponent />
                </SectionComponent>
                <SectionComponent styles={{ marginTop: -30 }}>
                    <RowComponent justify='space-between'>
                        <RowComponent styles={{ backgroundColor: COLORS.WHITE, borderRadius: 16, padding: 10 }}>
                            <Image source={IMAGES.DanhMuc} style={{ width: 20, height: 20 }} />
                            <TextComponent text={" Danh mục"} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} size={15} />
                        </RowComponent>
                        <TextComponent text={"Xem tất cả"} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} size={15} />
                    </RowComponent>
                </SectionComponent>
                <SectionComponent>
                    <CardServiceComponent data={typeService} isLoading={loading} onPress={handleServiceType} />
                </SectionComponent>
                <SectionComponent styles={{ marginTop: -20 }}>
                    <TextComponent text={"Mách mẹo vặt"} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} size={15} />
                </SectionComponent>
                <SectionComponent>
                    <CardTipCompnent onPress={handlePressItem} />
                </SectionComponent>
                <SectionComponent>
                    <RowComponent justify='space-between'>
                        <TextComponent text={"Cửa hàng nổi bật"} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} size={15} />
                        <TouchableOpacity onPress={() => navigation.navigate('AllStores', { latitude: currentLocation.latitude, longitude: currentLocation.longitude })}>
                            <TextComponent text={"Xem thêm"} color={COLORS.OCEAN_BLUE} font={FONTFAMILY.montserrat_medium} size={15} />
                        </TouchableOpacity>
                    </RowComponent>
                </SectionComponent>
                <SectionComponent styles={{ marginTop: -20 }}>
                    <CardShopComponent onPress={handleDetailShop} limit={3} currentLatitude={currentLocation.latitude} currentLongitude={currentLocation.longitude} />
                </SectionComponent>
            </ContainerComponent>
            <BottomSheetComponent ref={bottomSheetRef} selectedTip={selectedTip} />
        </>
    );
};

export default HomeScreen;