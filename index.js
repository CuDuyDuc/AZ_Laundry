/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';
import notifee, {
  EventType,
  AndroidImportance,
  TriggerType,
  Trigger,
  TimestampTrigger
} from '@notifee/react-native';
var EventEmitter = require('eventemitter3');

export const eventEmitter = new EventEmitter();
 
const onMessageReceived = async message => {
  const date = new Date(Date.now());
  date.setHours(11);
  date.setMinutes(10);

  // Create a time-based trigger
  const trigger= {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
  };

  await notifee.requestPermission()
  
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'A-Z Laundry',
  });
  console.log(message.notification.body);
  const notification = {
    title: message.notification.title,
    body: message.notification.body,
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      largeIcon: 'https://i.pinimg.com/564x/87/93/39/87933946a7cf8b9f5fffe46d0ddd6986.jpg',
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
      trigger
    },
  };
  console.log(notification);
  await notifee.displayNotification(notification);
};

messaging().setBackgroundMessageHandler(onMessageReceived);
messaging().onMessage(onMessageReceived);

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  // Check if the user pressed the "Mark as read" action
  switch (type) {
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      break;
    case EventType.PRESS:
        // Update external API
    eventEmitter.emit('notificationReceived', notification);
    // Remove the notification
    await notifee.cancelNotification(notification.id);
      break;
  }

});

AppRegistry.registerComponent(appName, () => App);
