import React from 'react'
import { forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import {
   View,
   Text,
   Animated,
   StyleSheet,
   TouchableWithoutFeedback,
   KeyboardAvoidingView,
   Modal,
   Dimensions,
   Image,
   TouchableOpacity,
   Platform,
   ScrollView,
} from 'react-native'
import { color } from '../../res/color'
import images from '../../res/image'
import size from '../../res/size'
import TextField from './TextField'

const BottomSheet = forwardRef((props, ref) => {
   const [show, setShow] = useState(false)
   const [text, setText] = useState("")
   const translateY = React.useRef(new Animated.Value(props.height)).current
   const time = 300
   useImperativeHandle(ref, () => ({
      open: () => open(),
      close: (callback) => close(callback),
   }))

   useEffect(() => {
      show && slideUp()
   }, [show])

   const open = () => {
      setShow(true)
   }
   const close = (callback) => {
      slideDown()
      setTimeout(() => {
         setShow(false)
         if (callback !== undefined) {
            callback()
         }
      }, time)
   }
   const slideUp = () => {
      Animated.timing(translateY, {
         toValue: 0,
         duration: time,
         useNativeDriver: true,
      }).start()
   }
   const slideDown = () => {
      Animated.timing(translateY, {
         toValue: props.height,
         duration: time,
         useNativeDriver: true,
      }).start()
   }
   const iconRefresh = () => (
      <TouchableOpacity
         onPress={() => {
            props.onReset()
         }}>
         <Image
            source={images.ic_refresh}
            style={{ width: size.s40, height: size.s40, padding: size.s25, marginRight: size.s25 }}
         />
      </TouchableOpacity>
   )

   const iconNull = () => (
      <View stlye={{ marginRight: size.s25, width: size.s40, height: size.s40 }}>
         <Image
            source={images.ic_refresh}
            style={{ width: size.s40, height: size.s40, padding: size.s25, marginRight: size.s25, tintColor: '#fff' }}
         />
      </View>
   )

   const searchTextBox = () => (
      <View style={{ padding: 10 }}>
         <TextField
            showSearch={true}
            label="Search"
            value={text}
            onChangeText={(text) => {
               setText(text)
               props.dataSearch(text)
            }}
         /></View>
   )
   return (

      <Modal visible={show} animationType="fade" statusBarTranslucent transparent>
         <TouchableWithoutFeedback onPress={() => { }}>
            <KeyboardAvoidingView
               style={[styles.container, props.modalStyle]}
               behavior={Platform.OS === 'ios' ? 'padding' : null}
               keyboardVerticalOffset={Platform.OS === 'ios' ? -400 : 0}
            >
               <Animated.View style={[styles.bottomSheet, { height: props.height, transform: [{ translateY }] }]}>

                  <View style={styles.titleView}>
                     <TouchableOpacity
                        onPress={() => {
                           close()
                        }}
                        style={{ padding: size.s10, }}>
                        <Image
                           source={images.ic_close}
                           style={{ padding: size.s15, width: size.s40, height: size.s40 }}
                        />
                     </TouchableOpacity>
                     <Text style={styles.title}>{props.title}</Text>
                     {props.isShowRefresh ? iconRefresh() : null}

                     {props.isShowNull && iconNull()}
                  </View>
                  {props.isShowSearch && searchTextBox()}
                  <ScrollView
                     nestedScrollEnabled
                     style={{ flex: 1 }}
                     contentContainerStyle={{ flexGrow: 1 }}
                     showsVerticalScrollIndicator={false}>
                     {props.children}
                  </ScrollView>

               </Animated.View>
            </KeyboardAvoidingView>
         </TouchableWithoutFeedback>
      </Modal>
   )
})

export default BottomSheet
BottomSheet.defaultProps = {
   height: Dimensions.get('window').height * 0.5,
   onReset: () => { },
}
const styles = StyleSheet.create({
   bottomSheet: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      width: '100%',
   },
   container: {
      flex: 1,
      backgroundColor: '#00000036',
      justifyContent: 'flex-end',
   },
   titleView: {
      paddingVertical: 14,
      paddingHorizontal: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      borderBottomColor: color.border,
      borderBottomWidth: 1,
   },
   title: {
      fontWeight: 'bold',
      fontSize: 18,
      width: '90%',
      textAlign: 'center',
   },
})
