import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ForgotPassWord, LoginScreen, OnBoardingScreen, SignUpScreen } from '../screens';

const AuthNavigator = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='OnBoardingScreen' component={OnBoardingScreen}/>
            <Stack.Screen name='LoginScreen' component={LoginScreen}/>
            <Stack.Screen name='SignUpScreen' component={SignUpScreen}/>
            <Stack.Screen name='ForgotPassWord' component={ForgotPassWord}/>
        </Stack.Navigator>
    )
}

export default AuthNavigator