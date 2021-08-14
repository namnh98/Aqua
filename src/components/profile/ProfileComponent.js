import React, { Component } from 'react'
import {
   Text,
   View,
   StyleSheet,
   TouchableOpacity,
   ScrollView,
   FlatList,
   Dimensions,
   Alert,

} from 'react-native'
import size from '../../res/size'
import Header from '../custom/Header'
import TextField from '../custom/TextField'
import BottomSheet from '../custom/BottomSheet'
import UploadImgAva from './custom/UploadImgAva'
import { RNS3 } from 'react-native-aws3'
import { S3Info, userProfile } from '../../settings/index'
import LoadingView from '../custom/LoadingView'
import SnackBar from '../custom/SnackBar'
import { color } from '../../res/color'
import { isValidEmailAddress, valiDateidCard, validateInput } from '../../res/function'
import I18n from '../../settings/i18n'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class ProfileComponent extends Component {
   constructor(props) {
      super(props)
      this.state = {
         Bank: [],
         selectedBankName: '',
         OldPassword: '',
         NewPassword: '',
         ConfirmPassword: '',
         image: '',
         bucketName: '',
         username: '',
         shop_code: '',
         shop_name: '',
         shop_address: '',
         email: '',
         phone: '',
         idcard: '',
         bank: '',
         account: '',
         username_bank: '',
         total_so: '',
         total_incentive: '',
         total_point: '',
         snackBarMessage: '',
         snackBarError: false,
         _response: '',
         modal: false,
         selectedLang: '',
         i18n: I18n,
         dataLanguage: [
            { title: `${I18n.t('vietnamese')}`, lang: 'vi' },
            { title: I18n.t('english'), lang: 'en' },
         ]
      }

      this.BottomSheetRef = React.createRef()
      this.BottomSheetChangePasswordRef = React.createRef()
      this.BottomSheetChangeBankRef = React.createRef()
      this.BottomSheetBank = React.createRef()
      this.oldPasswordRef = React.createRef()
      this.newPasswordRef = React.createRef()
      this.confirmPasswordRef = React.createRef()
      this.snackBar = React.createRef()
      this.email = React.createRef()
      this.phone = React.createRef()
      this.idcard = React.createRef()
      this.selectedBankNameRef = React.createRef()
      this.accountRef = React.createRef()
      this.username_bankRef = React.createRef()
      this.BottomSheetChangeLanguagesRef = React.createRef()
   }
   async componentDidMount() {
      await this.props.onGetBankAction()
      await this.props.onGetUserAction()
      this.props.navigation.addListener('focus', () => {
         this.props.onGetUserAction()
      })
   }
   setMainLocaleLanguage = language => {
      let i18n = this.state.i18n;
      i18n.locale = language;
      this.setState({ i18n });
   }
   componentDidUpdate(prevProps) {
      if (this.props.lang !== prevProps.lang && !this.props.lang) {
         console.log('language');
         this.props.onGetUserAction()
      }

      if (prevProps.loading !== this.props.loading && !this.props.loading) {
         if (prevProps.data !== this.props.data) {
            if (this.props.data) {
               this.setState({
                  username: this.props.data.user_name,
                  shop_code: this.props.data.shop_code,
                  shop_name: this.props.data.shop_name,
                  shop_address: this.props.data.shop_address,
                  email: this.props.data.email,
                  phone: this.props.data.phone,
                  idcard: this.props.data.id_card,
                  bank: this.props.data.bank,
                  account: this.props.data.account_number,
                  username_bank: this.props.data.user_name_bank,
                  total_so: this.props.data?.total_summary?.total_so,
                  total_incentive: this.props?.data?.total_summary?.total_incentive,
                  total_point: this.props?.data?.total_summary?.total_point,
                  selectedBankName: this.props?.data?.bank,
               })
                  ; (userProfile.user_name = this.props.data.user_name),
                     (userProfile.email = this.props.data.email),
                     (userProfile.phone = this.props.data.phone),
                     (userProfile.user_name_bank = this.props.data.user_name_bank),
                     (userProfile.shop_code = this.props.data.shop_code),
                     (userProfile.shop_address = this.props.data.shop_address),
                     (userProfile.shop_name = this.props.data.shop_name),
                     (userProfile.avatar = this.props.data.avatar),
                     (userProfile.is_active = this.props.data.is_active),
                     (userProfile.bank_name = this.props.data.bank),
                     (userProfile.role = this.props.data.role),
                     (userProfile.account_number = this.props.data.account_number),
                     (userProfile.id_card = this.props.data.id_card)
            } else {
               this.setState(
                  {
                     snackBarError: true,
                     snackBarMessage: this.props.error,
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
                     snackBarError: true,
                     snackBarMessage: this.props.error,
                  },
                  () => {
                     this.snackBar.current.showSnackBar()
                  },
               )
            }
         }
      }


      if (this.props.loadingUpdate !== prevProps.loadingUpdate && !this.props.loadingUpdate) {
         if (this.props.dataUpdate) {
            // console.log(this.props.dataUpdate)
            this.setState(
               {
                  snackBarError: false,
                  snackBarMessage: `${I18n.t('success')}`,
                  modal: false,
               },
               () => {
                  this.snackBar.current.showSnackBar()
               },
            )
            this.BottomSheetRef.current.close()
            this.BottomSheetChangeBankRef.current.close()
            this.props.onGetUserAction()
         }
         if (prevProps.errorUpdate !== this.props.errorUpdate) {
            if (this.props.errorUpdate !== undefined || this.props.errorUpdate !== null) {
               this.setState(
                  {
                     snackBarError: true,
                     snackBarMessage: `${I18n.t('error')}`,
                  },
                  () => {
                     this.snackBar.current.showSnackBar()
                  },
               )
            }
         }
      }
      //change password
      if (this.props.loadingChangePassword !== prevProps.loadingChangePassword && !this.props.loadingChangePassword) {
         if (this.props.dataChangePassword.error) {
            this.setState(
               {
                  snackBarError: true,
                  snackBarMessage: this.props.dataChangePassword.message,
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
                  OldPassword: '',
                  NewPassword: '',
                  ConfirmPassword: '',
               },
               () => {
                  this.snackBar.current.showSnackBar()
               },
            )
            this.BottomSheetChangePasswordRef.current.close()
            this.props.onGetUserAction()
         }
         if (prevProps.errorChangePassword !== this.props.errorChangePassword) {
            if (this.props.errorChangePassword !== undefined || this.props.errorChangePassword !== null) {
               this.setState(
                  {
                     snackBarError: true,
                     snackBarMessage: `${I18n.t('error')}`,
                  },
                  () => {
                     this.snackBar.current.showSnackBar()
                  },
               )
            }
         }
      }
      // bank information
      if (prevProps.loadingBank !== this.props.loadingBank && !this.props.loadingBank) {
         if (prevProps.dataBank !== this.props.dataBank) {
            if (this.props.dataBank) {
               this.setState({ Bank: this.props.dataBank })
            } else {
               this.setState(
                  {
                     snackBarError: false,
                     snackBarMessage: `${I18n.t('error')}`,
                  },
                  () => {
                     this.snackBar.current.showSnackBar()
                  },
               )
            }
         }
         if (prevProps.errorBank !== this.props.errorBank) {
            if (this.props.errorBank !== undefined || this.props.errorBank !== null) {
               this.setState(
                  {
                     snackBarError: false,
                     snackBarMessage: `${I18n.t('error')}`,
                  },
                  () => {
                     this.snackBar.current.showSnackBar()
                  },
               )
            }
         }
      }
   }

   onChangePassword() {
      const { OldPassword, NewPassword, ConfirmPassword } = this.state
      let isCheckOldPass = false
      let isCheckNewPass = false
      let isCheckConfPass = false

      if (OldPassword === '') {
         this.oldPasswordRef.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('oldpassword').toLowerCase()}`)
      } else if (OldPassword.length === 0 || !OldPassword.trim()) {
         this.oldPasswordRef.current.error(`${I18n.t('specialcharacters2')}`)
      } else if (OldPassword.length < 8) {
         this.oldPasswordRef.current.error(`${I18n.t('morethen8')}`)
      } else isCheckOldPass = true

      if (NewPassword === '') {
         this.newPasswordRef.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('newpassword').toLowerCase()}`)
      } else if (NewPassword.length === 0 || !NewPassword.trim()) {
         this.newPasswordRef.current.error(`${I18n.t('specialcharacters2')}`)
      } else if (NewPassword === OldPassword) {
         this.newPasswordRef.current.error(`${I18n.t('pass')}`)
      } else if (NewPassword.length < 8) {
         this.newPasswordRef.current.error(`${I18n.t('morethen8')}`)
      } else isCheckNewPass = true

      if (ConfirmPassword === '') {
         this.confirmPasswordRef.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('ConfirmPassword').toLowerCase()}`)
      } else if (ConfirmPassword.length === 0 || !ConfirmPassword.trim()) {
         this.confirmPasswordRef.current.error(`${I18n.t('specialcharacters2')}`)
      } else if (NewPassword !== ConfirmPassword) {
         this.confirmPasswordRef.current.error('Password confirmation incorrect')
      } else isCheckConfPass = true

      if (isCheckOldPass && isCheckNewPass && isCheckConfPass) {
         const data = {
            current_password: OldPassword,
            new_password: ConfirmPassword,
         }
         this.props.onChangePassword(data)

         this.BottomSheetChangePasswordRef.current.close()
      }
   }
   //////Logout
   onLogOut = () => {
      Alert.alert('', `${I18n.t('logout')}`, [
         {
            text: `${I18n.t('No')}`,
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
         },
         {
            text: `${I18n.t('Yes')}`,
            onPress: async () => {
               try {
                  await AsyncStorage.removeItem('@dataProfile')
               } catch (e) {
                  // remove error
               }
               this.props.getTokenAction({ token: ' ' })
               userProfile.tokenFB == '',
                  userProfile.access_token == '',
                  userProfile.user_id == 0,
                  userProfile.user_name == '',
                  userProfile.email == '',
                  userProfile.ic_card == 0,
                  userProfile.phone == '',
                  userProfile.shop_code == '',
                  userProfile.shop_name == '',
                  userProfile.shop_address == '',
                  userProfile.bank_name == '',
                  userProfile.account_number == 0,
                  userProfile.user_name_bank == '',
                  this.props.onClearAction()
               this.props.navigation.replace('Login')
            },
         },
      ])
   }
   ///// up image server AWS
   onUploadFileBucket = (file) => {
      const option = {
         bucket: S3Info.bucket,
         region: S3Info.region,
         accessKey: S3Info.accessKey,
         secretKey: S3Info.secretKey,
         ContentType: S3Info.ContentType,
         acl: S3Info.acl,
         successActionStatus: S3Info.successActionStatus,
      }

      file['name'] = S3Info.folder_upload + `${userProfile.user_name}/` + file.name
      RNS3.put(file, option)
         .progress((e) => {
            let result = parseInt((e.loaded * 100) / e.total)
            console.log('Uploaded: ' + result + '%')
         })
         .then((response) => {
            this.setState(
               {
                  _response: response.body.postResponse.location,
               },
               () => {
                  this.onUpdateImage()
               },
            )
         })
   }
   ///// upload image
   onUpdateImage = () => {
      const { _response, idcard } = this.state
      const data = {
         avatar: _response,
         user_name: userProfile.user_name,
         email: userProfile.email,
         role: userProfile.role,
         id_card: idcard,
         phone: userProfile.phone,
         is_active: userProfile.is_active,
         shop_code: userProfile.shop_code,
         shop_address: userProfile.shop_address,
         shop_name: userProfile.shop_name,
         bank_name: userProfile.bank_name,
         account_number: userProfile.account_number,
         user_name_bank: userProfile.user_name_bank,
      }
      this.props.onUpdateUserAction(data)
   }
   //////// edit profile
   onEditProfile = () => {
      const { username, shop_name, shop_code, idcard, phone, email, shop_address } = this.state
      const data = {
         avatar: userProfile.avatar,
         user_name: username,
         email: email,
         role: userProfile.role,
         id_card: idcard,
         phone: phone,
         is_active: userProfile.is_active,
         shop_code: shop_code,
         shop_name: shop_name,
         shop_address: shop_address,
         bank_name: userProfile.bank_name,
         account_number: userProfile.account_number,
         user_name_bank: userProfile.user_name_bank,

      }
      this.onCheck(data)
   }
   //// check user
   onCheck(data) {
      const { email, phone, idcard } = this.state
      let isCheckEmail = false
      let isCheckPhone = false
      let isCheckIdCard = false

      if (email === '') {
         this.email.current.error(`${I18n.t('PleaseEnter')}` + ' ' + 'email')
      } else if (email.length === 0 || !email.trim()) {
         this.email.current.error('Email' + ' ' + `${I18n.t('specialcharacters2')}`)
      } else if (!isValidEmailAddress(email)) {
         this.email.current.error(`${I18n.t('format')}` + ' ' + 'email')
      } else isCheckEmail = true

      if (phone === '') {
         this.phone.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('Phone')}`)
      } else if (phone.length === 0 || !phone.trim()) {
         this.phone.current.error((`${I18n.t('Phone')}` + ' ' + `${I18n.t('specialcharacters2')}`))
      } else if (phone.match(/[0-9]/g).length !== phone.length) {
         this.phone.current.error(`${I18n.t('Phone')}` + ' ' + `${I18n.t('specialcharacters2')}`)
      } else if (!validateInput(phone)) {
         this.phone.current.error(`${I18n.t('format')}` + ' ' + `${I18n.t('Phone').toLowerCase()}`)
      } else isCheckPhone = true

      if (idcard === '') {
         this.idcard.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('IDCard').toLowerCase()}`)

      } else if (idcard.length === 0 || !idcard.trim()) {
         this.idcard.current.error(`${I18n.t('IDCard')}` + ' ' + `${I18n.t('specialcharacters2')}`)
      } else if (!valiDateidCard(idcard)) {
         this.idcard.current.error(`${I18n.t('format')}` + ' ' + `${I18n.t('IDCard').toLowerCase()}`)
      } else isCheckIdCard = true

      if (isCheckEmail && isCheckPhone && isCheckIdCard) this.props.onUpdateUserAction(data)
   }
   ////// item bank
   renderStatus = ({ item, index }) => (
      <TouchableOpacity
         style={styles.listBank}
         onPress={() => {
            this.BottomSheetBank.current.close(() => this.setState({ selectedBankName: item.vn_name }))
         }}>
         <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: item.color, padding: size.s10 }} />
            <Text
               index={index}
               style={{
                  fontSize: size.s30,
                  paddingVertical: 15,
                  paddingRight: size.s30,
               }}>
               {item.vn_name}
            </Text>
         </View>
      </TouchableOpacity>
   )
   renderLang = () => (
      <TouchableOpacity
         style={styles.listBank}
         onPress={() => {
            this.BottomSheetChangeLanguagesRef.current.close(() => {
               this.props.onChangeLanguage('vi')

            })
         }}>
         <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ padding: size.s10 }} />
            <Text

               style={{
                  fontSize: size.s30,
                  paddingVertical: 15,
                  paddingRight: size.s30,
               }}>
               {`${I18n.t('vietnamese')}`}
            </Text>
         </View>
      </TouchableOpacity>
   )
   //// chane bank status
   onChangeBankInformation = () => {
      const { username_bank, selectedBankName, account } = this.state
      const data = {
         avatar: userProfile.avatar,
         user_name: userProfile.user_name,
         email: userProfile.email,
         role: userProfile.role,
         id_card: userProfile.id_card,
         phone: userProfile.phone,
         is_active: userProfile.is_active,
         shop_code: userProfile.shop_code,
         shop_name: userProfile.shop_name,
         shop_address: userProfile.shop_address,
         bank_name: selectedBankName,
         account_number: account,
         user_name_bank: username_bank,
      }
      this.onCheckBank(data)
   }
   onCheckBank = (data) => {
      const { username_bank, selectedBankName, account } = this.state
      let isCheckAccName = false
      let isCheckBankName = false
      let isCheckAccNum = false

      if (selectedBankName === '') {
         this.selectedBankNameRef.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('bank').toLowerCase()}`)

      } else isCheckBankName = true

      if (account === '') {
         this.accountRef.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('accountnumber').toLowerCase()}`)

      } else if (account.length < 6) {
         this.accountRef.current.error(`${I18n.t('morethen6')}`)
      } else if (account.match(/[!-\/:-@[-`{-~]/g)) {
         this.accountRef.current.error(`${I18n.t('specialcharacters2')}`)
      } else isCheckAccNum = true

      if (username_bank === '') {
         this.username_bankRef.current.error(`${I18n.t('PleaseEnter')}` + ' ' + `${I18n.t('accountname').toLowerCase()}`)
      } else if (username_bank.length === 0 || !username_bank.trim()) {
         this.username_bankRef.current.error(`${I18n.t('specialcharacters2')}`)
      } else isCheckAccName = true

      if (isCheckBankName && isCheckAccNum && isCheckAccName) this.props.onUpdateUserAction(data)
   }
   render() {
      const {
         OldPassword,
         NewPassword,
         ConfirmPassword,
         username,
         shop_name,
         shop_address,
         shop_code,
         idcard,
         phone,
         email,
         bank,
         account,
         username_bank,
         total_so,
         total_incentive,
         total_point,
         selectedBankName,
         modal,
      } = this.state
      return (
         <View style={styles.container}>
            <Header
               title={I18n.t('Profile')}
               isShowNotify
               onPressNotifi={() => this.props.navigation.navigate('NotificationComponent')}
            />
            <SnackBar
               color={this.state.snackBarError != true ? color.green : color.red}
               label={this.state.snackBarMessage}
               size={size.s30}
               ref={this.snackBar}
            />
            <LoadingView visible={this.props.loading} />

            <ScrollView
               keyboardShouldPersistTaps="handled"
               contentContainerStyle={{ flexGrow: 1 }}
               showsVerticalScrollIndicator={false}>
               <View
                  style={{
                     textAlign: 'center',
                     paddingHorizontal: size.s40,
                  }}>
                  <UploadImgAva
                     onUpload={(image) => {
                        // console.log('file avatar:', image)
                        this.setState({ image: image }, () => {
                           this.onUploadFileBucket(image)
                        })
                     }}
                  />

                  <Text style={{ textAlign: 'center', fontSize: size.h24 * 2, fontWeight: 'bold' }}>{email}</Text>
                  <View
                     style={{
                        textAlign: 'center',
                        padding: size.s30,
                        marginHorizontal: size.s40,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginVertical: size.s30,
                        borderRadius: size.s60 + size.s2,
                     }}>
                     <View>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{I18n.t('Total')} S.O</Text>
                        <Text style={{ textAlign: 'center', color: '#4F4F4F' }}>{total_so} S.O</Text>
                     </View>
                     <View
                        style={{
                           paddingHorizontal: size.s40,
                           borderLeftWidth: 1,
                           borderRightWidth: 1,
                           borderColor: '#EDEDED',
                        }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{I18n.t('TotalIncentive')}</Text>
                        <Text style={{ textAlign: 'center', color: '#4F4F4F' }}>{total_incentive}</Text>
                     </View>
                     <View
                        style={{
                           paddingHorizontal: size.s20,
                        }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{I18n.t('Point')}</Text>
                        <Text style={{ textAlign: 'center', color: '#4F4F4F' }}>{total_point}</Text>
                     </View>
                  </View>
                  <Text style={{ fontWeight: 'bold', fontSize: size.h18 * 2, paddingBottom: size.h20 }}>{I18n.t('Profile')}</Text>

                  <TextField
                     onChangeText={(text) => { }}
                     size={size.s30}
                     label={`${I18n.t('ShopCode')}`}
                     editable={false}
                     value={shop_code}
                  />
                  <TextField
                     editable={false}
                     onChangeText={(text) => { }}
                     value={shop_name}
                     size={size.s30}
                     label={`${I18n.t('ShopName')}`}
                  />
                  <TextField
                     editable={false}
                     onChangeText={(text) => { }}
                     value={shop_address}
                     size={size.s30}
                     label={`${I18n.t('ShopAddress')}`}
                  />
                  <TextField
                     editable={false}
                     onChangeText={(text) => { }}
                     size={size.s30}
                     label="Email"
                     value={this.props.data?.email}
                  />
                  <TextField
                     editable={false}
                     onChangeText={(text) => { }}
                     size={size.s30}

                     label={`${I18n.t('Phone')}`}
                     value={this.props.data?.phone}
                  />
                  <TextField
                     editable={false}

                     onChangeText={(text) => { }}
                     size={size.s30}
                     label={`${I18n.t('IDCard')}`}
                     value={this.props.data?.id_card}
                  />
                  <Text style={{ fontWeight: 'bold', fontSize: size.h18 * 2, paddingBottom: size.h20 }}>
                     {I18n.t('BankInformation')}
                  </Text>
                  <TextField
                     editable={false}
                     onChangeText={(text) => { }}
                     size={size.s30}
                     label={`${I18n.t('bank')}`}
                     value={bank}
                  />
                  <TextField
                     editable={false}
                     onChangeText={(text) => { }}
                     size={size.s30}
                     label={`${I18n.t('accountnumber')}`}
                     value={this.props.data?.account_number}
                  />
                  <TextField
                     editable={false}
                     onChangeText={(text) => { }}
                     size={size.s30}
                     label={`${I18n.t('accountname')}`}
                     value={this.props.data?.user_name_bank}
                  />
                  <Text style={{ fontWeight: 'bold', fontSize: size.h18 * 2 }}>{I18n.t('ModifyAccount')}</Text>
               </View>
               <View style={styles.content}>
                  <TouchableOpacity
                     onPress={() => {
                        this.BottomSheetRef.current.open()
                     }}
                     style={styles.btn}>
                     <Text style={styles.btn_title}>{I18n.t('EditProfile')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={() => {
                        this.BottomSheetChangeBankRef.current.open()
                     }}
                     style={styles.btn}>
                     <Text style={styles.btn_title}>{I18n.t('ModifyBankAccount')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={() => {
                        this.BottomSheetChangePasswordRef.current.open()
                     }}
                     style={styles.btn}>
                     <Text style={styles.btn_title}>{I18n.t('ChangePasswords')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={() => {
                        this.BottomSheetChangeLanguagesRef.current.open()
                     }}
                     style={styles.btn}>
                     <Text style={styles.btn_title}>{I18n.t('ChangeLanguage')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={() => {
                        this.onLogOut()
                     }}
                     style={styles.btn}>
                     <Text style={styles.btn_title}>{I18n.t('SignOut')}</Text>
                  </TouchableOpacity>
               </View>

               <BottomSheet
                  ref={this.BottomSheetRef}
                  isShowRefresh
                  onReset={() => {
                     this.setState({
                        email: this.props?.data?.email,
                        phone: this.props?.data?.phone,
                        idcard: this.props?.data?.id_card,
                     })
                  }}
                  title={I18n.t('EditProfile')}
                  height={Dimensions.get('screen').height / 1.1}>
                  <LoadingView visible={this.props.loadingUpdate} />
                  <ScrollView
                     contentContainerStyle={{ flexGrow: 1 }}
                     showsVerticalScrollIndicator={false}
                     style={{ backgroundColor: '#CCD8ED', flex: 1, paddingHorizontal: size.s30 }}>
                     <TextField
                        ref={this.email}
                        style={{
                           marginVertical: size.s20,
                        }}
                        onChangeText={(text) => {
                           this.setState({
                              email: text,
                           })
                        }}
                        size={size.s30}
                        label="Email"
                        value={email}
                     />
                     <TextField
                        maxLength={11}
                        ref={this.phone}
                        style={{
                           marginVertical: size.s20,
                        }}
                        onChangeText={(text) => {
                           this.setState({
                              phone: text,
                           })
                        }}
                        size={size.s30}
                        label={`${I18n.t('Phone')}`}
                        numeric={true}
                        value={phone}
                     />
                     <TextField
                        maxLength={12}
                        ref={this.idcard}
                        style={{
                           marginVertical: size.s20,
                        }}
                        onChangeText={(text) => {
                           this.setState({
                              idcard: text,
                           })
                        }}
                        size={size.s30}
                        label={`${I18n.t('IDCard')}`}
                        value={idcard}
                        numeric={true}
                     />
                     <TextField
                        style={{
                           marginVertical: size.s20,
                        }}
                        onChangeText={(text) => {
                           this.setState({
                              username: text,
                           })
                        }}
                        size={size.s30}
                        label={`${I18n.t('Username')}`}
                        value={username}
                        editable={false}
                     />
                     <TextField
                        style={{
                           marginVertical: size.s20,
                        }}
                        onChangeText={(text) => {
                           this.setState({
                              shop_code: text,
                           })
                        }}
                        size={size.s30}
                        label={`${I18n.t('ShopCode')}`}
                        value={shop_code}
                        editable={false}
                     />
                     <TextField
                        style={{
                           marginVertical: size.s20,
                        }}
                        editable={false}
                        onChangeText={(text) => { }}
                        size={size.s30}
                        label={`${I18n.t('ShopName')}`}
                        editable={false}
                        value={shop_name}
                     />
                     <TextField
                        editable={false}
                        onChangeText={(text) => { }}
                        value={shop_address}
                        size={size.s30}
                        label={`${I18n.t('ShopAddress')}`}
                     />
                     <TouchableOpacity
                        style={styles.btnSave}
                        onPress={() => {
                           this.onEditProfile()
                        }}>
                        <Text style={styles.txtSave}>{I18n.t('btnSave')}</Text>
                     </TouchableOpacity>
                  </ScrollView>
               </BottomSheet>

               <BottomSheet
                  ref={this.BottomSheetChangePasswordRef}
                  isShowRefresh
                  onReset={() => {
                     this.setState({
                        OldPassword: '',
                        NewPassword: '',
                        ConfirmPassword: '',
                     })
                  }}
                  title={`${I18n.t('ChangePasswords')}`}
                  height={Dimensions.get('screen').height / 1.1}>
                  <LoadingView visible={this.props.loadingChangePassword} />
                  <View style={{ backgroundColor: '#CCD8ED', flex: 1 }}>
                     <View style={{ paddingHorizontal: size.s30 }}>
                        <TextField
                           ref={this.oldPasswordRef}
                           style={{
                              marginVertical: size.s20,
                           }}
                           label={`${I18n.t('bank')}`}
                           onChangeText={(text) => {
                              this.setState({
                                 OldPassword: text,
                              })
                           }}
                           size={size.s30}
                           label={`${I18n.t('oldpassword')}`}
                           showEye={true}
                           secureTextEntry
                        />
                        <TextField
                           ref={this.newPasswordRef}
                           style={{
                              marginVertical: size.s20,
                           }}
                           value={NewPassword}
                           onChangeText={(text) => {
                              this.setState({
                                 NewPassword: text,
                              })
                           }}
                           size={size.s30}
                           label={`${I18n.t('newpassword')}`}
                           showEye={true}
                           secureTextEntry
                        />
                        <TextField
                           ref={this.confirmPasswordRef}
                           style={{
                              marginVertical: size.s20,
                           }}
                           value={ConfirmPassword}
                           onChangeText={(text) => {
                              this.setState({
                                 ConfirmPassword: text,
                              })
                           }}
                           size={size.s30}
                           label={`${I18n.t('ConfirmPassword')}`}
                           showEye={true}
                           secureTextEntry
                        />
                        <TouchableOpacity
                           onPress={() => {
                              this.onChangePassword()
                           }}
                           style={styles.btnSave}>
                           <Text style={{ color: '#fff' }}>{I18n.t('btnChange')}</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               </BottomSheet>

               <BottomSheet
                  ref={this.BottomSheetChangeBankRef}
                  isShowRefresh
                  onReset={() => {
                     this.setState({
                        selectedBankName: this.props?.data?.bank,
                        account: this.props?.data?.account_number,
                        username_bank: this.props?.data?.user_name_bank,
                     })
                  }}
                  title={I18n.t('ChangeBank')}
                  height={Dimensions.get('screen').height / 1.1}>
                  <View style={{ backgroundColor: '#CCD8ED', flex: 1 }}>
                     <View style={{ paddingHorizontal: size.s30 }}>
                        <TouchableOpacity
                           onPress={() => {
                              this.BottomSheetBank.current.open()
                           }}>
                           <View pointerEvents="none">
                              <TextField
                                 ref={this.selectedBankNameRef}
                                 label={`${I18n.t('bank')}`}
                                 editable={false}
                                 onChangeText={(text) => {
                                    this.setState({
                                       selectedBankName: this.state.selectedBankName,
                                    })
                                 }}
                                 style={{ backgroundColor: 'white', marginVertical: size.s20 }}
                                 value={selectedBankName}
                              />
                           </View>
                        </TouchableOpacity>

                        <TextField
                           showEye={true}
                           maxLength={15}
                           ref={this.accountRef}
                           style={{
                              marginVertical: size.s20,
                           }}
                           onChangeText={(text) => {
                              this.setState({
                                 account: text,
                              })
                           }}
                           value={account}
                           size={size.s30}
                           label={`${I18n.t('accountnumber')}`}
                        />
                        <TextField
                           ref={this.username_bankRef}
                           style={{
                              marginVertical: size.s20,
                           }}
                           onChangeText={(text) => {
                              this.setState({
                                 username_bank: text,
                              })
                           }}
                           value={username_bank}
                           size={size.s30}
                           label={`${I18n.t('accountname')}`}
                        />
                        <TouchableOpacity
                           onPress={() => {
                              this.onChangeBankInformation()
                           }}
                           style={styles.btnSave}>
                           <Text style={{ color: '#fff' }}>{I18n.t('btnChange')}</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
                  <BottomSheet ref={this.BottomSheetBank} title={I18n.t('List_Bank')} isShowNull>
                     <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.Bank}
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
               </BottomSheet>
               <BottomSheet ref={this.BottomSheetChangeLanguagesRef} title={`${I18n.t('ChangeLanguage')}`} isShowNull>

                  <TouchableOpacity
                     style={styles.listBank}
                     onPress={() => {
                        this.BottomSheetChangeLanguagesRef.current.close(() => {

                           Alert.alert(
                              "",
                              `${I18n.t('appReset')}`,
                              [

                                 {
                                    text: 'Ok', onPress: () => {
                                       this.props.onChangeLanguage('vi')
                                       this.props.onClearAction()
                                       this.props.navigation.reset({
                                          routes: [{ name: 'Splash' }],
                                       })
                                    }
                                 }
                              ]
                           );

                        })
                     }}>
                     <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ padding: size.s10 }} />
                        <Text

                           style={{
                              fontSize: size.s30,
                              paddingVertical: 15,
                              paddingRight: size.s30,
                           }}>
                           {`${I18n.t('vietnamese')}`}
                        </Text>
                     </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={styles.listBank}
                     onPress={() => {
                        this.BottomSheetChangeLanguagesRef.current.close(() => {

                           Alert.alert(
                              "",
                              `${I18n.t('appReset')}`,
                              [

                                 {
                                    text: 'Ok', onPress: () => {
                                       this.props.onChangeLanguage('en')
                                       this.props.onClearAction()
                                       this.props.navigation.reset({
                                          routes: [{ name: 'Splash' }],
                                       })
                                    }
                                 }
                              ]
                           );
                        }
                        )
                     }}>
                     <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ padding: size.s10 }} />
                        <Text

                           style={{
                              fontSize: size.s30,
                              paddingVertical: 15,
                              paddingRight: size.s30,
                           }}>
                           {`${I18n.t('english')}`}
                        </Text>
                     </View>
                  </TouchableOpacity>

               </BottomSheet>
            </ScrollView>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#CCD8ED',
   },
   btn: {
      flex: 1,
      marginVertical: size.s30,
      paddingBottom: size.s30,
      paddingHorizontal: size.s40,
      borderBottomWidth: 1,
      borderBottomColor: '#FCFCFC',
   },
   btn_title: {
      fontSize: size.h20 * 2,
      color: '#4F4F4F',
   },
   btnSave: {
      backgroundColor: '#003DA5',
      padding: 15,
      marginVertical: size.s30,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      padding: size.s25,
      alignItems: 'center',
   },
   txtSave: {
      fontWeight: 'bold',
      fontSize: size.h16 * 2,
      color: '#fff',
   },
   listBank: {
      paddingVertical: size.s10,
      borderBottomWidth: 1,
      borderColor: color.borderColor,
      width: '100%',
   },
   bottomSheet: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      width: '100%',
      justifyContent: 'flex-end',
      height: Dimensions.get('window').height / 1.1,
   },
   containerModal: {
      flex: 1,
      backgroundColor: '#00000036',
      justifyContent: 'flex-end',
   },
   titleView: {
      paddingVertical: 14,
      paddingHorizontal: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      borderBottomColor: color.border,
      borderBottomWidth: 1,
   },
   title: {
      fontWeight: 'bold',
      fontSize: 18,
      width: '90%',
      textAlign: 'center',
   },
})
export default ProfileComponent
