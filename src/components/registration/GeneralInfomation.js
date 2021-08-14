import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import Header from '../custom/Header'
import size from '../../res/size'
import images from '../../res/image/index'
import TextField from '../custom/TextField'
import ChartDonut from '../custom/ChartDonut'
import DatePickerCustom from '../custom/datePicker/DatePickerCustom'
import SnackBar from '../custom/SnackBar'
import { color } from '../../res/color'
import { actParamAction, actParamClearAction } from '../../redux/action/paramAction'
import { connect } from 'react-redux'
import moment from 'moment'
import I18n from '../../settings/i18n'
class GeneralInfomation extends Component {
   constructor(props) {
      super(props)
      let date = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      if (day < 10) {
         day = '0' + day
      }
      if (month < 10) {
         month = '0' + month
      }
      if (year < 10) {
         year = '0' + year
      }
      this.state = {
         idTap: 1,
         date: moment(new Date()).format('DD/MM/YYYY'),
         username: '',
         phone: '',
         snackBarMessage: '',
         snackBarError: false,
         dateString: `${year}-${month}-${day}`,
         dataParams: {},
         errorDate: '',
         isCheckDate: true
      }
      this.date = React.createRef()
      this.username = React.createRef()
      this.phone = React.createRef()
      this.snackBar = React.createRef()
      this.onFocusSubscribe = this.props.navigation.addListener('focus', () => {

         this.date?.current?.error('')
         this.username?.current?.error('')
         this.phone?.current?.error('')
      })

   }

   onNextStep = async () => {
      if (this.props.dataParams.id) {
         await this.setState({
            isCheckDate: true
         })
         var oldDate = this.props.dataParams.sell_out_date
         this.props.onParamAction({
            date: oldDate,
         })


      }
      let isCheckName = false
      let isCheckPhone = false

      if (this.props.dataParams.customer_name === '')
         this.username.current.error(I18n.t('validateCustomerName'))
      else if (this.props.dataParams.customer_name.match(/[0-9]/g)) {
         this.username.current.error(I18n.t('validateNumberCustomerName'))
      } else isCheckName = true

      if (this.props.dataParams.customer_phone === '') {
         this.phone.current.error(I18n.t('validateCustomerPhone'))
      }
      else if (this.props.dataParams.customer_phone.length < 10) {
         this.phone.current.error(I18n.t('validateCharactersCustomerPhone'))
      } else isCheckPhone = true

      if (isCheckName && isCheckPhone && this.state.isCheckDate) {

         this.setState({
            shouldClear: false,
         })
         if (this.props.dataParams.id) {

            this.props.navigation.navigate('BarcodeResult')
         } else {
            this.props.onParamAction({
               sell_out_date: this.state.date.slice(0, 10).split('/').reverse().join('-') + 'T00:00:00.000Z',
            })
            // console.log(this.state.date.slice(0, 10).split('/').reverse().join('-') + 'T00:00:00.000Z')
            this.props.navigation.navigate('Regsi')
         }
      }
   }



