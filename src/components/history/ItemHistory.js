import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native'
import images from '../../res/image'
import size from '../../res/size'
import moment from 'moment'
import I18n from '../../settings/i18n'

const ItemHistory = (props) => {
   // console.log(props.product_evidence, 'hinh')
   const onChangeColorStatus = (item) => {
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
   const onStatus = (item) => {
      switch (item) {
         case 'Aprroved':
            return <Image style={styles.icon} source={images.ic_check} resizeMode={'contain'} />
         case 'Inprogress':
            return <Image style={styles.icon} source={images.ic_arrows} />
         case 'Reject':
            return <Image style={styles.icon} source={images.rejected} />
         default:
            return ''
      }
   }
   const changeStatus = (item) => {
      if (item === 'Submit') {
         return `${I18n.t('Inprogress')}`
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
   return (
      <View style={styles.container}>
         <ImageBackground
            source={props.product_evidence === "" ? images.no_image : { uri: props.product_evidence !== "" ? props.product_evidence : undefined }}
            style={styles.image}
         />
         <View style={{ marginLeft: size.s20, flex: 1, justifyContent: "space-between", }}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: "space-between" }}>
               <Text style={styles.nameModal}>
                  {props.model_name} {onStatus(props.status)}
               </Text>
               <View style={{ flexDirection: 'row' }}>
                  {props.note &&
                     <Image
                        source={images.ic_message}
                        style={{
                           width: size.h32, height: size.h32, marginRight: size.h10
                        }}
                     />}
                  {props.e_voucher &&
                     <Image
                        source={images.ic_discount}
                        style={{ width: size.h32, height: size.h32, }}
                     />}

               </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
               <Image
                  source={images.ic_package}
                  style={{ width: size.h12 * 2, height: size.h12 * 2, alignSelf: "center", marginRight: size.h10 }} />
               <Text style={styles.serialNumber}>{props.serial_number.trim()}</Text>
            </View>

            <Text style={[styles.status, { color: onChangeColorStatus(props.status) }]}>
               {changeStatus(props.status)}
            </Text>
            <View style={{ flexDirection: 'row', }}>
               <Image source={images.ic_clock} style={{ width: size.h12 * 2, height: size.h12 * 2, alignSelf: "center", marginRight: size.h10 }} />
               <Text style={styles.dateTime}>{moment(props.created_date).format('DD/MM/YYYY LT')}</Text>
            </View>

            <TouchableOpacity style={styles.moreButton} onPress={() => props.onPress()}>
               <Text style={styles.txtSeeMore} source={images.ic_arrow}>{I18n.t('SeeMore')}</Text>
               <Image style={styles.leftIcon} source={images.iC_arrowright} />
            </TouchableOpacity>
         </View>
      </View >
   )
}

const styles = StyleSheet.create({
   picture: {
      borderRadius: 8,
      resizeMode: "contain",
      alignSelf: "center"
   },
   container: {
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      elevation: 4,
      padding: size.h20,
      borderRadius: 10,
      marginTop: size.h40,
      marginHorizontal: size.h40,
      flexDirection: 'row',
   },
   image: {
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      elevation: 2,
      width: size.s180,
      height: size.s240,
      resizeMode: "contain",
      borderRadius: 10,
      overflow: "hidden",
   },
   nameModal: {
      fontSize: size.h18 * 2,
      fontWeight: '700',
   },
   serialNumber: {
      fontSize: size.h10 * 2, color: "#828282",
   },
   dateTime: {
      color: '#BDBDBD',

      fontSize: size.h20
   },
   icon: {
      width: size.s40 + size.s2,
      height: size.s40 + size.s2,
   },

   leftIcon: {
      width: size.h16 * 2, height: size.h16 * 2, alignSelf: "center"
   },
   txtSeeMore: {
      marginRight: size.h12,
      fontWeight: "500",
      fontSize: size.h12 * 2,
      color: '#003DA5',
   },
   moreButton: {
      flexDirection: 'row',
      marginTop: size.s15,
   },

   status: {
      fontSize: size.h14 * 2,
      fontWeight: "400",
      paddingVertical: size.h10
   }
})

export default ItemHistory
ItemHistory.defaultProps = {
   onPress: () => { },
}
