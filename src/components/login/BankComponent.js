import React, { Component } from 'react'
import {
   SafeAreaView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
   FlatList,
   StatusBar,
   TouchableWithoutFeedback,
   KeyboardAvoidingView,
   Platform,
   Image,
} from 'react-native'
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import { color } from '../../res/color'
import size from '../../res/size'
import BottomSheet from '../custom/BottomSheet'
import ChartDonut from '../custom/ChartDonut'
import TextField from '../custom/TextField'
import { valiDateBankNum } from '../../res/function'
import StatusBarView from '../custom/StatusBarView'
import SnackBar from '../custom/SnackBar'
import images from '../../res/image'
import LoadingView from '../custom/LoadingView'
import { userBankSignUp } from '../../settings/index'
import I18n from '../../settings/i18n'

export class BankComponent extends Component {
   constructor(props) {
      super(props)
      this.state = {
         Bank: [],
         selectedBankName: userBankSignUp.bank || '',
         account_number: userBankSignUp.accNum || '',
         account_user_name: userBankSignUp.accHol || '',
         snackBarMessage: '',
         snackBarError: false,
      }
      this.BottomSheetBank = React.createRef()
      this.selectedBankNameRef = React.createRef()
      this.account_number = React.createRef()
      this.account_user_name = React.createRef()
      this.snackBar = React.createRef()
   }

