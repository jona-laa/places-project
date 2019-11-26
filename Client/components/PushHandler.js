import React, { useEffect, useState } from 'react';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useSelector, useDispatch } from 'react-redux';
import { setUserToken } from '../redux/actions/token';
import { setNotification } from '../redux/actions/notifications';

const baseUrl = 'http://192.168.35.146:3000';
const userID = '5dd50ab87153751890c06087';

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
    fetch(`${baseUrl}/api/users/${userID}/token`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pushToken: state.expoPushToken,
      })
    })
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.addListener(notification => dispatch(setNotification(notification)));
    if (state.expoPushToken) {
      sendUserToken()
    }
  }, [state.expoPushToken])

  return null;
}

/*  TO GET PUSH RECEIPTS, RUN THE FOLLOWING COMMAND IN TERMINAL, WITH THE RECEIPTID SHOWN IN THE CONSOLE LOGS
 
    curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/getReceipts" -d '{
      "ids": ["2dbe4795-c245-442e-ae91-21289ff509f7"]
      }'
 
    */

export default PushHandler;