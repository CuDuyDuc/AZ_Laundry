import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HeaderComponent } from '../components';
import { MessageScreen, NotificationScreen } from '../screens';
import React from 'react';

const TopTabNavigator = ({navigation}:any) => {

    const Tab = createMaterialTopTabNavigator();
    return (
        <>
            <HeaderComponent title='Thông báo' isBack onBack={() => navigation.goBack()} />
            < Tab.Navigator >
                <Tab.Screen name="Tin nhắn" component={MessageScreen} />
                <Tab.Screen name="Thông báo" component={NotificationScreen} />
            </Tab.Navigator>
        </>
    );
}


export default TopTabNavigator;