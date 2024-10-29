import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { initializeApp } from 'firebase/app';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseNotiAPI from '../apis/firebaseNotiAPI';
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
    console.log({userId});
    

    async function addTokenInfo(fcmToken: string) {
        try {
            const res = await FirebaseNotiAPI.HandleFirebaseToken('/add-token', { userId: userId, fcmToken: fcmToken }, 'post');
            console.log(res.status);
            
        } catch (error) {
            console.log('Error fetching addToken info: ', error);
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
                console.log({ fcmToken });
                await AsyncStorage.setItem('fcmToken', JSON.stringify({ fcm_token: fcmToken }));
                fcmToken && await addTokenInfo(fcmToken);
            } else {
                await messaging().requestPermission();
            }
        } else if (Platform.OS === 'android') {
            if (hasPermissions) {
                const fcmToken = await getFCMToken();
                console.log({ fcmToken });
                await AsyncStorage.setItem('fcmToken', JSON.stringify({ fcm_token: fcmToken }));
                fcmToken && await addTokenInfo(fcmToken);

            }
        }
    }
    getFirebaseToken()
        .then((r) => console.log(r))
        .catch((error) => console.log(error));
}