   render() {
      return (
         <View style={styles.container}>
            <Header
               title={this.props.dataParams.id === "" ? I18n.t('Registration') : I18n.t('Update')}
               isShowNotify
               onPressNotifi={() => this.props.navigation.navigate('NotificationComponent')}
            />
            <SnackBar
               color={this.state.snackBarError != true ? color.green : color.red}
               label={this.state.snackBarMessage}
               size={size.s30}
               ref={this.snackBar}
            />
            <ScrollView
               style={{ flex: 1 }}
               contentContainerStyle={{ flexGrow: 1 }}
               showsVerticalScrollIndicator={false}
               keyboardShouldPersistTaps="handled">
               <View style={styles.body}>
                  <View style={styles.cricle}>
                     <ChartDonut percentage={25} defaults={25} />
                  </View>
                  <Text style={styles.textpage}>1 of 4</Text>

                  <View style={styles.content}>
                     <View style={styles.text01}>
                        <Text style={{ fontSize: size.h40, fontWeight: 'bold' }}>{I18n.t('Generalinformation')}</Text>
                     </View>

                     <View style={styles.text02}>
                        <Text style={{ fontSize: size.h36, color: '#828282' }}>{I18n.t('scanBarcode')}</Text>
                     </View>
                  </View>
               </View>
               <View style={styles.centerScreeen}>
                  <DatePickerCustom
                     {...this.props}
                     refs={this.date}
                     label={I18n.t('TxtSellOutDate')}
                     value={this.props.dataParams?.date !== "" && this.props.dataParams?.date ? moment(this.props.dataParams?.date.slice(0, 10).split('/').reverse().join('-')).format('DD/MM/YYYY') : this.state.date}
                     title={I18n.t('TxtSellOutDate')}
                     onSelectDate={(res) => {
                        var newRes = new Date(res.slice(0, 10).split('/').reverse().join('-') + 'T24:00:00.000Z');
                        let date = new Date()
                        this.props.onParamAction({
                           date: res,
                        })
                        if (newRes < date) {
                           this.setState({ isCheckDate: false })
                           this.date.current.error('Vui lòng không chọn ngày nhỏ hơn hiện tại')
                        } else {
                           this.date.current.error("")
                           date.setDate(res.date)
                           date.setMonth(res.month - 1)
                           date.setFullYear(res.year)
                           console.log(res)
                           this.setState({ date: res, isCheckDate: true })
                           this.props.onParamAction({
                              sell_out_date: res.slice(0, 10).split('/').reverse().join('-') + 'T00:00:00.000Z',
                              date: res,
                           })
                           console.log(res.slice(0, 10).split('/').reverse().join('-') + 'T00:00:00.000Z')
                        }

                     }}
                  />
                  <TextField
                     maxLength={50}
                     label={I18n.t('TxtCustomer')}
                     ref={this.username}
                     onChangeText={(text) => {
                        this.props.onParamAction({ customer_name: text })
                     }}
                     value={this.props.dataParams.customer_name}
                  />
                  <TextField
                     label={I18n.t('TxtCustomerPhone')}
                     maxLength={11}
                     ref={this.phone}
                     onChangeText={(text) => {
                        this.props.onParamAction({ customer_phone: text })
                     }}
                     numeric={true}
                     value={this.props.dataParams.customer_phone}
                  />
               </View>
               <View style={styles.endButton}>
                  <TouchableOpacity
                     style={styles.bottomend}
                     onPress={() => {
                        this.onNextStep()
                     }}>
                     <Text style={styles.ebut}>{I18n.t('next')}</Text>
                     <Image style={styles.leftIcon} source={images.iC_arrowright} />
                  </TouchableOpacity>
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
   body: {
      flexDirection: 'row',
      padding: size.h24,
      justifyContent: 'space-around',
   },
   picture: {
      width: size.s300,
      height: size.s300,
   },
   text01: {
      flexDirection: 'row',
   },
   text02: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
   },
   picture2: {
      width: size.s100,
      height: size.s100,
   },
   endButton: {
      flex: 1,
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
   },
   bottomend: {
      backgroundColor: '#CCD8ED',
      paddingHorizontal: size.h60,
      paddingVertical: size.s30,
      marginRight: size.s45,
      flexDirection: 'row',
      alignItems: 'center',
   },
   centerScreeen: {
      padding: size.h48,
      justifyContent: 'space-around',
   },
   text: {
      marginLeft: size.h20,
      marginBottom: size.h16,
      color: '#4F4F4F',
      fontSize: size.h36,
   },
   ebut: {
      fontSize: size.h40,
      fontWeight: 'bold',
      color: '#003DA5',
   },
   leftIcon: {
      width: size.h52,
      height: size.h52,
      marginTop: size.s5,
      paddingRight: size.s7,
   },
   content: {
      padding: size.h16,
   },
   cricle: {
      transform: [{ rotate: '180deg' }],
   },
   textpage: {
      fontSize: size.h28,
      color: '#4F4F4F',
      position: 'absolute',
      bottom: 0,
      padding: size.h65,
      paddingBottom: size.s80 + 2,
   },
   crollview: {
      flex: 1,
   },
})

const mapStateToProps = (state) => {
   return {
      dataParams: state.paramsReducers,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onParamAction: (data) => {
         dispatch(actParamAction(data))
      },
      onClearAction: () => {
         dispatch(actParamClearAction())
      },
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfomation)