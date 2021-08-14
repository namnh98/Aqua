import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import Header from '../custom/Header'
import size from '../../res/size'
import { color } from '../../res/color'
import images from '../../res/image/index'
import ScanBarcodeComponent from './scanBarcodeComponent'
import SerinumberComponent from './serinumberComponent'
import TextField from '../custom/TextField'
import ChartDonut from '../custom/ChartDonut'
import { actCreateSOAction, actUpdateSOAction } from '../../redux/action/selloutAction'
import { connect } from 'react-redux'
import LoadingView from '../custom/LoadingView'
import SnackBar from '../custom/SnackBar'
import { actParamClearAction } from '../../redux/action/paramAction'
import moment from 'moment'
import { RNS3 } from 'react-native-aws3'
import { S3Info, userProfile } from '../../settings'
import I18n from '../../settings/i18n'
import { AWS_KEY_ID, AWS_SECRET, S3_REGION, S3_BUCKET, ACL, SUCCESS_ACTION_STATUS, FOLDER_UPLOAD } from "@env"

class PreviewScreen extends Component {
   constructor(props) {
      super(props)
      this.state = {
         idTap: 1,
         AlertError: false,
         snackBarMessage: ''
      }
      this.snackBar = React.createRef()
   }
   componentDidMount() {
      console.log(this.props?.dataParams.activity)
   }
   componentDidUpdate(prevProps) {
      // create SO
      if (this.props.loading !== prevProps.loading && !this.props.loading) {
         if (this.props?.data?.error) {
            this.setState(
               {
                  AlertError: true,
                  snackBarMessage: this.props.data.message,
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
               this.props.onClearAction()
               this.props.navigation.navigate('History')
            }, 1000)
         }
         if (prevProps.error !== this.props.error) {
            if (this.props.error !== undefined || this.props.error !== null) {
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
      }
      /// update SELL_OUT_UPDATE
      if (this.props.loadingUpdate !== prevProps.loadingUpdate && !this.props.loadingUpdate) {
         if (this.props.dataUpdate.error) {
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
               this.props.onClearAction()
               this.props.navigation.navigate('History')
            }, 1000)
         }
         if (prevProps.errorUpdate !== this.props.errorUpdate) {
            if (this.props.errorUpdate !== undefined || this.props.errorUpdate !== null) {
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
   }

   onSave = async () => {
      const promiseAll = [];
      for (const evidence of this.props.dataParams.evidence) {
         if (evidence && evidence.quality) {
            const image_upload = {
               uri: evidence.url,
               type: evidence.type,
               name: S3Info.folder_upload + `${userProfile.user_name}/` + evidence.image_name,
               quality: evidence.quality,
            }
            console.log('image name: ', image_upload.name);
            const option = {
               bucket: S3Info.bucket,
               region: S3Info.region,
               accessKey: S3Info.accessKey,
               secretKey: S3Info.secretKey,
               ContentType: S3Info.ContentType,
               acl: S3Info.acl,
               successActionStatus: S3Info.successActionStatus,
            }
            promiseAll.push(
               RNS3.put(image_upload, option)
            );
         }

      }
      Promise.all(promiseAll).then(res => {
         let data_request = this.props.dataParams
         for (const awsdata of res) {
            data_request = {
               ...data_request, evidence: data_request.evidence.map((evd) => {
                  if (evd.image_name === awsdata.body.postResponse.key.split('/').pop()) {
                     const data_replace = {
                        category: evd.category,
                        url: awsdata.body.postResponse.location,
                     }
                     evd = data_replace
                  }
                  return evd
               }),
            }
         }

         if (this.props.dataParams.activity == 'Re-submit') {
            this.props.onUpdateSO(data_request)
         }
         else {

            this.props.onCreateSO(data_request)
         }
      })


   }
   render() {
      // console.log(this.props.dataParams?.evidence, '3 file image')

      return (
         <View style={styles.container}>
            <Header title={this.props.dataParams.id === "" ? I18n.t('Registration') : I18n.t('Update')} />
            <LoadingView visible={this.props.loading} />
            <LoadingView visible={this.props.loadingUpdate} />

            <SnackBar
               color={this.state.AlertError != true ? color.green : color.red}
               label={this.state.snackBarMessage}
               size={size.s30}
               ref={this.snackBar}
            />
            <ScrollView
               contentContainerStyle={{ flexGrow: 1, padding: size.s40 }}
            //showsVerticalScrollIndicator={false}
            >
               <View style={styles.body}>
                  <View style={styles.cricle}>
                     <ChartDonut percentage={100} />
                  </View>
                  <Text style={styles.textpage}>4 of 4</Text>

                  <View style={styles.content}>
                     <View style={styles.text01}>
                        <Text style={{ fontSize: size.h46, fontWeight: 'bold' }}>{I18n.t('preview')}</Text>
                     </View>
                  </View>
               </View>
               <View style={styles.bodycenter}>
                  <View style={{ width: '100%', paddingBottom: size.h20, }}>
                     <Text style={{ fontWeight: 'bold', fontSize: size.h40 }}>{I18n.t('GeneralInfomation2')}</Text>
                  </View>
                  <TextField
                     size={size.s30}
                     label={I18n.t('TxtSellOutDate')}
                     editable={false}
                     value={this.props.dataParams?.sell_out_date !== "" ? moment(this.props.dataParams?.sell_out_date).format('DD/MM/YYYY') : ""}
                  />
                  <TextField
                     label={I18n.t('TxtCustomer')}
                     size={size.s30}
                     editable={false}
                     value={this.props.dataParams.customer_name}
                  />
                  <TextField
                     label={I18n.t('TxtCustomerPhone')}
                     size={size.s30}
                     editable={false}
                     value={this.props.dataParams.customer_phone}
                  />
                  <TextField
                     label={I18n.t('TxtSerial')}
                     size={size.s30}
                     value={this.props.dataParams.serial_number}
                     editable={false}
                  />
                  <TextField
                     label={I18n.t('TxtModelName')}
                     size={size.s30}
                     value={this.props.dataParams.model_name}
                     editable={false}
                  />
                  <View style={{ width: '100%', paddingBottom: size.h20 }}>
                     <Text style={{ fontWeight: 'bold', fontSize: size.h40 }}>{I18n.t('Evidence')}</Text>
                  </View>

               </View>
               <View style={{ paddingBottom: size.h20 }}><ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingLeft: size.h20, justifyContent: 'space-around', }}>
                  {this.props.dataParams?.evidence?.map((item, index) => {
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

                        />
                     )
                  })}

               </ScrollView>
               </View>
               <TouchableOpacity
                  style={styles.bottomend1}
                  onPress={() => {
                     this.onSave()
                  }}>
                  <Text style={styles.ebut1}>{I18n.t('SEND_REQUEST')}</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.bottomend1}
                  onPress={() => {
                     this.props.navigation.navigate('Tab')
                  }}>
                  <Text style={styles.ebut1}>{I18n.t('EDIT_REQUEST')}</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.bottomend}
                  onPress={() => {
                     this.props.onClearAction();
                     this.props.navigation.replace('Tab')
                  }}>
                  <Text style={styles.ebut}>{I18n.t('btnCancel')}</Text>
               </TouchableOpacity>
            </ScrollView >
         </View >
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#CCD8ED',
   },
   bodycenter: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
   },

   bottomend1: {
      marginBottom: size.h20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#003DA5',

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
   bottomend: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FCFCFC',
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
   text: {
      marginLeft: size.h48,
      marginBottom: size.h16,
   },
   image: {
      //flex: 2,
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: 'yellow',
   },
   imageItem: {
      width: size.s240, height: size.s200, resizeMode: "contain",
      borderRadius: 10,
      overflow: "hidden",
   },
   body: {
      flexDirection: 'row',
      paddingHorizontal: size.h24,
      paddingBottom: size.s40,
      justifyContent: 'space-between',
   },
   cricle: {
      transform: [{ rotate: '180deg' }],
   },
   textpage: {
      fontSize: size.h28,
      color: '#4F4F4F',
      position: 'absolute',
      bottom: 0,
      paddingLeft: size.s70,
      paddingBottom: size.s100,
   },
   content: {
      padding: size.h16,
   },
   text01: {
      paddingLeft: size.h65,
      justifyContent: 'flex-end',
   },
   text02: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
   },
   ebut: {
      fontWeight: 'bold',
      color: '#4F4F4F',
      fontSize: size.h40,
      paddingVertical: size.h20,
   },
   ebut1: {
      fontWeight: 'bold',
      color: '#FCFCFC',
      paddingVertical: size.h20,
      fontSize: size.h40,
   },
})

const mapStateToProps = (state) => {
   return {
      data: state.sellOutReducers.data,
      loading: state.sellOutReducers.loading,
      error: state.sellOutReducers.error,

      /// update
      dataUpdate: state.sellOutUpdateReducers.data,
      loadingUpdate: state.sellOutUpdateReducers.loading,
      errorUpdate: state.sellOutUpdateReducers.error,

      dataParams: state.paramsReducers,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onCreateSO: (data) => {
         dispatch(actCreateSOAction(data))
      },
      onUpdateSO: (data) => {
         dispatch(actUpdateSOAction(data))
      },
      onClearAction: () => {
         dispatch(actParamClearAction());
      },
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewScreen)
