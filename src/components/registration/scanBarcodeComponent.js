import React, { Component } from 'react'
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Platform,
   Alert,
   Vibration,
   PermissionsAndroid,
   Linking,
   Dimensions,
} from 'react-native'
import size from '../../res/size'
import { RNCamera } from 'react-native-camera'
import LoadingView from '../custom/LoadingView'
import { check, PERMISSIONS, RESULTS, openSettings, request } from 'react-native-permissions'
import { connect } from 'react-redux'
import { actGetSerialNumberAction } from '../../redux/action/serialNumberAction'
import { actParamAction } from '../../redux/action/paramAction'
import { QRScannerView } from 'react-native-qrcode-scanner-view';

const swidth = Dimensions.get('screen').width
class scanBarcodeComponent extends Component {
   constructor(props) {
      super(props)
      this.state = {
         model_name: '',
         serial_number: '',
         snackBarMessage: '',
         snackBarError: false,
      }
   }
   componentDidUpdate(prevProps) {
      if (this.props.loading !== prevProps.loading && !this.props.loading) {
         if (this.props.data?.error) {
            // this.setState(
            //    {
            //       snackBarMessage: 'Server not responding',
            //       snackBarError: true,
            //    },
            //    () => {
            //       this.snackBar.current.showSnackBar()
            //    },
            // )
         }
         else if (!this.props.data?.model_name) {
            console.log('can note get model name ')
            this.props.onParamAction({ editable: true })

         } else {
            this.props.onParamAction({ model_name: this.props.data.model_name, editable: false })
         }
         if (prevProps.error !== this.props.error) {
            if (this.props.error !== undefined || this.props.error !== null) {
               //    this.setState(
               //       {
               //          snackBarMessage: 'Server not responding',
               //          snackBarError: true,
               //       },
               //       () => {
               //          this.snackBar.current.showSnackBar()
               //       },
               //    )
            }
         }
      }
   }
   onSuccess = (e) => {
      Vibration.vibrate()
      try {

         this.props.onParamAction({ serial_number: e.data, model_name: '' })

         if (this.props.dataParams.serial_number === '' || !this.props.dataParams.serial_number) {
            return null
         } else {
            this.props.onActionGetSerial(e.data)
            // this.props.onParamAction({ model_name: this.props.data.model_name })
            this.props.navigation.replace('BarcodeResult')
         }
      } catch (e) {
         this.props.onParamAction({ model_name: '' })
         console.log(e)
      }
   }

   requestPermissionCamera = async () => {
      if (Platform.OS === 'ios') {
         request(PERMISSIONS.IOS.CAMERA).then((result) => {
            if (result === RESULTS.GRANTED) {
               setShow(true)
            } else {
               Alert.alert('Thông báo', 'Vui lòng cho phép ứng dụng truy cập vào máy ảnh của bạn để tiếp tục', [
                  { text: 'Cancel' },
                  {
                     text: 'OK',
                     onPress: () => {
                        Linking.openSettings()
                     },
                  },
               ])
            }
         })
      }
      //permissions use camera android
      else {
         try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
               setShow(true)
            }
         } catch (err) { }
      }
   }

   barcodeReceived = (event) => {
      console.log('Type: ' + event.type + '\nData: ' + event.data)
   }

   render() {
      return (
         <View style={[styles.container]}>
            <LoadingView visible={this.props.loading} />
            <QRScannerView
               onScanResult={this.onSuccess}
               maskColor={''}
               //renderHeaderView={this.renderTitleBar}
               // renderFooterView={this.renderMenu}
               hintText={''}
               scanBarAnimateReverse={true}
            />
            {/* <RNCamera
               style={styles.camera}
               cameraViewDimensions={styles.camera}
               type={RNCamera.Constants.Type.back}
               flashMode={RNCamera.Constants.FlashMode.off}
               captureAudio={false}
               zoom={0.20}
               notAuthorizedView={<></>}
               pendingAuthorizationView={<></>}
               ratio={'18:18'}
               barCodeTypes={[
                  RNCamera.Constants.BarCodeType.code39,
                  RNCamera.Constants.BarCodeType.code128,
                  RNCamera.Constants.BarCodeType.ean13,
                  RNCamera.Constants.BarCodeType.ean8,
                  RNCamera.Constants.BarCodeType.upc_e,
                  RNCamera.Constants.BarCodeType.interleaved2of5,
               ]}
               onBarCodeRead={this.onSuccess}
               androidCameraPermissionOptions={{
                  title: 'Cấp quyền sử dụng máy ảnh',
                  message: 'Bạn vui lòng cấp quyền để sử dụng máy ảnh quét mã vạch',
                  buttonPositive: 'Cho phép',
                  buttonNegative: 'Từ chối',
               }}>
               <View style={styles.viewmarker}>
                  <View style={styles.marker} />
               </View>
            </RNCamera> */}
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      paddingTop: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      //marginTop: size.s160,
      // marginBottom: size.s200,
   },
   camera: {
      width: swidth * 1,
      height: swidth * 0.5,
   },
   viewmarker: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginBottom: size.s50,
   },
   marker: {
      borderWidth: 1,
      borderColor: '#E3162D',
      width: '100%',
      marginBottom: size.h38,
      //height: '60%',
      //borderRadius: 8,
   },
   centerText: {
      flex: 1,
      fontSize: 18,
      //padding: 32,
      color: '#777',
   },
   textBold: {
      fontWeight: '500',
      color: '#000',
   },
   buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)',
   },
   buttonTouchable: {
      padding: 16,
   },
})

const mapStateToProps = (state) => {
   return {
      data: state.serialnumberReducers.data,
      loading: state.serialnumberReducers.loading,
      error: state.serialnumberReducers.error,
      dataParams: state.paramsReducers,
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
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(scanBarcodeComponent)
