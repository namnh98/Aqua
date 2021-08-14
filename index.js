/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import App from './src/'
import { name as appName } from './app.json'
LogBox.ignoreAllLogs(true)
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});
AppRegistry.registerComponent(appName, () => App)
