import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { ChatContextProvider } from '../context/ChatContext'
import { AllStoresScreen, BookingScreen, ChatBoxScreen, DateWeek, DetailProductService, DetailShopOfService, DetailsShopScreen, HistoryScreen, InfoScreen, OrderDetatailsScreen, OrderHistoryScreen, ProductOfProductTypeScreen, ProductTypeScreen, SeeReviewsScreen } from '../screens'
import TabNavigator from './TabNavigator'
import TopTabNavigator from './TopTabNavigator'


const MainNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <ChatContextProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Main' component={TabNavigator} />
                <Stack.Screen name='ProductType' component={ProductTypeScreen} />
                <Stack.Screen name='DetailsShop' component={DetailsShopScreen} />
                <Stack.Screen name='EditInfoAccount' component={InfoScreen} />
                <Stack.Screen name='TopTab' component={TopTabNavigator} />
                <Stack.Screen name='AllStores' component={AllStoresScreen} />
                <Stack.Screen name='DetailShopOfService' component={DetailShopOfService} />
                <Stack.Screen name='ProductOfProductTypeScreen' component={ProductOfProductTypeScreen} />
                <Stack.Screen name='OrderHistoryScreen' component={OrderHistoryScreen} />
                <Stack.Screen name='ChatScreen' component={ChatBoxScreen} />
                <Stack.Screen name='HistoryScreen' component={HistoryScreen} />
                <Stack.Screen name='OrderDetatailsScreen' component={OrderDetatailsScreen} />
                <Stack.Screen name="BookingScreen" component={BookingScreen} />
                <Stack.Screen name="DateWeek" component={DateWeek} />
                <Stack.Screen name="SeeReviewsScreen" component={SeeReviewsScreen} />
                <Stack.Screen name="DetailProductService" component={DetailProductService} />

            </Stack.Navigator>
        </ChatContextProvider>
    )
}

export default MainNavigator