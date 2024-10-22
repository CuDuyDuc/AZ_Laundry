import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import TabNavigator from './TabNavigator'
import { AllStoresScreen, DetailsShopScreen, InfoScreen, ProductTypeScreen } from '../screens'
import TopTabNavigator from './TopTabNavigator'


const MainNavigator = () => {

    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Main' component={TabNavigator}/>
            <Stack.Screen name='ProductType' component={ProductTypeScreen}/>
            <Stack.Screen name='DetailsShop' component={DetailsShopScreen}/>
            <Stack.Screen name='EditInfoAccount' component={InfoScreen}/>
            <Stack.Screen name='TopTab' component={TopTabNavigator}/>
            <Stack.Screen name='AllStores' component={AllStoresScreen}/>
        </Stack.Navigator>
    )
}

export default MainNavigator