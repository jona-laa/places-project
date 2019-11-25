import React, { useEffect, useState } from 'react';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useSelector, useDispatch } from 'react-redux';
import { setUserToken } from '../redux/actions/token'

const baseUrl = 'http://192.168.35.146:3000';

const PushHandler = () => {
  const state = useSelector(state => state)
  const dispatch = useDispatch();

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

      dispatch(setUserToken(token));

    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

  const sendUserToken = () => {
    fetch(`${baseUrl}/notifications/token`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: state.expoPushToken,
        }
      })
    })
  }

  useEffect(() => {
    console.log(state.expoPushToken)
    registerForPushNotificationsAsync();
    if (state.expoPushToken) {
      sendUserToken()
    }

  }, [state.expoPushToken])


  return null;
}

/*  TO GET PUSH RECEIPTS, RUN THE FOLLOWING COMMAND IN TERMINAL, WITH THE RECEIPTID SHOWN IN THE CONSOLE LOGS
 
    curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/getReceipts" -d '{
      "ids": ["8890b090-ad0f-45b4-86c9-1d0fe5fa1d16"]
      }'
 
    */

export default PushHandler;