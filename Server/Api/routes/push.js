const express = require('express');
const { Expo } = require('expo-server-sdk');
const router = express.Router();

const expo = new Expo();

//THIS SHOULD BE A MONGO DB DOCUMENT L8R
let savedPushTokens = [];
//THIS SHOULD BE A MONGO DB DOCUMENT L8R

const saveToken = (token) => {
  console.log(savedPushTokens.indexOf(token) === -1)
  console.log(savedPushTokens)
  if (savedPushTokens.indexOf(token) === -1) {
    savedPushTokens.push(token);
  }
}

const handlePushTokens = (message) => {
  let notifications = [];
  for (let pushToken of savedPushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    notifications.push({
      to: pushToken,
      sound: 'default',
      title: 'Test Notification!',
      body: message,
      data: { message }
    })
  }

  let chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
}

router.get('/', (req, res) => {
  res.send('Push Notification Server Running');
});

router.post('/token', (req, res) => {
  saveToken(req.body.token.value);
  console.log(`Received push token, ${req.body.token.value}`);
  res.send(`Received push token, ${req.body.token.value}`);
});

router.post('/message', (req, res) => {
  handlePushTokens(req.body.message);
  console.log(`Received message, ${req.body.message}`);
  res.send(`Received Calles message, ${req.body.message}`);
});

module.exports = router;