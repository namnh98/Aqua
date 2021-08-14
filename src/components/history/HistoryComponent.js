import React, { Component } from 'react'
import {
   View,
   Text,
   StyleSheet,
   FlatList,
   Dimensions,
   TouchableOpacity,
   Image,
   TouchableWithoutFeedback,
   Keyboard,
   Pressable,
   BackHandler,
   Alert,
} from 'react-native'
import { color } from '../../res/color'
import Snackbar from '../custom/SnackBar'
import size from '../../res/size'
import LoadingView from '../custom/LoadingView'
import Header from '../custom/Header'
import ItemHistory from './ItemHistory'
import BottomSheet from '../custom/BottomSheet'
import TextField from '../custom/TextField'
import DatePickerCustom from '../custom/datePicker/DatePickerCustom'
import I18n from '../../settings/i18n'

let statusDataEN = [
   { id: 2, name: 'Approved', color: '#27AE60' },
   { id: 4, name: 'Inprogress', color: '#F1C12D' },
   { id: 1, name: 'Reject', color: '#EB5757' },
   { id: 3, name: 'Canceled', color: '#828282' },
]

let statusDataVN = [
   { id: 2, name: 'Đã duyệt', color: '#27AE60' },
   { id: 4, name: 'Đang duyệt', color: '#F1C12D' },
   { id: 1, name: 'Từ chối', color: '#EB5757' },
   { id: 3, name: 'Đã hủy', color: '#828282' },
]
class HistoryComponent extends Component {
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
         data: [],
         refreshing: false,
         AlertError: false,
         snackBarMessage: '',
         isShowSelectDate: false,
         dateString: `${day}/${month}/${year}`,
         startDate: '',
         endDate: '',
         selectStatus: '',
         Status: [],
         statusId: '',
      }
      this.snackBar = React.createRef()
      this.BottomSheetRef = React.createRef()
      this.BottomSheetStatus = React.createRef()
   }
   componentDidMount() {
      this.props.getListNotifyAction()
      this.props.onGetHistoryAction()
      this.props.navigation.addListener('focus', () => {
         this.props.onGetHistoryAction()
      })

      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
   }
   comeback = () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
   }
   componentDidUpdate(prevProps) {
      if (prevProps.loading !== this.props.loading && !this.props.loading) {
         if (prevProps.data !== this.props.data) {
            this.BottomSheetRef.current.close()
            if (this.props.data) {
               this.setState({
                  data: this.props.data,
                  refreshing: false,
               })
            } else {
               this.setState(
                  {
                     AlertError: false,
                     snackBarMessage: this.props.error,
                     refreshing: false,
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
                     AlertError: false,
                     snackBarMessage: this.props.error,
                  },
                  () => {
                     this.snackBar.current.showSnackBar()
                  },
               )
            }
         }
      }
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
   handleRefresh() {
      this.setState({
         refreshing: true,
         data: [],
      })
      this.props.onGetHistoryAction()
   }

   renderItems = ({ item, index }) => (
      <ItemHistory
         index={index}
         model_name={item.model_name}
         serial_number={item.serial_number}
         status={item.status}
         created_date={item.created_date}
         product_evidence={item.product_evidence}
         note={item.note}
         e_voucher={item.e_voucher}
         onPress={() => {
            this.props.navigation.navigate('DetailHistory', item.id)
         }}
      />
   )
   renderStatus = ({ item, index }) => (
      <TouchableOpacity
         style={styles.listStatus}
         onPress={() => {
            this.BottomSheetStatus.current.close(() => this.setState({ selectStatus: item.name, statusId: item.id }))
         }}>
         <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={[styles.contentStatus, { backgroundColor: item.color }]} />
            <Text index={index} style={styles.txtNameStauts}>
               {item.name}
            </Text>
         </View>
      </TouchableOpacity>
   )
   handleChangestartedDate = (startedDate) => {
      this.setState({ startDate: startedDate })
   }
   handleChangeEndedDate = (endedDate) => {
      this.setState({ endDate: endedDate })
   }
   ListEmptyComponent = () => {
      return (
         <View
            style={{
               marginTop: size.s340 * 2,
               flex: 1,
               alignItems: 'center',
               justifyContent: 'center',
            }}>
            <Text style={{ fontSize: size.s30, color: '#8C8C8C', fontStyle: 'italic' }}>{I18n.t('listnotFound')}</Text>
         </View>
      )
   }
   dataFilter() {
      return {
         dayEnd: this.state.endDate.slice(0, 10).split('/').reverse().join('-'),
         dayStart: this.state.startDate.slice(0, 10).split('/').reverse().join('-'),
         statusId: this.state.statusId,
      }
   }

   onMessage = (mes) => {
      this.setState(
         {
            AlertError: false,
            snackBarMessage: mes,
         },
         () => {
            this.snackBar.current.showSnackBar()
         },
      )
   }
   onFilter = () => {
      const d1 = new Date(this.state.startDate.slice(0, 10).split('/').reverse().join('-'))
      const d2 = new Date(this.state.endDate.slice(0, 10).split('/').reverse().join('-'))

      // console.log(d1)
      // console.log(d2)

      if (this.state.startDate === '' && this.state.endDate !== '') this.onMessage('Please chosse To date!')
      if (this.state.startDate !== '' && this.state.endDate === '') this.onMessage('Please chosse From date!')
      if (d2 < d1) this.onMessage('From date must be greater than To date!')
      this.props.onGetHistoryAction(this.dataFilter())
   }

   render() {
      const { data, refreshing } = this.state
      return (
         <View style={styles.container}>
            <Header
               title={`${I18n.t("titleHistory")}`}
               isShowNotify
               isShowFilter
               //  isShowAvatar
               onPressFunction={() => {
                  this.BottomSheetRef.current.open()
               }}
               onPressNotifi={() => {
                  this.props.navigation.navigate('NotificationComponent')
               }}
            />

            <Snackbar
               color={this.state.AlertError ? color.green : 'red'}
               label={this.state.snackBarMessage}
               size={size.s30}
               ref={this.snackBar}
               time={2000}
            />
            <LoadingView visible={this.props.loading} />

            <FlatList
               contentContainerStyle={{ paddingBottom: size.h40 }}
               onRefresh={() => this.handleRefresh()}
               refreshing={refreshing}
               data={data}

               //showsVerticalScrollIndicator={false}
               keyExtractor={(item, index) => index.toString()}
               renderItem={this.renderItems}
               ListEmptyComponent={this.ListEmptyComponent}
            />
            <BottomSheet
               ref={this.BottomSheetRef}
               isShowRefresh
               onReset={() => {
                  this.setState({
                     startDate: '',
                     endDate: '',
                     selectStatus: '',
                     statusId: '',
                  })
               }}
               title={`${I18n.t('Filter')}`}>
               <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={{ marginVertical: size.s60, flex: 1, paddingHorizontal: size.s60 }}>
                     <TouchableOpacity onPress={() => this.BottomSheetStatus.current.open()}>
                        <View pointerEvents="none">
                           <TextField
                              label={`${I18n.t('Status')}`}
                              editable={false}
                              style={{ backgroundColor: 'white' }}
                              value={this.state.selectStatus}
                           />
                        </View>
                     </TouchableOpacity>

                     <BottomSheet ref={this.BottomSheetStatus} isShowNull title={`${I18n.t('Status')}`}>
                        <FlatList
                           showsVerticalScrollIndicator={false}
                           data={I18n.locale === 'vi' ? statusDataVN : statusDataEN}
                           keyExtractor={(item, index) => {
                              return index.toString()
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
                     <View style={styles.picker}>

                        <DatePickerCustom
                           label={`${I18n.t('todate')}`}
                           value={this.state.startDate}
                           style={{ backgroundColor: 'white', width: "93%" }}
                           onSelectDate={(date) => this.setState({ startDate: date })}
                        />
                        <DatePickerCustom
                           label={`${I18n.t('fromdate')}`}
                           value={this.state.endDate}
                           style={{ backgroundColor: 'white', width: "94%" }}
                           onSelectDate={(date) => this.setState({ endDate: date })}
                        />

                     </View>
                     <TouchableOpacity
                        style={styles.btnFilter}
                        onPress={() => {
                           this.onFilter()
                        }}>
                        <Text style={styles.btnTitle}>{I18n.t('ApplyFilter')}</Text>
                     </TouchableOpacity>
                  </View>
               </TouchableWithoutFeedback>
            </BottomSheet>
         </View>
      )
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#CCD8ED',
   },
   picker: {
      justifyContent: "space-between",
      flexDirection: 'row',
      marginVertical: size.s30,
   },
   btnFilter: {
      marginBottom: size.s60,
      backgroundColor: '#003DA5',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   btnTitle: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: size.h18 * 2,
      textAlign: 'center',
   },
   txtTo: {
      marginTop: size.s20,
      fontSize: size.h16 * 2,
      marginHorizontal: size.s15,
   },
   listStatus: {
      paddingVertical: size.s30,
      borderBottomWidth: 1,
      borderColor: color.borderColor,
      width: '100%',
   },
   contentStatus: {
      width: size.s25,
      borderRadius: size.s25,
      aspectRatio: 1,
      marginRight: size.s20,
      marginLeft: 10,
   },
   txtNameStauts: {
      fontSize: size.s30,
      paddingVertical: 15,
      paddingRight: size.s30,
   },
})

export default HistoryComponent
