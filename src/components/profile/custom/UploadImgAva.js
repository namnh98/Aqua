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
import { userProfile } from '../../../settings'
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
let date = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()

class UploadImgAva extends Component {
   constructor(props) {
      super(props)
      this.state = {
         image: '',
      }
      this.BottomSheetRef = React.createRef()

   }

   onPressChooseImage = () => {
      this.BottomSheetRef.current.open()
   }
   openCamera = () => {
      launchCamera(options, (response) => {
         // console.log('uri', response.uri, 'type', response.type, 'name', response.fileName);
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
               fileSize: response.fileSize,
               quality: 0.5,
               // base64: response.base64,
            }

            this.BottomSheetRef.current.close(() => {
               this.setState({ image: image })
               this.props.onUpload(image)
            })
         }
      })
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
               fileSize: response.fileSize,
               quality: 0.5,
               // base64: response.base64,
            }
            this.BottomSheetRef.current.close(() => {
               this.setState({ image: image })
               this.props.onUpload(image)
            })
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
   componentDidMount() {
      userProfile.avatar ? this.setState({ image: { uri: userProfile.avatar } }) : images.no_image
   }
   render() {
      // console.log('avatar:', this.state.image)
      return (
         <>
            <View style={{ width: size.s60, alignItems: 'center', alignSelf: 'center' }}>
               <TouchableOpacity
                  onPress={() => {
                     this.onPressChooseImage()
                  }}>
                  <Image
                     style={styles.avatar}
                     source={userProfile.avatar !== '' ? { uri: userProfile.avatar } : images.no_image}
                  />
               </TouchableOpacity>
            </View>
            <BottomSheet ref={this.BottomSheetRef} title={I18n.t('chosseImage')} height={200} isShowNull>
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
   avatar: {
      alignSelf: 'center',
      marginTop: size.s20,
      width: size.s140 * 2,
      height: size.s140 * 2,
      borderRadius: size.s80 * 2,
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
export default React.memo(UploadImgAva)