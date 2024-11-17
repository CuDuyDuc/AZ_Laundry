import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { ChatContextProvider } from '../context/ChatContext'
import { AllStoresScreen, BookingScreen, ChatBoxScreen, Manage_Address, DateWeek, DetailShopOfService,DetailProductService , DetailsShopScreen, HistoryScreen, InfoScreen, OrderDetatailsScreen, OrderHistoryScreen, ProductOfProductTypeScreen, ProductTypeScreen, SeeReviewsScreen, ReviewProductsScreen, OrderConfirmationScreen , SelectPaymentMethodScreen, SuccessPaymentScreen, VNPayPaymentScreen ,PaymentScreen,AddressSelectionScreen} from '../screens'
import TabNavigator from './TabNavigator'
import TopTabNavigator from './TopTabNavigator'
import { DateTimeProvider } from '../context/DateTimeContext'
import { AddressesProvider } from '../context/AddressesContext'
import { PaymentMethodProvider } from '../context/PaymentMethodContext'


const MainNavigator = () => {
    const Stack = createNativeStackNavigator()
    return (
        <ChatContextProvider>
            <DateTimeProvider>
                <AddressesProvider>
                    <PaymentMethodProvider>
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
                            <Stack.Screen name="ReviewProductsScreen" component={ReviewProductsScreen} />
                            <Stack.Screen name="OrderConfirmationScreen" component={OrderConfirmationScreen} />
                            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                            <Stack.Screen name="AddressSelectionScreen" component={AddressSelectionScreen} />
                            <Stack.Screen name="ManageAddressScreen" component={Manage_Address} />
                            <Stack.Screen name="SelectPaymentMethodScreen" component={SelectPaymentMethodScreen} />
                            <Stack.Screen name="VNPayPaymentScreen" component={VNPayPaymentScreen} />
                            <Stack.Screen name="SuccessPaymentScreen" component={SuccessPaymentScreen} />
                        </Stack.Navigator>
                    </PaymentMethodProvider>
                </AddressesProvider>
            </DateTimeProvider>
        </ChatContextProvider>
    )
}

export default MainNavigator