import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import * as Burnt from 'burnt';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  EventType,
} from '@notifee/react-native';
import NotificationService from './src/utils/NotificationService';
var EventEmitter = require('eventemitter3');

export const eventEmitter = new EventEmitter();

const onMessageReceived = async message => {

  await NotificationService.requestPermissions();
  await NotificationService.displayLocalNotification(message.notification.title, message.notification.body);
  // Phát sự kiện thông báo mới nhận
  eventEmitter.emit('newNotification');
  Burnt.toast({
    title: 'Có thông báo mới'
  })
};

messaging().setBackgroundMessageHandler(onMessageReceived);
messaging().onMessage(onMessageReceived);

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  // Check if the user pressed the "Mark as read" action
  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      break;
    case EventType.PRESS:
      // Update external API
      eventEmitter.emit('notificationReceived', notification);
      // Remove the notification
      console.log('Press Notification');

      await notifee.cancelNotification(notification.id);
      break;
  }

});

AppRegistry.registerComponent(appName, () => App);
