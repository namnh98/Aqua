import React, { Component } from 'react'
import {
   Text,
   StyleSheet,
   View,
   Image,
   TouchableOpacity,
   Alert,
   Platform,
   PermissionsAndroid,
   Dimensions,
} from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import images from '../../../res/image'
import size from '../../../res/size'
import BottomSheet from '../../custom/BottomSheet'
import { PERMISSIONS, RESULTS, openSettings, request } from 'react-native-permissions'
import ScalableImage from '../../custom/ScalableImage'
import { userProfile } from '../../../settings/index'
import { actParamAction, actParamUrlAction, actUpdateImage } from '../../../redux/action/paramAction'
import { connect } from 'react-redux'
import I18n from '../../../settings/i18n'
const options = {
   storageOptions: {
      skipBackup: true,
      path: 'images',
   },
   cameraType: 'back',
   mediaType: 'photo',
   quality: 0.5,
}
class UploadImg extends Component {
   constructor(props) {
      super(props)
      // this.state = {
      //    image: this.props.dataParams.evidence[this.props.index_image].url,
      // }
      this.BottomSheetRef = React.createRef()
   }
   onPressChooseImage = () => {
      this.BottomSheetRef.current.open()
   }
   openCamera = () => {
      launchCamera(options, (response) => {
         // console.log('uri', response.uri, 'type', response.type, 'name', response.fileName)
         if (response.didCancel) {
            // console.log('User cancelled image picker');
         } else if (response.errorCode) {
            // console.log('errorCode: ', response.error);
         } else if (response.errorMessage) {
            // console.log('errorMessage: ', response.customButton);
         } else {
            var image = {
               uri: response.uri,
               type: response.type,
               name: userProfile.user_name + '_' + Date.now(),
               quality: 0.5,
            }
            this.BottomSheetRef.current.close(() => {
               // this.setState({ image: image.uri })
               this.props.onUpload(image)
            })
         }
      })
   }
   deleteImage = () => {
      var image = {
         uri: '',
         type: null,
         name: null,
         quality: null,
      }
      // this.setState({ image: image.uri })
      this.props.onUpload(image)
   }
   onPressLaunchCamera = async () => {
      if (Platform.OS === 'ios') {
         request(PERMISSIONS.IOS.CAMERA).then((result) => {
            if (result === RESULTS.GRANTED) {
               this.openCamera()
            } else {
               Alert.alert('Thông báo', 'Vui lòng cho phép ứng dụng truy cập vào máy ảnh của bạn để tiếp tục', [
                  { text: 'Cancel' },
                  {
                     text: 'OK',
                     onPress: () => {
                        openSettings().catch(() => console.warn('cannot open settings'))
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
               this.openCamera()
            }
         } catch (err) { }
      }
   }

   openLibrary = () => {
      launchImageLibrary(options, (response) => {
         // console.log('uri', response.uri, 'type', response.type, 'name', response.fileName);
         if (response.didCancel) {
            // console.log('User cancelled image picker')
         } else if (response.errorCode) {
            // console.log('ImagePicker Error: ', response.error)
         } else if (response.errorMessage) {
            // console.log('errorMessage: ', response.customButton)
         } else {
            var image = {
               uri: response.uri,
               type: response.type,
               name: userProfile.user_name + '_' + Date.now(),
               quality: 0.5,

               // base64: response.base64,
            }
            // this.BottomSheetRef.current.close(() => this.setState({ image: image.uri }))
            this.BottomSheetRef.current.close()
            this.props.onUpload(image)
         }
      })
   }

   onPressLaunchLibrary = async () => {
      if (Platform.OS === 'ios') {
         request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
            if (result === RESULTS.GRANTED) {
               this.openLibrary()
            } else {
               Alert.alert('Thông báo', 'Vui lòng cho phép ứng dụng truy cập vào máy ảnh của bạn để tiếp tục', [
                  { text: 'Cancel' },
                  {
                     text: 'OK',
                     onPress: () => {
                        openSettings().catch(() => console.warn('cannot open settings'))
                     },
                  },
               ])
            }
         })
      }
      //permissions use camera android
      else {
         try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
               this.openLibrary()
            }
         } catch (err) { }
      }
   }
   render() {
      return (
         <>
            <View style={styles.imagespic}>
               <ScalableImage
                  width={Dimensions.get('screen').width * 0.96}
                  style={styles.picture}
                  // source={this.state.image !== '' ? { uri: this.state.image } : images.ic_nopicture}
                  source={this.props.dataParams.evidence[this.props.index_image].url !== '' ? { uri: this.props.dataParams.evidence[this.props.index_image].url } : images.ic_nopicture}

               />
               <View style={styles.AllviewIcon}>
                  <View style={styles.viewIcon}>
                     <Text>{this.props.title}</Text>
                  </View>
                  <View style={styles.viewIcon}>
                     <TouchableOpacity onPress={() => this.onPressChooseImage()}>
                        <Image style={styles.icon} source={images.ic_camera} />
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => this.deleteImage()}>
                        <Image style={styles.icon} source={images.ic_trash} />
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
            <BottomSheet ref={this.BottomSheetRef} title={I18n.t('chosseImage')} height={200}>
               <TouchableOpacity style={styles.btnimg} onPress={this.onPressLaunchCamera}>
                  <Text style={styles.textimg}>{I18n.t('camera')}</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.btnimg} onPress={this.onPressLaunchLibrary}>
                  <Text style={styles.textimg}>{I18n.t('lib')}</Text>
               </TouchableOpacity>
            </BottomSheet>
         </>
      )
   }
}

const styles = StyleSheet.create({
   picture: {
      borderRadius: 8,
   },
   imagespic: {
      width: '100%',
      // height: '23%',
      borderRadius: 8,
      marginBottom: size.h28,
   },
   icon: {
      width: size.s50,
      height: size.s50,
   },
   viewIcon: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      width: '25%',
      justifyContent: 'space-around',
      padding: size.h10,
      borderRadius: 4,
      alignItems: 'center',
   },
   AllviewIcon: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: size.h10,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      marginBottom: size.h16,
   },
   text: {
      fontSize: size.s25,
   },
   btnimg: {
      padding: (size.s15 + size.s5) * 2,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,

   },
   textimg: {
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',
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
      onParamUrl: (data) => {
         dispatch(actParamUrlAction(data))
      },
      onUpdateImage: (data) => {
         dispatch(actUpdateImage(data))
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadImg)
//
// export default UploadImg