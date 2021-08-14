import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import GeneralInfomation from '../components/registration/GeneralInfomation'
import { actParamAction, actParamClearAction } from '../redux/action/paramAction'
import images from '../res/image/index'
import size from '../res/size'
import HistoryContainer from './history/HistoryContainer'
import ProfileContainer from './profile/ProfileContainer'
import ReportingContainer from './reporting/ReportingContainer'
import { Alert } from 'react-native'
import I18n from '../settings/i18n'
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const MainTabScreen = (props) => {
   // console.log('props trong MainTabScreen: ', props)
   const { actParamAction, actParamClearAction } = props
   return (
      <Tab.Navigator
         tabBarOptions={{
            showLabel: false,
            activeTintColor: '#003DA5',
            indicatorStyle: {
               backgroundColor: 'red',
            },
         }}
         initialRouteName="GeneralInfomation">
         <Tab.Screen
            name="GeneralInfomation"
            listeners={({ navigation, route }) => ({
               tabPress: (e) => {
                  // Prevent default action
                  e.preventDefault()
                  actParamClearAction()

                  // Do something with the `navigation` object
                  // console.log('route qua en: ', route)
                  navigation.navigate('GeneralInfomation')
               },
            })}
            initialParams={{ shouldClear: true }}
            // getComponent={() => require('../components/registration/GeneralInfomation').default}
            component={GeneralInfomation}
            options={{
               tabBarIcon: ({ focused }) =>
                  focused ? (
                     <Image
                        source={images.ic_registration_active}
                        style={{ width: size.s60, height: size.s60 }}
                        resizeMode="contain"
                     />
                  ) : (
                     <Image
                        source={images.ic_registration}
                        style={{ width: size.s60, height: size.s60 }}
                        resizeMode="contain"
                     />
                  ),
            }}
         /><Tab.Screen
            name="History"
            component={HistoryContainer}
            options={{
               tabBarIcon: ({ focused }) =>
                  focused ? (
                     <Image
                        source={images.ic_history_active}
                        style={{ width: size.s60, height: size.s60 }}
                        resizeMode="contain"
                     />
                  ) : (
                     <Image
                        source={images.ic_history}
                        style={{ width: size.s60, height: size.s60 }}
                        resizeMode="contain"
                     />
                  ),
            }}
         />
         <Tab.Screen
            name="Reporting"
            component={ReportingContainer}
            listeners={({ navigation, route }) => ({
               tabPress: (e) => {
                  // Prevent default action
                  e.preventDefault();
                  Alert.alert(
                     "",
                     `${I18n.t('soon')}`,
                     [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                     ]
                  );

               },
            })}
            options={{
               tabBarIcon: ({ focused }) =>
                  focused ? (
                     <Image
                        source={images.ic_pie_chart}
                        style={{ width: size.s60, height: size.s60 }}
                        resizeMode="contain"
                     />
                  ) : (
                     <Image
                        source={images.ic_pie_chart}
                        style={{ width: size.s60, height: size.s60 }}
                        resizeMode="contain"
                     />
                  ),
            }}
         />
         <Tab.Screen
            name="Profile"
            component={ProfileContainer}
            options={{
               tabBarIcon: ({ focused }) =>
                  focused ? (
                     <Image
                        source={images.ic_profile_active}
                        style={{ width: size.s60, height: size.s60 }}
                        resizeMode="contain"
                     />
                  ) : (
                     <Image
                        source={images.ic_profile}
                        style={{ width: size.s60, height: size.s60 }}
                        resizeMode="contain"
                     />
                  ),
            }}
         />
      </Tab.Navigator>
   )
}

const mapStateToProps = (state) => {
   return {
      dataParams: state.paramsReducers,
   }
}

const mapDispatchToProps = {
   actParamAction,
   actParamClearAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTabScreen)
