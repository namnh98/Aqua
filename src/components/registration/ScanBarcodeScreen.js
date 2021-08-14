import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Dimensions } from 'react-native'
import Header from '../custom/Header'
import size from '../../res/size'
import images from '../../res/image/index'
import ScanBarcodeComponent from './scanBarcodeComponent'

import ChartDonut from '../custom/ChartDonut'
import LoadingView from '../custom/LoadingView'
import TextField from '../custom/TextField'
import { connect } from 'react-redux'
import { actParamAction } from '../../redux/action/paramAction'

import BottomSheet from '../custom/BottomSheet'
import { color } from '../../res/color'
import { getListModelNameAction } from '../../redux/action/getListModelNameAction'

import I18n from '../../settings/i18n'


class ScanBarcodeScreen extends Component {
   constructor(props) {
      super(props)

      this.state = {
         idTap: 1,
         serial_number: '',
         model_name: '',
         status: true,
         txtSearch: ''

      }
      this.serialRef = React.createRef()
      this.modalnameRef = React.createRef()
      this.BottomSheetListMN = React.createRef()
   }

   componentDidMount() {
      this.props.getListModelNameAction()
   }

   componentDidUpdate(prevProps) {
      if (this.props.loading !== prevProps.loading && !this.props.loading) {
         if (this.props.data) {
            this.props.onParamAction({ model_name: this.props.data.model_name, editable: this.props.data.exist_status })
         }
         if (prevProps.error !== this.props.error) {
            if (this.props.error !== undefined || this.props.error !== null) {

            }
         }
      }

   }

   onNextStep = () => {
      let isCheck = 0
      if (!this.props.dataParams.serial_number) {
         this.serialRef.current.error(I18n.t('validateSerialNumber'))
         isCheck += 1
      }
      if (!this.props.dataParams.model_name) {
         this.modalnameRef.current.error(I18n.t('validateModelName'))
         isCheck += 1
      }
      if (isCheck === 0) this.props.navigation.navigate('UploadEvidence')

   }

   renderItem = ({ item, index }) => (
      <TouchableOpacity
         style={styles.listModelName}
         onPress={() => {
            this.BottomSheetListMN.current.close(
               () => {
                  this.props.onParamAction({ model_name: item.model_name })
                  this.modalnameRef.current.error('')
               }
            )
         }}>


         <Text index={index} style={styles.txtModelName}>
            {item.model_name}
         </Text>

      </TouchableOpacity>
   )

