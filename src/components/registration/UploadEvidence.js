import React, { Component } from 'react'
import {
   StyleSheet,
   Text,
   View,
   Image,
   TextInput,
   TouchableOpacity,
   ScrollView,
   Platform,
   SafeAreaView,
} from 'react-native'
import Header from '../custom/Header'
import size from '../../res/size'
import { color } from '../../res/color'
import images from '../../res/image/index'
import TextField from '../custom/TextField'
import ChartDonut from '../custom/ChartDonut'
import BottomSheet from '../custom/BottomSheet'
import { check, PERMISSIONS, RESULTS, openSettings, request } from 'react-native-permissions'
import UploadImg from './custom/UploadImg'
import { RNS3 } from 'react-native-aws3'
import { connect } from 'react-redux'
import { actParamAction, actParamUrlAction, actUpdateImage } from '../../redux/action/paramAction'
import { userProfile } from '../../settings'
import I18n from '../../settings/i18n'
class UploadEvidence extends Component {
   constructor(props) {
      super(props)
      this.state = {
         img1: '',
         img2: '',
         img3: '',
         _response: '',
         _response2: '',
         _response3: '',
      }
   }
   onUploadFileBucket = (file) => {
      console.log('function bucket', file)
      const option = {
         bucket: 's3-aqua',
         region: 'ap-southeast-1',
         accessKey: 'AKIAUMJNVNAP4YMRE55B',
         secretKey: '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',
         ContentType: 'image/jpeg',
         acl: 'public-read',
         successActionStatus: 201,
      }
      file['name'] = 'aqua_sell_out/' + `${userProfile.user_name}/` + file.name
      RNS3.put(file, option)
         .progress((e) => {
            let result = parseInt((e.loaded * 100) / e.total)
            console.log('Uploaded: ' + result + '%')
         })
         .then((response) => {

            this.props.onParamUrl({ category: 'red_voice', url: response.body.postResponse.location })
         })
   }
   onUploadFileBucket2 = (file) => {
      console.log('function bucket', file)
      const option = {
         bucket: 's3-aqua',
         region: 'ap-southeast-1',
         accessKey: 'AKIAUMJNVNAP4YMRE55B',
         secretKey: '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',
         ContentType: 'image/jpeg',
         acl: 'public-read',
         successActionStatus: 201,
      }
      RNS3.put(file, option)
         .progress((e) => {
            let result = parseInt((e.loaded * 100) / e.total)
            console.log('Uploaded: ' + result + '%')
         })
         .then((response) => {
            console.log(response.body.postResponse.location)

            this.props.onParamUrl({ category: 'serial_number', url: response.body.postResponse.location })
         })
   }
   onUploadFileBucket3 = (file) => {
      console.log('function bucket', file)
      const option = {
         bucket: 's3-aqua',
         region: 'ap-southeast-1',
         accessKey: 'AKIAUMJNVNAP4YMRE55B',
         secretKey: '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',
         ContentType: 'image/jpeg',
         acl: 'public-read',
         successActionStatus: 201,
      }
      RNS3.put(file, option)
         .progress((e) => {
            let result = parseInt((e.loaded * 100) / e.total)
            console.log('Uploaded: ' + result + '%')
         })
         .then((response) => {

            this.props.onParamUrl({ category: 'product', url: response.body.postResponse.location })
         })
   }
   onNext = () => {


      this.props.navigation.navigate('PreviewScreen')
   }
   goBack = () => {
      this.props.navigation.goBack()

   }
   render() {
      return (
         <View style={styles.container} >
            <Header title={this.props.dataParams.id === "" ? I18n.t('Registration') : I18n.t('Update')} />
            <ScrollView contentContainerStyle={styles.body}>
               <View style={styles.Headerbody}>
                  <View style={{ alignItems: 'center' }}>
                     <View style={styles.chartdonut}>
                        <ChartDonut percentage={75} />
                     </View>
                     <View style={styles.contenchart}>
                        <Text>3 of 4</Text>
                     </View>
                  </View>

                  <View style={styles.Taital}>
                     <Text style={{ fontSize: size.h46, fontWeight: 'bold' }}>{I18n.t('titleUPLOADEVIDENCE')}</Text>
                     <Text style={{ fontSize: size.h36, color: '#828282' }}>{I18n.t('nextPreview')}</Text>
                  </View>
               </View>
               <UploadImg
                  title="Red Voice"
                  index_image={0}
                  onUpload={(image) => {
                     console.log('image data sau khi upload 0 : ', image)
                     const image_data_for_redux = {
                        index: 0,
                        image_data: {
                           category: 'red_voice',
                           url: image.uri,
                           image_name: image.name,
                           quality: image.quality,
                           type: image.type
                        }
                     }
                     this.props.onUpdateImage(image_data_for_redux)

                     // this.setState({ img2: image }, () => {
                     //    this.onUploadFileBucket2(image)
                     // })
                  }

                  }
               />
               <UploadImg
                  title="Serial Number"
                  index_image={1}
                  onUpload={(image) => {
                     console.log('image data sau khi upload 1 : ', image)
                     const image_data_for_redux = {
                        index: 1,
                        image_data: {
                           category: 'serial_number',
                           url: image.uri,
                           image_name: image.name,
                           quality: image.quality,
                           type: image.type
                        }
                     }
                     this.props.onUpdateImage(image_data_for_redux)
                     // this.setState({ img2: image }, () => {
                     //    this.onUploadFileBucket2(image)
                     // })
                  }

                  }
               />
               <UploadImg
                  title="Product"
                  index_image={2}
                  onUpload={(image) => {
                     console.log('image data sau khi upload 2 : ', image)
                     const image_data_for_redux = {
                        index: 2,
                        image_data: {
                           category: 'product',
                           url: image.uri,
                           image_name: image.name,
                           quality: image.quality,
                           type: image.type
                        }
                     }
                     this.props.onUpdateImage(image_data_for_redux)
                     // this.setState({ img3: image }, () => {
                     //    this.onUploadFileBucket3(image)
                     // })
                  }
                  }
               />
            </ScrollView>
            <SafeAreaView style={styles.footerBottom}>
               <TouchableOpacity style={styles.bottomend} onPress={() => { this.goBack() }}>
                  <Image style={styles.leftIcon1} source={images.ic_arrowleft} />
                  <Text style={styles.ebut2}>{I18n.t('BACK')}</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.bottomend}
                  onPress={() => {
                     this.onNext()
                  }}>
                  <Text style={styles.ebut1} source={images.ic_arrow}>
                     {I18n.t('next')}
                  </Text>
                  <Image style={styles.leftIcon} source={images.iC_arrowright} />
               </TouchableOpacity>
            </SafeAreaView>
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
      flexGrow: 1,
      padding: size.h16,
   },
   Headerbody: {
      flexDirection: 'row',
      padding: size.h16,
      justifyContent: 'space-between',
      marginBottom: size.h38,
   },
   Taital: {
      justifyContent: 'center',
      alignItems: 'flex-end',
   },
   chartdonut: {
      transform: [{ rotate: '180deg' }],
   },
   contenchart: {
      position: 'absolute',
      bottom: 0,
      paddingBottom: size.s60,
   },
   picture: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
   },
   imagespic: {
      width: '100%',
      height: '23%',
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
   footerBottom: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      paddingBottom: size.h16,
   },
   bottomend: {
      alignItems: 'center',
      paddingHorizontal: size.h65,
      paddingVertical: size.h20,
      flexDirection: 'row',
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
   btnimg: {
      padding: 16,
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadEvidence)
