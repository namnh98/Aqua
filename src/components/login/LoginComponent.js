import React, { Component } from 'react'
import {
   StyleSheet,
   View,
   Image,
   Dimensions,
   ScrollView,
   Animated,
   StatusBar,
   Keyboard,
   TouchableOpacity,
   Text,
   BackHandler,
   KeyboardAvoidingView,
   Alert,
} from 'react-native'
import images from '../../res/image/index'
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import size from '../../res/size'
import TextField from '../custom/TextField'
import { color } from '../../res/color'
import SnackBar from '../custom/SnackBar'
import { NetworkConnected, userProfile } from '../../settings'
import LoadingView from '../custom/LoadingView'
import AsyncStorage from '@react-native-async-storage/async-storage'
import StatusBarView from '../custom/StatusBarView'
import jwt_decode from "jwt-decode";
import I18n from '../../settings/i18n'

const widthScreen = Dimensions.get('window').width
export default class LoginComponent extends Component {
   constructor(props) {
      super(props)
      this.state = {
         username: '',
         password: '',
         snackBarMessage: '',
         snackBarError: false,
      }

      this.username = React.createRef()
      this.password = React.createRef()
      this.snackBar = React.createRef()
      this.animatedIMG = new Animated.Value(0)
   }
   getLogin = async () => {
      try {
         const login = await AsyncStorage.getItem('@dataProfile');
         // console.log('AsyncStorage:', JSON.parse(login), 'user login')
         if (login !== null && login !== undefined && login !== '') {
            var data = JSON.parse(login);
            this.setState({ username: data.username, password: data.password }, () => {
               this.props.loginAction({
                  user_name: data.username,
                  password: data.password
               })
            })

         }
      } catch (e) {
         console.log(e, 'error app container')
      }

   }
   componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
      this.getLogin()

   }
   componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
   }
   handleBackButtonClick = () => {
      if (!this.props.navigation.isFocused()) {
         this.props.navigation.goBack(null)
      } else {
         Alert.alert('', `${I18n.t('ExitApp')}`, [
            {
               text: `${I18n.t('No')}`,
               style: 'cancel',
            },
            {
               text: `${I18n.t('Yes')}`,
               onPress: () => {
                  BackHandler.exitApp()
               },
            },
         ])
      }
      return true
   }
   componentDidUpdate(prevProps) {
      if (this.props.loading !== prevProps.loading && !this.props.loading) {
         if (this.props.data?.error) {
            this.setState(
               {
                  snackBarMessage: this.props.data.message,
                  snackBarError: true,
               },
               () => {
                  this.snackBar.current.showSnackBar()
               },
            )
         } else if (this.props.data?.access_token) {
            const jwt_decode_user = jwt_decode(this.props.data?.access_token);
            // console.log(jwt_decode_user, 'jwt')
            userProfile.user_name = jwt_decode_user.sub
            userProfile.access_token = this.props.data.access_token
            userProfile.user_id = this.props.data.user_id

            if (jwt_decode_user.auth === 'SO') {
               this.props.getTokenAction({ token: userProfile.tokenFB })
               this.props.navigation.replace('Tab')

            } else {
               this.setState(
                  {
                     snackBarMessage: `${I18n.t('permission')}`,
                     snackBarError: true,
                  },
                  () => {
                     this.snackBar.current.showSnackBar()
                  },
               )
            }
         }
      }
      if (this.props.error !== prevProps.error && this.props.error) {
         // console.log(this.props.error, 'error login');
         this.setState(
            {
               snackBarMessage: this.props.error,
               snackBarError: true,
            },
            () => {
               this.snackBar.current.showSnackBar()
            },
         )
      }
   }

   onLogin = async () => {
      // this.props.navigation.replace('Tab')
      if (NetworkConnected.isConnected === true) {
         if (this.checkData()) {
            this.props.loginAction({
               user_name: this.state.username,
               password: this.state.password,
            })
            this.onLoginSuccess()
         }

      } else {
         this.setState(
            {
               snackBarMessage: `${I18n.t('checknetwork')}`,
               snackBarError: true,
            },
            () => {
               this.snackBar.current.showSnackBar()
            },
         )
      }
   }
   checkData = () => {
      const { username, password } = this.state
      let isCheckPass = false
      let isCheckUser = false
      if (username === '') {
         this.username.current.error(`${I18n.t('PleaseEnter')}` + '' + ` ${I18n.t('Username').toLowerCase()}`)
      } else if (username.length < 4) {
         this.username.current.error(`${I18n.t('morethen4')}`)

      } else if (username.match(/[A-Za-z0-9]/g).length !== username.length) {
         this.username.current.error(`${I18n.t('specialcharacters')}`)

      } else isCheckUser = true


      if (password === '') {
         this.password.current.error(`${I18n.t('PleaseEnter')}` + '' + ` ${I18n.t('Password').toLowerCase()}`)
      }
      // else if (password.match(/[A-Za-z0-9]/g).length !== password.length) {
      //    this.password.current.error('Password special characters are not allowed')

      // }
      else isCheckPass = true
      return isCheckPass && isCheckUser ? true : false
   }
   onLoginSuccess = async () => {
      const { username, password } = this.state;
      try {
         const jsonValue = JSON.stringify({ username, password })
         await AsyncStorage.setItem('@dataProfile', jsonValue)
      } catch (e) {
         console.log(e)
      }
   }
   render() {
      const { username, password } = this.state;

      AsyncStorage.getItem('@dataProfile', jsonValue)
      const jsonValue = JSON.stringify({ username, password })
      return (
         <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            style={styles.container}>
            <SnackBar
               color={this.state.snackBarError != true ? color.green : color.red}
               label={this.state.snackBarMessage}
               size={size.s30}
               ref={this.snackBar}
            />
            <StatusBarView />
            <LoadingView visible={this.props.loading} />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
               <View style={styles.fromLogin}>
                  <Image
                     source={images.logo_aqua}
                     style={{
                        resizeMode: 'contain',
                        width: widthScreen / 2,
                        height: widthScreen / 3,
                        alignSelf: 'center',
                        marginTop: size.s120 * 2,
                     }}
                  />
                  <TextField
                     maxLength={12}
                     ref={this.username}
                     style={{
                        marginVertical: size.s20,
                     }}
                     value={this.state.username}
                     onChangeText={(text) => {
                        this.setState({
                           username: text,
                        })
                     }}
                     size={size.s30}
                     label={`${I18n.t('Username')}`}
                  />
                  <TextField
                     maxLength={12}
                     showEye={true}
                     ref={this.password}
                     style={{
                        marginVertical: size.s20,
                     }}
                     value={this.state.password}
                     onChangeText={(text) => {
                        this.setState({
                           password: text,
                        })
                     }}
                     size={size.s30}
                     label={`${I18n.t('Password')}`}
                     secureTextEntry
                  />
                  <TouchableOpacity
                     style={styles.btn}
                     onPress={() => {
                        this.onLogin()
                     }}>
                     <Text style={{ color: '#fff', fontSize: 22, textAlign: 'center' }}>{I18n.t('SignIn').toUpperCase()}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                     style={styles.signup}
                     onPress={() => {
                        this.props.navigation.replace('SignUp')
                     }}>
                     <Text style={{ fontSize: size.h14 * 2, color: '#4F4F4F', paddingRight: size.h10 }}>
                        {I18n.t('DontHaveAccount')}
                     </Text>
                     <Text style={styles.txtSignup}>{I18n.t('SignUp')}</Text>
                  </TouchableOpacity>
               </View>
            </KeyboardAvoidingView>
         </ScrollView>
      )
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#CCD8ED',
   },
   content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: size.s25,
   },
   fromLogin: {
      flex: 1,
      padding: size.h20 * 2,
   },
   btn: {
      backgroundColor: '#003DA5',
      padding: 15,
      borderRadius: 10,
      marginTop: size.s10,
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   signup: {
      justifyContent: 'center',
      padding: size.s25,
      marginTop: size.s18,
      alignItems: 'center',
      flexDirection: 'row',
   },
   txtSignup: {
      fontSize: size.h18 * 2,
      color: '#003DA5',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
   },
})
