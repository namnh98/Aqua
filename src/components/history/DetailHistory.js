import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import Header from '../custom/Header'
import size from '../../res/size'
import TextField from '../custom/TextField'
import images from '../../res/image'
import { color } from '../../res/color'
import HeaderDetail from '../custom/HeaderDetail'
import LoadingView from '../custom/LoadingView'
import { connect } from 'react-redux'
import { actGetDetailSOAction, actUpdateSOAction } from '../../redux/action/selloutAction'
import { TouchableWithoutFeedback } from 'react-native'
import { actParamAction } from '../../redux/action/paramAction'
import SnackBar from '../custom/SnackBar'
import moment from 'moment'
import I18n from '../../settings/i18n'
import { currencyFormat } from '../../res/function'

class DetailHistory extends Component {
   constructor(props) {
      super(props)
      this.state = {
         data: [],
         model_name: '',
         status: '',
         selloutDate: '',
         customname: '',
         phone: '',
         serial: '',
         note: '',
         evidence: [],
         e_voucher: '',
         AlertError: false,
         snackBarMessage: ''
      }
      this.snackBar = React.createRef()
   }
   onChangeColorStatus = (item) => {
      switch (item) {
         case 'Approved':
            return '#27AE60'

         case 'Submit':
            return '#F1C12D'
         case 'Re-submit':
            return '#F1C12D'
         case 'Rejected':
            return '#EB5757'
         case 'Canceled':
            return '#828282'
         default:
            return ''
      }
   }
   changeStatus = (item) => {
      if (item === 'Submit') {
         return 'Inprogress'
      }
      switch (item) {
         case 'Approved':
            return `${I18n.t('Approved')}`

         case 'Submit':
            return `${I18n.t('Inprogress')}`
         case 'Re-submit':
            return `${I18n.t('Inprogress')}`
         case 'Rejected':
            return `${I18n.t('Reject')}`
         case 'Canceled':
            return `${I18n.t('Canceled')}`
         default:
            return ''
      }
   }

   onChangeViewStatus = (item) => {
      console.log(item)
      switch (item) {
         case 'Approved':
            return (
               <React.Fragment>
                  <Text style={{ fontSize: size.h40, marginVertical: size.s40, fontWeight: 'bold' }}>{I18n.t('eVoucher')}:</Text>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: size.s20 }}>
                     {this.props.data.e_voucher === null ? null : (
                        <React.Fragment>
                           <Text>{I18n.t('Price')}: {currencyFormat(this.state.e_voucher.price)} $</Text>
                           <Text>{I18n.t('Point')}: {this.state.e_voucher.point} </Text>
                        </React.Fragment>
                     )}
                  </View>
                  <TextField
                     style={{
                        marginTop: size.s30,
                     }}
                     editable={false}
                     onChangeText={(text) => { }}
                     size={size.s40}
                     label={`${I18n.t('Note')}`}
                     multiline={true}
                     value={this.props.dataParams.note}
                  />
               </React.Fragment>
            )

