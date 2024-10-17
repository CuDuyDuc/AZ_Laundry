import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MessageScreen from './MessageScreen';
import NotificationScreen from './NotificationScreen';
import { ButtonComponent, ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import COLORS from '../../assets/colors/Colors';
import { FONTFAMILY } from '../../../assets/fonts';
import { Button } from 'react-native';
import { ArrowLeft2 } from 'iconsax-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderComponent from '../../components/HeaderComponent';
const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
    return (
        <SectionComponent
        styles={{
            flex: 1,
            paddingHorizontal:0
        }}
        >
     <HeaderComponent title='Tin nhắn' />
        < Tab.Navigator >
        <Tab.Screen name="Messages" component = { MessageScreen } />
            <Tab.Screen name="Notifications" component = { NotificationScreen } />
                </Tab.Navigator>
                </SectionComponent>
  );
}


export default TopTabNavigator;