   componentDidMount() {
      this.props.onGetBankAction()
   }
   componentDidUpdate(prevProps) {
      if (prevProps.loading !== this.props.loading && !this.props.loading) {
         if (prevProps.data !== this.props.data) {
            if (this.props.data) {
               this.setState({
                  Bank: this.props.data,
               })
            } else {
               this.setState(
                  {
                     snackBarMessage: true,
                     snackBarMessage: this.props.data.error,
                  },
                  () => {
                     this.snackBar.current.showSnackBar()
                  },
               )
            }
         }
         if (prevProps.error !== this.props.error) {
            if (this.props.error !== undefined || this.props.error !== null) {
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
      }
      //SignUpApi

      if (prevProps.loadingSignUp !== this.props.loadingSignUp && !this.props.loadingSignUp) {
         if (prevProps.dataSignUp !== this.props.dataSignUp) {
            if (this.props.dataSignUp.error) {
               console.log(this.props.dataSignUp)
               this.setState(
                  {
                     snackBarError: true,
                     snackBarMessage: this.props.dataSignUp.message,
                  },
                  () => {
                     this.snackBar.current.showSnackBar()
                  },
               )
            } else {
               this.setState(
                  {
                     snackBarError: false,
                     snackBarMessage: `${I18n.t('success')}`,
                  },
                  async () => {
                     this.snackBar.current.showSnackBar()
                     setTimeout(() => {
                        ; (userBankSignUp.bank = ''),
                           (userBankSignUp.accNum = ''),
                           (userBankSignUp.accHol = ''),
                           this.props.navigation.replace('Login')
                     }, 1000)
                  },
               )
            }
         }
         if (prevProps.errorSignUp !== this.props.errorSignUp) {
            if (this.props.errorSignUp !== undefined || this.props.errorSignUp !== null) {
               console.log(this.props.errorSignUp)
               this.setState(
                  {
                     AlertError: true,
                     snackBarMessage: this.props.errorSignUp,
                  },
                  () => {
                     this.snackBar.current.showSnackBar()
                  },
               )
            }
         }
      }
   }
   onSignUp = () => {
      const { selectedBankName, account_number, account_user_name } = this.state
      const dataSignUp = {
         account_number: account_number,
         bank_name: selectedBankName,
         email: this.props?.route.params?.dataUser.email,
         id_card: this.props?.route.params?.dataUser.id_card,
         password: this.props?.route.params?.dataUser.password,
         phone: this.props?.route.params?.dataUser.phone,
         role_id: 3,
         shop_code: this.props?.route.params?.dataUser.shop_code,
         shop_name: this.props?.route.params?.dataUser.shop_name,
         user_name: this.props?.route.params?.dataUser.user_name,
         user_name_bank: account_user_name,
         shop_address: this.props?.route?.params?.dataUser.shop_address
      }
      this.checkData(dataSignUp)
   }
   renderStatus = ({ item, index }) => (
      <TouchableOpacity
         style={styles.listBank}
         onPress={() => {
            this.BottomSheetBank.current.close(() =>
               this.setState({ selectedBankName: item.vn_name }, () => (userBankSignUp.bank = item.vn_name)),
            )
            this.selectedBankNameRef.current.error('')
         }}>
         <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: item.color, padding: size.s10 }} />
            <Text index={index} style={styles.txtNameBank}>
               {item.vn_name}
            </Text>
         </View>
      </TouchableOpacity>
   )
   checkData = (dataSignUp) => {
      const { selectedBankName, account_number, account_user_name } = this.state
      let isCheckAccName = false
      let isCheckBankName = false
      let isCheckAccNum = false

      if (selectedBankName === '') {
         this.selectedBankNameRef.current.error(I18n.t('validateBank'))
      } else isCheckBankName = true

      if (account_number === '') {
         this.account_number.current.error(I18n.t('validateAccNum'))
      } else if (account_number.length < 6) {
         this.account_number.current.error(I18n.t('validateAccNumLength'))
      } else if (account_number.match(/[!-\/:-@[-`{-~]/g)) {
         this.account_number.current.error(I18n.t('validateSpecialCharacters'))
      } else isCheckAccNum = true

      if (account_user_name === '') {
         this.account_user_name.current.error(I18n.t('validateAccountHolders'))
      } else if (account_user_name.match(/[0-9]/g)) {
         this.account_user_name.current.error(I18n.t('validateAccountHoldersCheckNum'))
      } else if (account_user_name.match(/[!-\/:-@[-`{-~]/g)) {
         this.account_user_name.current.error(I18n.t('validateSpecialCharacters'))
      } else isCheckAccName = true

      if (isCheckBankName && isCheckAccNum && isCheckAccName) this.props.onSignUpAction(dataSignUp)
   }
   render() {
      const { Bank, selectedBankName, account_number, account_user_name } = this.state

      return (
         <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
               <SnackBar
                  color={this.state.snackBarError != true ? color.green : color.red}
                  label={this.state.snackBarMessage}
                  size={size.s30}
                  ref={this.snackBar}
               />
               <StatusBarView />
               <LoadingView visible={this.props.loadingSignUp} />

               <View style={styles.container}>
                  <View style={styles.body}>
                     <View style={styles.cricle}>
                        <ChartDonut percentage={100} />
                     </View>
                     <Text style={styles.textpage}>2 of 2</Text>

                     <View style={styles.content}>
                        <View style={styles.text01}>
                           <Text style={{ fontSize: size.h46, fontWeight: 'bold' }}>{I18n.t('BANK_INFORMATION')}</Text>
                        </View>
                     </View>
                  </View>
                  <View style={{ paddingHorizontal: size.s40 }}>
                     <TouchableOpacity
                        onPress={() => {
                           this.BottomSheetBank.current.open()
                        }}>
                        <View pointerEvents="none">
                           <TextField
                              ref={this.selectedBankNameRef}
                              label={I18n.t('bankName')}
                              editable={false}
                              style={{ backgroundColor: 'white', marginVertical: size.s20 }}
                              value={selectedBankName}
                           />
                        </View>
                     </TouchableOpacity>
                     <BottomSheet ref={this.BottomSheetBank} title={I18n.t('List_Bank')} isShowNull>
                        <FlatList
                           showsVerticalScrollIndicator={false}
                           data={Bank}
                           keyExtractor={(item, index) => {
                              index.toString()
                           }}
                           renderItem={this.renderStatus}
                           style={{
                              width: '100%',
                              backgroundColor: '#fff',
                           }}
                           contentContainerStyle={{}}
                           legacyImplementation={true}
                           windowSize={30}
                           removeClippedSubviews={true}
                           disableIntervalMomentum={true}
                        />
                     </BottomSheet>
                     <TextField
                        maxLength={15}
                        style={{
                           marginVertical: size.s20,
                        }}
                        ref={this.account_number}
                        onChangeText={(text) => {
                           this.setState({
                              account_number: text,
                           })
                           userBankSignUp.accNum = text
                        }}
                        size={size.s30}
                        label={I18n.t('accountnumber')}
                        value={account_number}
                     />
                     <TextField
                        maxLength={50}
                        ref={this.account_user_name}
                        style={{
                           marginVertical: size.s20,
                        }}
                        onChangeText={(text) => {
                           this.setState({
                              account_user_name: text,
                           })
                           userBankSignUp.accHol = text
                        }}
                        size={size.s30}
                        label={I18n.t('accountname')}
                        value={account_user_name}
                     />
                     <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                           style={styles.btn}
                           onPress={() => {
                              this.props.navigation.goBack()
                           }}>
                           <Image style={styles.leftIcon1} source={images.ic_arrowleft} />
                        </TouchableOpacity>
                        <TouchableOpacity
                           style={[styles.btn2, { flex: 1 }]}
                           onPress={() => {
                              this.onSignUp()
                           }}>
                           <Text style={{ color: '#fff', fontSize: 22, textAlign: 'center' }}>{I18n.locale === 'vi' ? "ĐĂNG KÝ" : 'SIGN UP'}</Text>
                        </TouchableOpacity>
                     </View>
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
               </View>
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
   leftIcon1: {
      alignSelf: 'center',
      width: size.h52,
      height: size.h52,
      // paddingRight: size.s7,
   },
   btn: {
      justifyContent: 'center',
      marginBottom: size.h40,
      backgroundColor: '#ffff',
      padding: 15,
      borderTopStartRadius: 10,
      borderBottomStartRadius: 10,
      // shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      marginTop: size.s10,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderColor: '#003DA5',
      borderWidth: 2,
   },
   btn2: {
      justifyContent: 'center',
      marginBottom: size.h40,
      backgroundColor: '#003DA5',
      padding: 15,
      borderTopEndRadius: 10,
      borderBottomEndRadius: 10,
      //shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      marginTop: size.s10,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
   },
   login: {
      justifyContent: 'center',
      padding: size.s25,
      marginTop: size.s18,
      alignItems: 'center',
      flexDirection: 'row',
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
      width: "100%",
      padding: size.h16,
   },
   text01: {
      paddingHorizontal: size.s15,
      justifyContent: 'flex-end',
   },
   text02: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
   },
   listBank: {
      paddingVertical: size.s10,
      borderBottomWidth: 1,
      borderColor: color.borderColor,
      width: '100%',
   },
   txtNameBank: {
      fontSize: size.s30,
      paddingVertical: 15,
      paddingRight: size.s30,
   },
})

export default BankComponent
