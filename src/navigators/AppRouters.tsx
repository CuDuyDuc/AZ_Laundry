import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, authSelector } from '../redux/reducers/authReducer';
import { SplashScreen } from '../screens';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const AppRouters = () => {
    const [isShowSplash, setIsShowSplash] = useState(true);

    const { getItem } = useAsyncStorage('auth');

    const auth = useSelector(authSelector);
    const dispatch = useDispatch(); // của thèn react-redux

    useEffect(() => {
        checkLogin();
        const timeout = setTimeout(() => {
            setIsShowSplash(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    const checkLogin = async () => {
        const res = await getItem();

        res && dispatch(addAuth(JSON.parse(res)));
    };
    
    return (
        <>
            {isShowSplash ? (
                <SplashScreen />
            ) : auth.accesstoken ? (
                <MainNavigator />
            ) : (
                <AuthNavigator />
            )}
        </>
    );
}

export default AppRouters