import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Platform } from 'react-native';
import authenticationAPI from '../apis/authAPI';
const firebaseConfig = {
    apiKey: "AIzaSyDi_NqHYSD-rXWSfbXloXCMJ3Yz4XJMQFs",
    authDomain: "az-laundry.firebaseapp.com",
    projectId: "az-laundry",
    storageBucket: "az-laundry.appspot.com",
    messagingSenderId: "785851564656",
    appId: "1:785851564656:web:317f8d81b801f7391e6ab5",
    measurementId: "G-3C0T7870VZ"
};
const VAPID_KEY = "BJq-T6nPdw3AvYLNTRVwDLWK6JlveLd0qGkp__eXgwnaJqMHUQxD3RGxa6tU1oRX9rXcLKkLnbYJhcFbK8-Pxbc"

export default function Firebase(userId: string) {
   
    async function updateDeviceToken(device_token: String) {
        try {
            const res = await authenticationAPI.HandleAuthentication(`/update-device-token/${userId}`,{device_token:device_token},'put');
            
        } catch (error) {
            console.log('Error fetching device_token info: ', error);
        }
    }

    async function getFirebaseToken() {
        initializeApp(firebaseConfig);
        // Get current user ID
        //check if the app has the right permissions before getting the FCM token
        const hasPermissions = await messaging().hasPermission();
        function getFCMToken() {
            return messaging().getToken({
                vapidKey: VAPID_KEY,
            });
        }
        if (Platform.OS === 'ios') {
            if (hasPermissions) {
                await messaging().registerDeviceForRemoteMessages();

                const fcmToken = await getFCMToken();
                await AsyncStorage.setItem('fcmToken', JSON.stringify({ fcm_token: fcmToken }));
                fcmToken && await updateDeviceToken(fcmToken);
            } else {
                await messaging().requestPermission();
            }
        } else if (Platform.OS === 'android') {
            if (hasPermissions) {
                const fcmToken = await getFCMToken();
                await AsyncStorage.setItem('fcmToken', JSON.stringify({ fcm_token: fcmToken }));
                fcmToken && await updateDeviceToken(fcmToken);

            }
        }
    }
    getFirebaseToken()
        .then((r) => console.log(r))
.catch((error) => console.log(error));
}