import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddSquare, Clock, Home2, Notification, Profile, ShoppingCart } from 'iconsax-react-native';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import COLORS from '../assets/colors/Colors';
import { useRole } from '../permission/permission';
import { AddService, CartScreen, HistoryScreen, HomeScreen, ProfileScreen } from '../screens';
import TopTabNavigator from './TopTabNavigator';
import { globalStyle } from '../styles/globalStyle';

const TabNavigator = () => {

    const Tab = createBottomTabNavigator()
    const { isAdmin, isShop, isUser } = useRole()
    console.log({ isAdmin, isShop, isUser });

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.WHITE,
                borderColor: COLORS.WHITE,
            },
            tabBarIcon: ({ focused, color, size }) => {
                let icon: ReactNode;
                color = focused ? COLORS.WHITE : COLORS.HEX_LIGHT_GREY;
                let backgroundColor = focused ? COLORS.AZURE_BLUE : 'transparent';
                let padding = 10;
                let borderRadius = 8;

                switch (route.name) {
                    case 'Home':
                        icon = <Home2 size={size} color={color} variant="Bold" />;
                        break;
                    case 'Cart':
                        icon = <ShoppingCart size={size} color={color} variant="Bold" />;
                        break;
                    case 'History':
                        icon = <Clock size={size} color={color} variant="Bold" />;
                        break;
                    case 'Notification':
                        icon = <Notification size={size} color={color} variant="Bold" />;
                        break;
                    case 'Profile':
                        icon = <Profile size={size} color={color} variant="Bold" />;
                        break;
                    case 'AddService':
                        icon = (
                            <View style={[globalStyle.shadow, {
                                width: 55,
                                height: 55,
                                borderRadius: 10,
                                backgroundColor: focused ? COLORS.AZURE_BLUE : COLORS.WHITE,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 8,
                                marginTop: 5
                            }]}>
                                <AddSquare size={30} color={focused ? COLORS.WHITE : COLORS.AZURE_BLUE} variant='Bold' />
                            </View>
                        );
                        return icon;
                }

                return (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: backgroundColor,
                        borderRadius: borderRadius,
                        padding: padding,
                        paddingEnd: 20,
                        paddingStart: 20
                    }}>
                        {icon}
                    </View>
                );
            },
            tabBarIconStyle: {
                marginTop: 4
            },
            tabBarLabel: () => null,
        })}>
            <Tab.Screen name='Home' component={HomeScreen} />
            {isUser ? (<Tab.Screen name='Cart' component={CartScreen} />):(<Tab.Screen name='History' component={HistoryScreen} />)}
            {(isShop || isAdmin) && (<Tab.Screen name='AddService' component={AddService} />)}
            <Tab.Screen name='Notification' component={TopTabNavigator} />
            <Tab.Screen name='Profile' component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default TabNavigator