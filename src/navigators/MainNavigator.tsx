import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import TabNavigator from './TabNavigator'
import { DetailsShopScreen, ProductTypeScreen } from '../screens'

const MainNavigator = () => {

    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Main' component={TabNavigator}/>
            <Stack.Screen name='ProductType' component={ProductTypeScreen}/>
            <Stack.Screen name='DetailsShop' component={DetailsShopScreen}/>
        </Stack.Navigator>
    )
}

export default MainNavigator