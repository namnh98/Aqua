import * as React from 'react'
import { Image, Platform } from 'react-native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import size from '../res/size'
import images from '../res/image/index'
import { navigationRef } from './NavigationRef'
import SplashComponent from '../components/splash/SplashComponent'
import LoginContainer from './login/LoginContainer'
import SignUpContainer from './login/SignUpContainer'
import HistoryContainer from './history/HistoryContainer'
import ReportingContainer from './reporting/ReportingContainer'
import ProfileContainer from './profile/ProfileContainer'
import RegsitrationContainer from './registration/RegsitrationContainer'
import ScanBarcodeComponent from '../components/registration/scanBarcodeComponent'
import SerinumberComponent from '../components/registration/serinumberComponent'
import GeneralInfomation from '../components/registration/GeneralInfomation'
import BankContainer from '../containers/login/BankContainer'
import DetailHistory from '../components/history/DetailHistory'
import BarcodeResult from '../components/registration/BarcodeResult'
import PreviewScreen from '../components/registration/PreviewScreen'
import UploadEvidence from '../components/registration/UploadEvidence'
import UpdateSOComponent from '../components/updateSO/updateSOComponent'
import NotificationContainer from './notification/NotificationContrainers'
import TabScreen from './Tab'
import { language } from '../res/language'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux'
import { actSetLanguageAction } from '../redux/action/changeLangAction'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()


const MainStackScreen = (props) => {
   React.useEffect(() => {
      getLanguage();

   }, [])


   async function getLanguage() {
      try {
         const value = await AsyncStorage.getItem('@appLanguage');
         if (value !== null && value !== undefined && value !== '') {
            // value previously stored
            language.app = value;
            props.onChangeLanguage(value);
         }
      } catch (e) {
         console.log(e, 'error app container')
      }
   }
   return (
      <NavigationContainer ref={navigationRef}>
         <Stack.Navigator
            screenOptions={
               ({
                  headerShown: false,
                  cardStyle: {
                     backgroundColor: 'white',
                  },
               },
                  Platform.OS === 'android'
                     ? {
                        ...TransitionPresets.SlideFromRightIOS,
                        gestureEnabled: true,
                        headerShown: false,
                     }
                     : {
                        headerShown: false,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                     })
            }
            initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashComponent} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Login" component={LoginContainer} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Tab" component={TabScreen} />
            <Stack.Screen name="SignUp" component={SignUpContainer} options={{ gestureEnabled: false }} />
            <Stack.Screen name="scanBarcode" component={ScanBarcodeComponent} options={{ gestureEnabled: false }} />
            <Stack.Screen name="serinumber" component={SerinumberComponent} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Regsi" component={RegsitrationContainer} options={{ gestureEnabled: false }} />
            <Stack.Screen name="DetailHistory" component={DetailHistory} options={{ gestureEnabled: false }} />
            <Stack.Screen name="BarcodeResult" component={BarcodeResult} options={{ gestureEnabled: false }} />
            <Stack.Screen name="PreviewScreen" component={PreviewScreen} options={{ gestureEnabled: false }} />
            <Stack.Screen name="UploadEvidence" component={UploadEvidence} options={{ gestureEnabled: false }} />
            <Stack.Screen name="BankInformation" component={BankContainer} options={{ gestureEnabled: false }} />
            <Stack.Screen
               name="NotificationComponent"
               component={NotificationContainer}
               options={{ gestureEnabled: false }}
            />
         </Stack.Navigator>
      </NavigationContainer>
   )
}


const mapStateToProps = (state) => {

   return {

      lang: state.langReducers.lang,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {

      onChangeLanguage: (data) => {
         dispatch(actSetLanguageAction(data))
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainStackScreen)