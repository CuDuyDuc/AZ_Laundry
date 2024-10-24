import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HeaderComponent } from '../components';
import { ChatContextProvider } from '../context/ChatContext';
import { MessageScreen, NotificationScreen } from '../screens';

const TopTabNavigator = ({ navigation }: any) => {

    const Tab = createMaterialTopTabNavigator();
    return (
        <ChatContextProvider>
            <HeaderComponent title='Thông báo' isBack onBack={() => navigation.goBack()} />
            < Tab.Navigator >
                <Tab.Screen name="Tin nhắn" component={MessageScreen} />
                <Tab.Screen name="Thông báo" component={NotificationScreen} />
            </Tab.Navigator>
        </ChatContextProvider>
    );
}


export default TopTabNavigator;