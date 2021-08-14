import React, { Component } from 'react'
import {
   StyleSheet,
   View,
   Image,
   TouchableWithoutFeedback,
   Animated,
   StatusBar,
   KeyboardAvoidingView,
   Platform,
   TouchableOpacity,
   Text,
   ScrollView,
   SafeAreaView,
} from 'react-native'
import images from '../../res/image/index'
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import size from '../../res/size'
import TextField from '../custom/TextField'
import { color } from '../../res/color'
import ChartDonut from '../custom/ChartDonut'
import { isValidEmailAddress, validateInput, valiDateidCard } from '../../res/function'
import StatusBarView from '../custom/StatusBarView'
import SnackBar from '../custom/SnackBar'
import LoadingView from '../custom/LoadingView'
import I18n from '../../settings/i18n'


export default class SignUpComponent extends Component {
   constructor(props) {
      super(props)
      this.state = {
         username: '',
         password: '',
         confirm: '',
         email: '',
         phone: '',
         idcard: '',
         shopcode: '',
         shopname: '',
         shopaddress: '',
         passwordConfirm: '',
         snackBarMessage: '',
         snackBarError: false,
      }
      this.username = React.createRef()
      this.password = React.createRef()
      this.confirm = React.createRef()
      this.email = React.createRef()
      this.phone = React.createRef()
      this.idcard = React.createRef()
      this.shopcode = React.createRef()
      this.shopname = React.createRef()
      this.shopaddres = React.createRef()
      this.snackBar = React.createRef()
      this.passwordConfirm = React.createRef()
      this.animatedIMG = new Animated.Value(0)
   }

