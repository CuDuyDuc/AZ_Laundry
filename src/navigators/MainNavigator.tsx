import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import TabNavigator from './TabNavigator'
import { AllStoresScreen, DetailShopOfService, DetailsShopScreen, InfoScreen, ProductTypeScreen,ProductOfProductTypeScreen, HistoryScreen, ChatBoxScreen } from '../screens'
import TopTabNavigator from './TopTabNavigator'
import { ChatContextProvider } from '../context/ChatContext'


const MainNavigator = () => {

    const Stack = createNativeStackNavigator()
    return (
       <ChatContextProvider>
            <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Main' component={TabNavigator}/>
            <Stack.Screen name='ProductType' component={ProductTypeScreen}/>
            <Stack.Screen name='DetailsShop' component={DetailsShopScreen}/>
            <Stack.Screen name='EditInfoAccount' component={InfoScreen}/>
            <Stack.Screen name='TopTab' component={TopTabNavigator}/>
            <Stack.Screen name='AllStores' component={AllStoresScreen}/>
            <Stack.Screen name='DetailShopOfService'component={DetailShopOfService}/>
            <Stack.Screen name='ProductOfProductTypeScreen'component={ProductOfProductTypeScreen}/>
            <Stack.Screen name='HistoryScreen'component={HistoryScreen}/>
            <Stack.Screen name='ChatScreen' component={ChatBoxScreen}/>
        </Stack.Navigator>

       </ChatContextProvider>
    )
}

export default MainNavigator