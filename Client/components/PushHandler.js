import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const PushHandler = () => {
  const [state, setState] = useState({
    expoPushToken: '',
    notification: {},
  });

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();

      setState({ ...state, expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };
  console.log(state);

  useEffect(() => {
    registerForPushNotificationsAsync();
    // Handle notifications that are received or selected while the app
    // is open. 
    _notificationSubscription = Notifications.addListener(
      _handleNotification
    );
  }, [])

  const _handleNotification = notification => {
    setState({ notification: notification });
  };

  const sendPushNotification = async () => {
    const message = {
      to: state.expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes here' },
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    const data = response._bodyInit;
    console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
  };


  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Origin: {state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(state.notification.data)}</Text>
      </View>
      <Button
        title={'Press to Send Notification'}
        onPress={() => sendPushNotification()}
      />
    </View>
  );
}

/*  TO GET PUSH RECEIPTS, RUN THE FOLLOWING COMMAND IN TERMINAL, WITH THE RECEIPTID SHOWN IN THE CONSOLE LOGS

    curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/getReceipts" -d '{
      "ids": ["8890b090-ad0f-45b4-86c9-1d0fe5fa1d16"]
      }'

    */

export default PushHandler;