   onNextStep = () => {
      const { username, password, shopaddress, email, phone, shopname, shopcode, idcard } = this.state
      const dataUser = {
         user_name: username,
         password: password,
         email: email,
         phone: phone,
         role_id: 3,
         shop_code: shopcode,
         shop_name: shopname,
         id_card: idcard,
         shop_address: shopaddress
      }
      this.checkData(dataUser)
   }
   checkData = (dataUser) => {
      const { username, password, shopaddress, email, phone, shopname, shopcode, idcard, passwordConfirm } = this.state
      let isCheckUser = false;
      let isCheckPass = false;
      let isCheckMail = false;
      let isCheckPhone = false;
      let isCheckShopeName = false;
      let isCheckShopCode = false;
      let isCheckIdCard = false;
      let isCheckPassConfirm = false;
      let isCheckShopAddres = false;

      if (username === '') {
         this.username.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('Username').toLowerCase()}`)
      } else if (username.length < 4) {
         this.username.current.error(`${I18n.t('morethen4')}`)
      } else if (username.match(/[!-\/:-@[-`{-~]/g)) {
         this.username.current.error(`${I18n.t('Username').toLowerCase()}` + ' ' + `${I18n.t('specialcharacters')}`)
      } else isCheckUser = true

      if (email === '') {
         this.email.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('Email').toLowerCase()}`)
      } else if (email.length === 0 || !email.trim()) {
         this.email.current.error(`${I18n.t('specialcharacters')}`)
      } else if (!isValidEmailAddress(email)) {
         this.email.current.error(`${I18n.t('format')}` + ' ' + 'email')
      } else isCheckMail = true;

      if (phone === '') {
         this.phone.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('Phone').toLowerCase()}`)
      } else if (phone.length < 10) {
         this.phone.current.error(`${I18n.t('characterPhone')}`)
      } else isCheckPhone = true

      if (idcard === '') {
         this.idcard.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('IDCard').toLowerCase()}`)
      } else if (idcard.length < 9) {
         this.idcard.current.error(`${I18n.t('characterIDcard')}`)
      } else isCheckIdCard = true

      if (password === '') {
         this.password.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('Password').toLowerCase()}`)
      } else if (password.length < 8) {
         this.password.current.error(`${I18n.t('characterPass')}`)
      } else isCheckPass = true

      if (passwordConfirm === '') {
         this.passwordConfirm.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('ConfirmPassword').toLowerCase()}`)
      } else if (password !== passwordConfirm) {
         this.passwordConfirm.current.error(`${I18n.t('confirmpass')}`)
      } else isCheckPassConfirm = true

      if (shopaddress === '') {
         this.shopaddres.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('ShopAddress').toLowerCase()}`)
      } else if (shopaddress.length < 10) {
         this.shopaddres.current.error(`${I18n.t('characterAdress')}`)
      }
      else isCheckShopAddres = true

      if (shopcode === '') {
         this.shopcode.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('ShopCode').toLowerCase()}`)
      } else if (shopname === '' || shopname === null || shopname === undefined) {
         this.shopcode.current.error(`${I18n.t('notfoundshop')}`)
      } else {
         isCheckShopeName = true
         isCheckShopCode = true;
      }

      if (isCheckUser && isCheckPass && isCheckShopAddres && isCheckMail && isCheckPhone && isCheckShopeName && isCheckShopCode && isCheckIdCard &&
         isCheckPassConfirm) this.props.navigation.navigate('BankInformation', { dataUser })


   }
   componentDidUpdate(prevProps) {
      if (this.props.loadingShopCode !== prevProps.loadingShopCode && !this.props.loadingShopCode) {
         if (this.props.dataShopCode) {
            this.setState({
               shopname: this.props.dataShopCode.shop_name,
            },
               () => {
                  if (!this.props.dataShopCode.shop_name) {
                     this.shopcode.current.error('Shop name does not exist please enter the shop code again')
                  }
               })

         }
         if (prevProps.errorShopName !== this.props.errorShopName) {
            if (this.props.errorShopName !== undefined || this.props.errorShopName !== null) {
               this.setState(
                  {
                     snackBarError: true,
                     snackBarMessage: 'No Data',
                  },
                  () => {
                     this.snackBar.current.showSnackBar()
                  },
               )
            }
         }
      }
   }
   onGetShopName = (value) => {
      this.props.onActionGetShopName(value)
   }
   render() {
      return (
         <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? null : 'padding'} style={{ flex: 1 }}>
               <SnackBar
                  color={this.state.snackBarError != true ? color.green : color.red}
                  label={this.state.snackBarMessage}
                  size={size.s30}
                  ref={this.snackBar}
               />
               <StatusBarView />
               <LoadingView visible={this.props.loadingShopCode} />
               <ScrollView
                  style={styles.container}
                  contentContainerStyle={{ flexGrow: 1 }}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled">
                  <View style={styles.body}>
                     <View style={styles.cricle}>
                        <ChartDonut percentage={50} />
                     </View>
                     <Text style={styles.textpage}>1 of 2</Text>

                     <View style={styles.content}>
                        <View style={styles.text01}>
                           <Text style={{ fontSize: size.h46, fontWeight: 'bold' }}>{I18n.t('Generalinformation')}</Text>
                        </View>

                        <View style={styles.text02}>
                           <Text style={{ fontSize: size.h36, color: '#828282' }}>{I18n.t('NextBank')}</Text>
                        </View>
                     </View>
                  </View>
                  <View style={styles.content}>
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
                        ref={this.email}
                        style={{
                           marginVertical: size.s20,
                        }}
                        value={this.state.email}
                        onChangeText={(text) => {
                           this.setState({
                              email: text,
                           })
                        }}
                        size={size.s30}
                        label="Email"

                     />
                     <View
                        style={{
                           flex: 1,
                           flexDirection: 'row',
                           justifyContent: 'space-between',
                           alignItems: 'center',
                           width: '50%',
                        }}>
                        <TextField
                           maxLength={11}
                           ref={this.phone}
                           style={{
                              marginVertical: size.s20,
                              width: '90%',
                           }}
                           value={this.state.phone}
                           onChangeText={(text) => {
                              this.setState({
                                 phone: text,
                              })
                           }}
                           size={size.s30}
                           label={`${I18n.t('Phone')}`}
                           numeric={true}
                        />
                        <TextField
                           maxLength={12}
                           ref={this.idcard}
                           style={{
                              marginVertical: size.s20,
                           }}
                           value={this.state.idcard}
                           onChangeText={(text) => {
                              this.setState({
                                 idcard: text,
                              })
                           }}
                           size={size.s30}
                           label={`${I18n.t('IDCard')}`}
                           numeric={true}
                        />
                     </View>

                     <TextField
                        maxLength={16}
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
                     <TextField
                        maxLength={16}
                        showEye={true}
                        ref={this.passwordConfirm}
                        style={{
                           marginVertical: size.s20,
                        }}
                        value={this.state.passwordConfirm}
                        onChangeText={(text) => {
                           this.setState({
                              passwordConfirm: text,
                           })
                        }}
                        size={size.s30}
                        label={`${I18n.t('ConfirmPassword')}`}
                        secureTextEntry
                     />
                     <TextField
                        ref={this.shopcode}
                        style={{
                           marginVertical: size.s20,
                        }}
                        value={this.state.shopcode}
                        onChangeText={(text) => {
                           this.setState({
                              shopcode: text,
                           })
                        }}
                        onBlur={() => {
                           this.onGetShopName(this.state.shopcode)
                        }}
                        size={size.s30}
                        label={`${I18n.t('ShopCode')}`}
                        numeric={true}
                     />
                     <TextField
                        ref={this.shopname}
                        style={{
                           marginVertical: size.s20,
                        }}
                        value={this.state.shopname}
                        onChangeText={(text) => {
                           this.setState({
                              shopname: text,
                           })
                        }}
                        editable={false}
                        size={size.s30}
                        label={`${I18n.t('ShopName')}`}
                     />
                     <TextField
                        ref={this.shopaddres}
                        style={{
                           marginVertical: size.s20,
                        }}
                        value={this.state.shopaddress}
                        onChangeText={(text) => {
                           this.setState({
                              shopaddress: text,
                           })
                        }}

                        size={size.s30}
                        label={`${I18n.t('ShopAddress')}`}
                     />

                     <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                           this.onNextStep()
                        }}>
                        <Text style={{ color: '#fff', fontSize: 22, textAlign: 'center' }}>{I18n.t('NextStep')}</Text>
                     </TouchableOpacity>

                     <TouchableOpacity
                        style={styles.login}
                        onPress={() => {
                           this.props.navigation.replace('Login')
                        }}>
                        <Text style={{ fontSize: size.h14 * 2, color: '#4F4F4F', paddingRight: size.h10 }}>
                           {I18n.t('Already')}
                        </Text>
                        <Text style={styles.txtLogin}>{I18n.t('SignIn')}</Text>
                     </TouchableOpacity>
                  </View>
               </ScrollView>
            </KeyboardAvoidingView>
         </TouchableWithoutFeedback>
      )
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#CCD8ED',
   },
   content: {
      justifyContent: 'center',
      paddingHorizontal: size.s30,
      padding: size.s30,
   },
   btn: {
      backgroundColor: '#003DA5',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      marginTop: size.s10,
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   login: {
      justifyContent: "center",
      padding: size.s25,
      marginTop: size.s18,
      alignItems: 'center',
      flexDirection: "row"
   },
   txtLogin: {
      fontSize: size.h18 * 2,
      color: '#003DA5',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
   },
   body: {
      flexDirection: 'row',
      padding: size.h24,
      justifyContent: 'space-between',
   },
   textpage: {
      fontSize: size.h28,
      color: '#4F4F4F',
      position: 'absolute',
      bottom: 0,
      paddingLeft: size.h65,
      paddingBottom: size.s80 + 2,
   },
   cricle: {
      transform: [{ rotate: '180deg' }],
   },
   content: {
      padding: size.h16,
   },
   text01: {
      paddingLeft: size.h70,
      justifyContent: 'flex-end',
   },
   text02: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
   },
})