            break
         case 'Rejected':
            return (
               <View style={{ flex: 1, padding: size.s10 }}>
                  <TextField
                     style={{
                        marginTop: size.s30,
                     }}
                     editable={false}
                     onChangeText={(text) => { }}
                     size={size.s40}
                     label={`${I18n.t('Note')}`}
                     multiline={true}
                     value={this.props.dataParams.note}
                  />
                  <TouchableOpacity
                     style={styles.btn}
                     onPress={() => {
                        this.props.onDataParams({ activity: 'Re-submit' });
                        this.props.navigation.navigate('GeneralInfomation')
                     }}>
                     <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: size.h40 }}>{I18n.t('EditResend')}</Text>
                  </TouchableOpacity>
               </View>
            )
            break
         case 'Submit':
            return (
               <View style={{ flex: 1, padding: size.s10 }}>
                  <TextField
                     style={{
                        marginTop: size.s30,
                     }}
                     editable={false}
                     onChangeText={(text) => { }}
                     size={size.s40}
                     label={`${I18n.t('Note')}`}
                     multiline={true}
                     value={this.props.dataParams.note}
                  />
                  <TouchableOpacity
                     style={styles.btn}
                     onPress={() => {
                        this.props.onDataParams({ activity: 'Re-submit' });
                        this.props.navigation.navigate('GeneralInfomation')
                     }}>
                     <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: size.h40 }}>{I18n.t('EditResend')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                     style={styles.btnCancle}
                     onPress={() => {

                        // console.log(this.props.dataParams)
                        // console.log('call wew::::::::')
                        // console.log({ ...this.props.dataParams, activity: 'Canceled' })
                        this.onCancel();
                     }}>
                     <Text style={{ textAlign: 'center', color: '#000', fontWeight: 'bold', fontSize: size.h40 }}>{I18n.t('btnCancel')}</Text>
                  </TouchableOpacity>
               </View>
            )
            break
         case 'Re-submit':
            //
            return (
               <View style={{ flex: 1, padding: size.s10 }}>
                  <TextField
                     style={{
                        marginTop: size.s30,
                     }}
                     editable={false}
                     onChangeText={(text) => { }}
                     size={size.s40}
                     label={`${I18n.t('Note')}`}
                     multiline={true}
                  />
                  <TouchableOpacity
                     style={styles.btn}
                     onPress={() => {
                        this.props.onDataParams({ activity: 'Re-submit' });
                        this.props.navigation.navigate('GeneralInfomation')
                     }}>
                     <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: size.h40 }}>{I18n.t('EditResend')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                     style={styles.btnCancle}
                     onPress={() => {
                        this.onCancel();
                     }}>
                     <Text style={{ textAlign: 'center', color: '#000', fontWeight: 'bold', fontSize: size.h40 }}>{I18n.t('btnCancel')}</Text>
                  </TouchableOpacity>
               </View>
            )
            break
         case 'Canceled':
            return (
               <View>
                  <TextField
                     style={{
                        marginTop: size.s30, fontSize: size.h40
                     }}
                     editable={false}
                     size={size.s40}
                     label={`${I18n.t('Note')}`}
                     multiline={true}
                     value={this.props.dataParams.note}
                  />
               </View>
            )
            break

         default:
      }
   }
   onCancel = () => {
      Alert.alert(
         "",
         `${I18n.t('cancelInprogress')}`,
         [
            {
               text: `${I18n.t('No')}`,
               onPress: () => console.log("Cancel Pressed"),
               style: "cancel"
            },
            { text: `${I18n.t('Yes')}`, onPress: () => this.props.onUpdateSO({ ...this.props.dataParams, activity: 'Canceled' }) }
         ]
      );

   }
   async componentDidMount() {
      await this.props.getDetailSO(this.props.route.params)

   }

   componentDidUpdate(prevProps) {
      if (prevProps.loading !== this.props.loading && !this.props.loading) {
         if (prevProps.data !== this.props.data) {
            if (this.props.data) {
               this.setState({
                  data: this.props.data,
                  model_name: this.props.data?.model_name,
                  status: this.props.data?.status,
                  selloutDate: this.props.data?.sell_out_date,
                  customname: this.props.data?.customer_name,
                  phone: this.props.data?.customer_phone,
                  serial: this.props.data?.serial_number,
                  evidence: this.props.data?.evidence,
                  note: this.props.data?.note,
                  e_voucher: this.props.data?.e_voucher,
               })
               const { model_name, sell_out_date, customer_name, customer_phone, serial_number, evidence, note, } = this.props.data;

               this.props.onDataParams({ id: this.props.data.id, note, model_name, sell_out_date, customer_name, customer_phone, serial_number, evidence, date: sell_out_date });
            } else {
               this.setState(
                  {
                     AlertError: true,
                     snackBarMessage: 'Error',
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
                     AlertError: true,
                     snackBarMessage: 'Server not responding',
                  },
                  () => {
                     this.snackBar.current.showSnackBar()
                  },
               )
            }
         }
      }
      /// update SELL_OUT_UPDATE
      if (this.props.loadingUpdate !== prevProps.loadingUpdate && !this.props.loadingUpdate) {
         if (this.props.dataUpdate.error) {
            console.log(this.props.dataUpdate.error, 'successs')
            this.setState(
               {
                  AlertError: true,
                  snackBarMessage: this.props.dataUpdate.message,
               },
               () => {
                  this.snackBar.current.showSnackBar()
               },
            )
         } else {
            this.setState(
               {
                  AlertError: false,
                  snackBarMessage: `${I18n.t('success')}`,
               },
               () => {
                  this.snackBar.current.showSnackBar()
               },
            )
            setTimeout(() => {
               this.props.navigation.navigate('History')
            }, 1000)
         }
         if (prevProps.errorUpdate !== this.props.errorUpdate) {
            if (this.props.errorUpdate !== undefined || this.props.errorUpdate !== null) {
               this.setState(
                  {
                     AlertError: true,
                     snackBarMessage: this.props.errorUpdate,
                  },
                  () => {
                     this.snackBar.current.showSnackBar()
                  },
               )
            }
         }
      }
   }
   render() {
      const { phone, status, model_name, serial, customname, selloutDate, e_voucher, evidence, note } = this.state
      // console.log(evidence)
      return (
         <View style={styles.container}>
            <HeaderDetail
               title={model_name}
               status={this.changeStatus(status)}
               color={this.onChangeColorStatus(status)}
               isShowBack
               isStatus
               onPressBack={() => this.props.navigation.goBack()}
            />
            <SnackBar
               color={this.state.AlertError != true ? color.green : color.red}
               label={this.state.snackBarMessage}
               size={size.s30}
               ref={this.snackBar}
            />
            <LoadingView visible={this.props.loading} />
            <LoadingView visible={this.props.loadingUpdate} />

            <ScrollView
               contentContainerStyle={{ flexGrow: 1, paddingHorizontal: size.s40, }}
               showsVerticalScrollIndicator={false}>
               <Text style={{ fontSize: size.h40, marginVertical: size.s20, fontWeight: 'bold' }}>
                  {I18n.t('GeneralInfomation2')}
               </Text>
               <TextField
                  size={size.s30}
                  label={`${I18n.t('TxtModelName')}`}
                  editable={false}
                  value={model_name}
               />
               <TextField
                  size={size.s30}
                  label={`${I18n.t('TxtSellOutDate')}`}
                  editable={false}
                  value={selloutDate !== "" ? moment(selloutDate).format('DD/MM/YYYY') : ""}
               />
               <TextField
                  size={size.s30}
                  label={`${I18n.t('TxtCustomer')}`}
                  editable={false}
                  value={customname}
               />
               <TextField
                  size={size.s30}
                  label={`${I18n.t('TxtCustomerPhone')}`}
                  editable={false}
                  value={phone}
               />
               <TextField
                  size={size.s30}
                  label={`${I18n.t('TxtSerial')}`}
                  editable={false}
                  value={serial}
               />

               <Text style={{ fontSize: size.h40, fontWeight: 'bold', paddingBottom: size.s20 }}>{I18n.t('Evidence')}</Text>
               <View><ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingLeft: size.h20, justifyContent: 'space-around' }}>
                  {evidence?.map((item, index) => {
                     return (
                        <ImageBackground
                           key={index}
                           source={item.url === '' ? images.no_image : { uri: item.url }}
                           style={{
                              width: size.s240, height: size.s200, resizeMode: "contain",
                              borderRadius: 10,
                              overflow: "hidden",
                              marginRight: size.h20
                           }}
                        //resizeMode={'contain'}
                        />
                     )
                  })}
               </ScrollView>

                  {this.onChangeViewStatus(status)}
               </View>
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
      backgroundColor: '#003DA5',
      padding: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
   },
   btnCancle: {
      backgroundColor: '#FCFCFC',
      padding: 10,
      marginVertical: size.s25,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
   },
})

const mapStateToProps = (state) => {
   console.log(state.sellOutUpdateReducers, 'state sell out update');
   return {
      data: state.sellOutDetailReducers.data,
      loading: state.sellOutDetailReducers.loading,
      error: state.sellOutDetailReducers.error,
      /// update
      dataUpdate: state.sellOutUpdateReducers.data,
      loadingUpdate: state.sellOutUpdateReducers.loading,
      errorUpdate: state.sellOutUpdateReducers.error,

      dataParams: state.paramsReducers,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      getDetailSO: (data) => {
         dispatch(actGetDetailSOAction(data))
      },
      onDataParams: data => {
         dispatch(actParamAction(data))
      },
      onUpdateSO: (data) => {
         dispatch(actUpdateSOAction(data))
      },
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailHistory)
