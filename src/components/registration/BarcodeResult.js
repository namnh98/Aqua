import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native'
import Header from '../custom/Header'
import size from '../../res/size'
import { color } from '../../res/color'
import images from '../../res/image/index'
import TextField from '../custom/TextField'
import ChartDonut from '../custom/ChartDonut'
import { connect } from 'react-redux'
import { actGetSerialNumberAction } from '../../redux/action/serialNumberAction'
import BottomSheet from '../custom/BottomSheet'
import { RNCamera } from 'react-native-camera'
import { check, PERMISSIONS, RESULTS, openSettings, request } from 'react-native-permissions'
import SnackBar from '../custom/SnackBar'
import { actParamAction } from '../../redux/action/paramAction'
import { getListModelNameAction } from '../../redux/action/getListModelNameAction'
import I18n from '../../settings/i18n'
const swidth = Dimensions.get('screen').width

class BarcodeResult extends Component {
   constructor(props) {
      super(props)
      this.state = {
         idTap: 1,
         value: '',
         serial_number: '',
         model_name: '',
         snackBarMessage: '',
         snackBarError: true,
         status: false,
         txtSearch: ''
      }
      this.serial_number = React.createRef()
      this.model_name = React.createRef()
      this.BottomSheetScan = React.createRef()
      this.snackBar = React.createRef()
      this.BottomSheetListMN = React.createRef()
   }

   componentDidMount() {
      this.props.getListModelNameAction()
   }

   checkData = () => {
      if (this.props.dataParams.serial_number === '') {
         this.serial_number.current.error(I18n.t('validateSerialNumber'))
      }
      if (this.props.dataParams.model_name == null || this.props.dataParams.model_name == '') {
         this.model_name.current.error(I18n.t('validateModelName'))
         return false
      } else {
         return true
      }
   }

