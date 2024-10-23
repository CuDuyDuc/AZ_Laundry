import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HeaderComponent, SectionComponent } from '../components';
import { MessageScreen, NotificationScreen } from '../screens';

const TopTabNavigator = ({navigation}: any) => {

    const Tab = createMaterialTopTabNavigator();
    return (
        <SectionComponent
            styles={{
                flex: 1,
                paddingHorizontal:0}}>
            <HeaderComponent title='Thông báo' isBack onBack={() => navigation.goBack()}/>
            < Tab.Navigator >
                <Tab.Screen name="Tin nhắn" component={MessageScreen} />
                <Tab.Screen name="Thông báo" component = {NotificationScreen} />
            </Tab.Navigator>
        </SectionComponent>
    );
}


export default TopTabNavigator;