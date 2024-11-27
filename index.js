import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import * as Burnt from 'burnt';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  EventType,
} from '@notifee/react-native';
import NotificationService from './src/screens/notification/service/NotificationService';
import { navigate } from './src/navigators/service/RootNavigation';
var EventEmitter = require('eventemitter3');

export const eventEmitter = new EventEmitter();

const onMessageReceived = async message => {

  await NotificationService.requestPermissions();
  await NotificationService.displayLocalNotification(message.notification.title, message.notification.body);
  eventEmitter.emit('newNotification');
  Burnt.toast({
    title: 'Có thông báo mới'
  })
};

messaging().setBackgroundMessageHandler(onMessageReceived);
messaging().onMessage(onMessageReceived);

notifee.onForegroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
  console.log('Background Event:', type, detail);
  if (type === EventType.PRESS && pressAction?.id === 'default') {
    console.log('User pressed notification');
    navigate('Notification', { from: 'background' });
  }
  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      break;
    case EventType.PRESS:
      eventEmitter.emit('notificationReceived', notification);
      console.log('Press Notification');
      navigate('Notification', { from: 'background' });

      await notifee.cancelNotification(notification.id);
      break;
  }

});

AppRegistry.registerComponent(appName, () => App);