   dataFilterList = (text) => {
      return !this.props?.dataModelName?.data?.error ? this.props?.dataModelName?.data?.filter((item) =>
         item.model_name.trim().toLowerCase().includes(text.trim().toLowerCase())
      ) : null
   }
   ListEmptyComponent = () => {
      return (
         <View
            style={{
               marginTop: size.s240 * 2,
               flex: 1,
               alignItems: 'center',
               justifyContent: 'center',
            }}>
            <Text style={{ fontSize: size.s30, color: '#8C8C8C', fontStyle: 'italic' }}>{I18n.t('listnotFound2')}</Text>
         </View>
      )
   }
   render() {
      const { idTap } = this.state
      return (
         <View style={styles.container}>
            <Header title={this.props.dataParams.id === "" ? I18n.t('Registration') : I18n.t('Update')} isShowNotify={false} />
            <LoadingView visible={this.props.loading} />

            <ScrollView
               style={{ flex: 1 }}
               contentContainerStyle={{ flexGrow: 1 }}
               showsVerticalScrollIndicator={false}
               keyboardShouldPersistTaps="handled">
               <View style={styles.body}>
                  <View style={styles.cricle}>
                     <ChartDonut percentage={50} defaults={50} />
                  </View>
                  <Text style={styles.textpage}>2 of 4</Text>

                  <View style={styles.content}>
                     <View style={styles.text01}>
                        <Text style={{ fontSize: size.h46, fontWeight: 'bold' }}>{I18n.t('titleScanBarcode')}</Text>
                     </View>

                     <View style={styles.text02}>
                        <Text style={{ fontSize: size.h36, color: '#828282' }}>{I18n.t('barcodeResult')}</Text>
                     </View>
                  </View>
               </View>
               <View style={styles.changeView}>
                  <View style={styles.changeScreen}>
                     <TouchableOpacity onPress={() => this.setState({ idTap: 1 })}>
                        <Image
                           style={styles.picture2}
                           source={idTap == 1 ? images.ic_keyboard_Blue : images.ic_keyboard}
                        />
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => this.setState({ idTap: 2 })}>
                        <Image
                           style={styles.picture2}
                           source={idTap == 2 ? images.ic_barcodeBlue : images.icon_barcode}
                        />
                     </TouchableOpacity>
                  </View>
                  <View style={styles.screen}>
                     {idTap == 1 ? (

                        <View style={{ padding: size.h48 }}>
                           <Text
                              style={{
                                 marginLeft: size.h20,
                                 marginBottom: size.h16,
                                 fontSize: size.h36,
                                 color: '#4F4F4F',
                              }}>
                              {I18n.t('enterBarcode')}
                           </Text>
                           <TextField
                              label={I18n.t('TxtSerial')}
                              ref={this.serialRef}
                              onChangeText={(text) => {
                                 this.props.onParamAction({ serial_number: text })
                              }}
                              onBlur={() => {
                                 if (this.props.dataParams.serial_number === '') {
                                    this.serialRef.current.error(I18n.t('validateSerialNumber'))
                                 }
                                 else { this.props.onActionGetSerial(this.props.dataParams.serial_number) }
                              }}
                              value={this.props.dataParams.serial_number}
                           />
                           <TouchableOpacity onPress={() => this.BottomSheetListMN.current.open()} disabled={this.props.dataParams.editable}>
                              <View pointerEvents="none">
                                 <TextField label={I18n.t('TxtModelName')} editable={!this.props.dataParams.editable} value={this.props.dataParams.model_name}
                                    onChangeText={(text) => {
                                       this.props.onParamAction({ model_name: text })
                                    }}
                                    ref={this.modalnameRef} />
                              </View>
                           </TouchableOpacity>

                           <BottomSheet
                              isShowSearch={true}
                              dataSearch={text => this.setState({ txtSearch: text })}
                              ref={this.BottomSheetListMN}
                              title={I18n.t('listModelName')}
                              height={Dimensions.get('screen').height / 1.2}>

                              <FlatList
                                 showsVerticalScrollIndicator={false}
                                 data={this.dataFilterList(this.state.txtSearch)}
                                 key={(item) => {
                                    item.id
                                 }}
                                 renderItem={this.renderItem}
                                 style={{
                                    width: '100%',
                                    backgroundColor: '#fff',
                                 }}
                                 ListEmptyComponent={this.ListEmptyComponent}
                                 contentContainerStyle={{}}
                                 legacyImplementation={true}
                                 //windowSize={50}
                                 removeClippedSubviews={true}
                                 disableIntervalMomentum={true}
                              />


                           </BottomSheet>
                        </View>
                     ) : (
                        <ScanBarcodeComponent {...this.props} />
                     )}
                  </View>
               </View>
               <SafeAreaView style={styles.endButton}>
                  <TouchableOpacity style={styles.bottomend} onPress={() => this.props.navigation.navigate('Tab')}>
                     <Image style={styles.leftIcon1} source={images.ic_arrowleft} />
                     <Text style={styles.ebut2}>{I18n.t('BACK')}</Text>
                  </TouchableOpacity>

                  {idTap === 1 && (
                     <TouchableOpacity style={styles.bottomend} onPress={this.onNextStep}>
                        <Text style={styles.ebut1} source={images.ic_arrow}>
                           {I18n.t('next')}
                        </Text>
                        <Image style={styles.leftIcon} source={images.iC_arrowright} />
                     </TouchableOpacity>
                  )}
               </SafeAreaView>
            </ScrollView>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   listModelName: {
      paddingVertical: size.s10,
      borderBottomWidth: 1,
      borderColor: color.borderColor,
      width: '100%',
   },
   txtModelName: {
      fontSize: size.s30,
      padding: 15,
      paddingRight: size.s30,
   },
   container: {
      flex: 1,
      backgroundColor: '#CCD8ED',
   },
   body: {
      flexDirection: 'row',
      padding: size.h24,
      justifyContent: 'space-between',
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
      height: size.s50,
   },
   changeScreen: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: size.s300 - 10,
      position: 'relative',
   },
   endButton: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      paddingBottom: size.h16,
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#CCD8ED',
      paddingTop: size.s60,
   },
   bottomend: {
      alignItems: 'center',
      paddingHorizontal: size.h65,
      paddingVertical: size.h20,
      flexDirection: 'row',
   },
   changeView: {
      flex: 1,
      paddingHorizontal: size.h16,
      paddingTop: size.h16,
      marginBottom: size.h100,
   },
   screen: {
      flex: 1,
   },
   leftIcon: {
      width: size.h52,
      height: size.h52,
      marginTop: size.s5,
      paddingRight: size.s7,
   },
   leftIcon1: {
      width: size.h40 - 2,
      height: size.h40 - 2,
      marginTop: size.s5,
      paddingRight: size.s7,
   },
   ebut1: {
      fontSize: size.h40,
      fontWeight: 'bold',
      color: '#003DA5',
   },
   ebut2: {
      fontSize: size.h40,
      fontWeight: 'bold',
      color: '#4F4F4F',
      paddingLeft: size.h10,
   },
   textpage: {
      fontSize: size.h28,
      color: '#4F4F4F',
      position: 'absolute',
      bottom: 0,
      padding: size.h65,
      paddingBottom: size.s80 + 2,
   },
   cricle: {
      transform: [{ rotate: '180deg' }],
   },
   content: {
      padding: size.h16,
      paddingLeft: size.s100,
   },
})


const mapStateToProps = (state) => {
   return {
      dataParams: state.paramsReducers,
      dataModelName: state.getListModelNameReducers
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onParamAction: (data) => {
         dispatch(actParamAction(data))
      },

      getListModelNameAction: () => {
         dispatch(getListModelNameAction())
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanBarcodeScreen)