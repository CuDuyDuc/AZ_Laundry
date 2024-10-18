import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HeaderComponent, SectionComponent } from '../components';
import { MessageScreen, NotificationScreen } from '../screens';

const TopTabNavigator = () => {

    const Tab = createMaterialTopTabNavigator();
    return (
        <SectionComponent
            styles={{
                flex: 1,
                paddingHorizontal:0}}>
            <HeaderComponent title='Tin nhắn' />
            < Tab.Navigator >
                <Tab.Screen name="Messages" component={MessageScreen} />
                <Tab.Screen name="Notifications" component = {NotificationScreen} />
            </Tab.Navigator>
        </SectionComponent>
    );
}


export default TopTabNavigator;