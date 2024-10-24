import { View, Text } from 'react-native'
import React from 'react'
import notifee from '@notifee/react-native'
const NotificationScreen = () => {
    async function onDisplayNotification() {
        // Request permissions (required for iOS)
        await notifee.requestPermission()
    
        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });
    
        // Display a notification
        await notifee.displayNotification({
          title: 'Small Icon',
          body: 'A notification using the small icon!',
          android: {
            channelId,
            smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
              id: 'default',
            },
          },
        });
      }
      
    return (
        <View>
            <Text>NotificationScreen</Text>
        </View>
    )
}

export default NotificationScreen;