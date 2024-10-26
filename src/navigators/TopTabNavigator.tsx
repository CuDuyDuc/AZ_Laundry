import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HeaderComponent } from '../components';
import { MessageScreen, NotificationScreen } from '../screens';

const TopTabNavigator = () => {

    const Tab = createMaterialTopTabNavigator();
    return (
        <>
            <HeaderComponent title='Thông báo' />
            < Tab.Navigator >
                <Tab.Screen name="Tin nhắn" component={MessageScreen} />
                <Tab.Screen name="Thông báo" component={NotificationScreen} />
            </Tab.Navigator>
        </>
    );
}


export default TopTabNavigator;