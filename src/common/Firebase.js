import messaging from '@react-native-firebase/messaging'
import firebase from '@react-native-firebase/app'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { Platform } from 'react-native'
import { API_URL, userProfile, } from '../settings/index'
const PushNotification = require('react-native-push-notification')
import NotificationService from './NotificationService'

async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }

}


PushNotification.configure({
    onRegister: function (token) {
        // console.log("TOKEN:", token);
    },
    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
        console.log('REMOTE NOTIFICATION ==>', notification)
        // process the notification here
        onMessageReceived(notification)

        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
        console.error(err.message, err);
    },

    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    // Android only: GCM or FCM Sender ID
    popInitialNotification: true,
    requestPermissions: true
})

PushNotification.popInitialNotification((notification) => {
    console.log('Initial Notification', notification);
});

const handleNotify = async (navigation) => {

    const a = new NotificationService();
    userProfile.tokenFB = await messaging().getToken()
    // console.log("TOKENFB", userProfile.tokenFB)

    // Do show notify
    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
        onMessageReceived
    });

}

function onMessageReceived(message) {
    PushNotification.localNotification({
        //bigText: message.notification.body,
        //subText: "\u00A9 CMCGlobal." + new Date().getFullYear(),
        //subText: message.status || '',
        channelId: 'default-channel-id',
        title: message.notification?.title,
        message: message.notification?.body,
        vibrate: true,
        vibration: 200,
        playSound: true,
        soundName: 'default',
        //actions: '["Yes", "No"]'
    })
}

export { requestUserPermission, handleNotify }