   renderItem = ({ item, index }) => (
      <TouchableOpacity
         style={styles.listModelName}
         onPress={() => {
            this.BottomSheetListMN.current.close(
               () => {
                  this.props.onParamAction({ model_name: item.model_name })
                  this.model_name.current.error('')
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
               marginTop: size.s340 * 2,
               flex: 1,
               alignItems: 'center',
               justifyContent: 'center',
            }}>
            <Text style={{ fontSize: size.s30, color: '#8C8C8C', fontStyle: 'italic' }}>{I18n.t('listnotFound2')}</Text>
         </View>
      )
   }
   render() {
      const { idTap, modalScan } = this.state
      return (
         <View style={styles.container}>
            <Header
               title={this.props.dataParams.id === "" ? I18n.t('Registration') : I18n.t('Update')} isShowNotify={false} />
            <SnackBar
               color={this.state.snackBarError != true ? color.green : color.red}
               label={this.state.snackBarMessage}
               size={size.s30}
               ref={this.snackBar}
            />
            <ScrollView
               style={styles.crollview}
               contentContainerStyle={{ flexGrow: 1 }}
               showsVerticalScrollIndicator={false}
               keyboardShouldPersistTaps="handled">
               <View style={styles.body}>
                  <View style={styles.cricle}>
                     <ChartDonut percentage={50} />
                  </View>
                  <Text style={styles.textpage}>2 of 4</Text>

                  <View style={styles.content}>
                     <View style={styles.text01}>
                        <Text style={{ fontSize: size.h46, fontWeight: 'bold' }}>{I18n.t('titleBarcodeResult')}</Text>
                     </View>

                     <View style={styles.text02}>
                        <Text style={{ fontSize: size.h36, color: '#828282' }}>{I18n.t('barcodeResult')}</Text>
                     </View>
                  </View>
               </View>

               <View style={styles.textInput}>
                  <TextField

                     label={I18n.t('TxtSerial')}
                     ref={this.serial_number}
                     onChangeText={(text) => {
                        this.props.onParamAction({ serial_number: text })
                     }}
                     value={this.props.dataParams.serial_number}

                  />
                  {/* <TextField
                     label="Model Name"
                     value={this.props.dataParams.model_name}
                     ref={this.model_name}
                     onChangeText={(text) => {
                        this.props.onParamAction({ model_name: text })
                     }}
                     editable={this.props.dataParams.editable}
                  /> */}
                  <TouchableOpacity disabled={this.props.dataParams.editable} onPress={() => this.BottomSheetListMN.current.open()}>
                     <View pointerEvents="none" style={{ width: "100%" }}>
                        <TextField label={I18n.t('TxtModelName')} editable={!this.props.dataParams.editable} value={this.props.dataParams.model_name}
                           onChangeText={(text) => {
                              this.props.onParamAction({ model_name: text })
                           }}
                           ref={this.model_name} />
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
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                        ListEmptyComponent={this.ListEmptyComponent}
                     />


                  </BottomSheet>
                  <TouchableOpacity
                     style={styles.buttonreScan}
                     onPress={() => {
                        this.props.navigation.navigate('Regsi')
                     }}>
                     <Text style={styles.textScan}>{I18n.t('RESCAN')}</Text>
                  </TouchableOpacity>
               </View>

               <SafeAreaView style={styles.endButton}>
                  <TouchableOpacity
                     style={styles.bottomend}
                     onPress={() => {
                        this.props.navigation.navigate('GeneralInfomation')
                     }}>
                     <Image style={styles.leftIcon1} source={images.ic_arrowleft} />
                     <Text style={styles.ebut2}>{I18n.t('BACK')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={styles.bottomend}
                     onPress={() => {
                        if (!this.checkData()) return null
                        this.props.navigation.navigate('UploadEvidence')
                     }}>
                     <Text style={styles.ebut1}>{I18n.t('next')}</Text>
                     <Image style={styles.leftIcon} source={images.iC_arrowright} />
                  </TouchableOpacity>
               </SafeAreaView>


            </ScrollView>
         </View>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      data: state.serialnumberReducers.data,
      loading: state.serialnumberReducers.loading,
      error: state.serialnumberReducers.error,
      dataParams: state.paramsReducers,
      dataModelName: state.getListModelNameReducers
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onActionGetSerial: (data) => {
         dispatch(actGetSerialNumberAction(data))
      },
      onParamAction: (data) => {
         dispatch(actParamAction(data))
      },
      getListModelNameAction: () => {
         dispatch(getListModelNameAction())
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarcodeResult)

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
      paddingVertical: size.h24,
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
      height: size.s100,
   },
   endButton: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      paddingBottom: size.h16,
      position: 'absolute',
      bottom: 0,
      // backgroundColor: 'red',
      // backgroundColor: '#CCD8ED',
      paddingTop: size.s60,
   },
   bottomend: {
      alignItems: 'center',
      paddingHorizontal: size.h65,
      paddingVertical: size.h20,

      flexDirection: 'row',
   },
   text: {
      marginLeft: size.h48,
      marginBottom: size.h16,
   },
   cricle: {
      transform: [{ rotate: '180deg' }],
   },
   textpage: {
      fontSize: size.h28,
      color: '#4F4F4F',
      position: 'absolute',
      bottom: 0,
      padding: size.h44,
      paddingBottom: size.s80 + 2,
   },
   content: {
      padding: size.h16,
   },
   leftIcon: {
      width: size.h52,
      height: size.h52,
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
   leftIcon1: {
      width: size.h40 - 2,
      height: size.h40 - 2,
      marginTop: size.s5,
      paddingRight: size.s7,
   },
   crollview: {
      flex: 1,
      paddingHorizontal: size.h48,
   },
   textInput: {
      paddingTop: size.h40,
      justifyContent: 'center',
      alignItems: 'center',
   },
   buttonreScan: {
      backgroundColor: '#FCFCFC',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginTop: size.s35,
   },
   textScan: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#4F4F4F',
      paddingHorizontal: size.h30,
      paddingVertical: size.h14,
   },
   container1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: size.s160,
      // marginBottom: size.s200,
   },
   camera: {
      width: swidth * 0.8,
      height: swidth * 0.8,
   },
   viewmarker: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
   },
   marker: {
      borderWidth: 1,
      borderColor: '#FFFFFF',
      width: '70%',
      height: '70%',
      borderRadius: 8,
   },
})
