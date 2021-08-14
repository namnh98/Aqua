import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import {
   View,
   Animated,
   TextInput,
   Text,
   Image,
   TouchableOpacity,
   Platform,
   TouchableWithoutFeedback,
   Alert,
} from 'react-native'
import { color } from '../../res/color'
import images from '../../res/image/index'
const TextField = forwardRef((props, ref) => {
   const {
      size,
      label,
      placeholder,
      defaultValue,
      secureTextEntry,
      onChangeText,
      editable,
      style,
      time,
      type,
      clearButton,
      textStyle,
      autoFocus,
      onFocus,
      onBlur,
      multiline,
      numberOfLines,
      keyboardAppearance,
      showEye,
      maxLength,
      showSearch
   } = props
   const [isFocused, setIsFocused] = useState(false)
   const [value, setValue] = useState(props.value)
   const [error, setError] = useState('')
   const [showPassword, setShowPassword] = useState(false)
   const OS = Platform.OS

   let _animatedIsFocused = useRef(new Animated.Value(0)).current
   let _animatedLabel = useRef(new Animated.Value(value !== '' || props.initAnimated === 1 ? 1 : 0)).current

   useEffect(() => {
      setValue(props.value)
   }, [props.value])

   useEffect(() => {
      // console.log(value);
      if (value !== '' || isFocused) {
         animatedLabel(1)
      } else {
         animatedLabel(0)
      }
   }, [isFocused, value])

   const animatedFocus = (value) => {
      Animated.timing(_animatedIsFocused, {
         toValue: value,
         duration: time,
         useNativeDriver: false,
      }).start()
   }

   const animatedLabel = (value) => {
      Animated.parallel([
         Animated.timing(_animatedLabel, {
            toValue: value,
            duration: time,
            useNativeDriver: false,
         }).start(),
      ]).start(() => {
         // callback
      })
   }

   useImperativeHandle(ref, () => ({
      error: (error) => {
         setError(error)
      },
      animatedFocus: () => {
         Animated.timing(_animatedIsFocused, {
            toValue: 1,
            duration: time,
            useNativeDriver: false,
         }).start()
      },
   }))

   let borderColor = color.normal
   if (isFocused) {
      if (error === '') {
         borderColor = color.normal
      } else {
         borderColor = color.error
      }
   } else {
      if (error === '') {
         borderColor = color.border
      } else {
         borderColor = color.error
      }
   }

   const labelStyle = {
      left: 16,
      position: 'absolute',
      top: _animatedLabel.interpolate({
         inputRange: [0, 1],
         outputRange: [
            size,
            size * 0.25,
            // OS === 'android' ? size * 1.35 : size * 1.1235,
            // OS === 'android' ? size * 0.2 : 0
         ],
      }),
      bottom: _animatedLabel.interpolate({
         inputRange: [0, 1],
         outputRange: [
            size,
            size * 2,
            // OS === 'android' ? size * 1.35 : size * 1.125,
            // OS === 'android' ? size * 0.2 : 0
         ],
      }),
      fontSize: _animatedLabel.interpolate({
         inputRange: [0, 1],
         outputRange: [size, size * 0.75],
      }),
      color: _animatedLabel.interpolate({
         inputRange: [0, 1],
         outputRange: [color.placeholder, color.labelFocus],
      }),
      lineHeight: _animatedLabel.interpolate({
         inputRange: [0, 1],
         outputRange: [size * 1.25, Platform.OS === 'ios' ? size * 1.25 : size],
      }),
   }

   // const clearValue = () => {
   //   setValue ("")
   // }

   const styleNormal = {
      paddingVertical: !isFocused && value === '' ? size * 1.125 : 0,
      paddingTop: isFocused || value !== '' ? size * 1.15 : 0,
      lineHeight: size * 1.25,
      fontSize: size,
      borderColor: '#ccc',
      paddingLeft: 16,
      paddingRight: clearButton && value !== '' ? 0 : 16,
      flex: 1,
      color: color.text,
   }

   const styleTextBorder = {
      paddingVertical: !isFocused && value === '' ? size * 1.125 : 0,
      paddingTop: isFocused || value !== '' ? size * 1.15 : 0,
      lineHeight: size * 1.25,
      fontSize: size,
      borderColor: '#ccc',
      paddingLeft: 16,
      paddingRight: clearButton && value !== '' ? 0 : 16,
      flex: 1,
      color: color.text,
   }

   const styleBorder = {
      borderWidth: 1,
      borderColor: !props.borderColor ? borderColor : props.borderColor,
      minHeight: size * 3.5,
      justifyContent: 'center',
      borderRadius: 10,
   }

   const styleBorderColor = {
      borderWidth: 1,
      borderColor: props.borderColor,
      minHeight: size * 3.5,
      justifyContent: 'center',
      borderRadius: 10,
   }
   return (
      <View
         style={[
            {
               width: '100%',
               // minHeight: size * 2,
            },
         ]}>
         <View
            style={[
               {
                  width: '100%',
                  minHeight: size,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: !editable ? color.border : color.backgroundColor,
               },
               style,
               type === 'border' && styleBorder,
               type === 'borderColor' && styleBorderColor,
               type === 'normal' && {
                  borderBottomWidth: isFocused ? 0 : 1,
                  borderBottomColor: borderColor,
                  justifyContent: 'center',
               },
            ]}>

            <Animated.Text style={labelStyle}>
               {label}
               {props.isRequired && (
                  <Text
                     style={{
                        color: color.error,
                        fontSize: props.size,
                     }}>
                     {' '}
                     *
                  </Text>
               )}
            </Animated.Text>



            <TextInput
               secureTextEntry={showEye ? !showPassword : secureTextEntry}
               multiline={multiline}
               numberOfLines={numberOfLines}
               autoFocus={autoFocus}
               placeholder={isFocused ? placeholder : ''}
               editable={editable}
               maxLength={maxLength}
               defaultValue={defaultValue}
               keyboardAppearance={color.keyboardAppearance}
               onChangeText={(text) => {
                  onChangeText(text)
                  setValue(text)
               }}
               value={value}
               style={[
                  {},
                  textStyle,
                  type === 'normal' && styleNormal,
                  type === 'border' && styleTextBorder,
                  type === 'borderColor' && styleBorderColor,
               ]}
               keyboardType={props.numeric ? 'numeric' : 'default'}
               onFocus={async () => {
                  await setError('')
                  await setIsFocused(true)
                  onFocus()
               }}
               onBlur={async () => {
                  await setIsFocused(false)
                  await setError('')
                  onBlur()
               }}
            />
            {type === 'normal' && (
               <Animated.View
                  style={{
                     width: _animatedIsFocused.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                     }),
                     backgroundColor: _animatedIsFocused.interpolate({
                        inputRange: [0, 1],
                        outputRange: [color.border, borderColor],
                     }),
                     height: 1,
                     alignSelf: 'center',
                     position: 'absolute',
                     bottom: 0,
                  }}></Animated.View>
            )}

            {/* {clearButton && value !== '' && isFocused && (
               <TouchableOpacity
                  onPress={() => {
                     setValue('')
                     onChangeText('')
                     // animatedLabel(0)
                  }}
                  style={{
                     alignItems: 'center',
                     justifyContent: 'center',
                  }}>
                  <View>
                     <Image
                        style={{
                           width: size * 1.25,
                           height: size * 1.25,
                           margin: 10,
                        }}
                        resizeMode="contain"
                        source={images.ic_close}
                     />
                  </View>
               </TouchableOpacity>
            )} */}

            {showSearch &&
               <Image
                  style={{
                     width: size * 1.25,
                     height: size * 1.25,
                     margin: 10,

                  }}
                  resizeMode="contain"
                  source={images.ic_search}
               />}
            {showEye && isFocused && value !== '' && (
               <View
                  style={{
                     width: 1,
                     height: '60%',
                     backgroundColor: color.border,
                  }}
               />
            )}

            {showEye && (
               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Image
                     style={{
                        width: size * 1.25,
                        height: size * 1.25,
                        margin: 10,
                     }}
                     resizeMode="contain"
                     source={!showPassword ? images.ic_eye : images.ic_eye_off}
                  />
               </TouchableOpacity>
            )}
         </View>
         {!showSearch &&
            <Text
               numberOfLines={2}
               style={{
                  // paddingHorizontal: 16,
                  color: color.error,
                  fontSize: size * 0.75,
                  fontWeight: '500',
               }}>
               {error}
            </Text>
         }
      </View>
   )
})

TextField.defaultProps = {
   placeholder: '',
   label: 'Input text',
   size: 16,
   defaultValue: '',
   editable: true,
   time: 200,
   keyboardAppearance: '',
   numeric: false,
   type: 'border',
   clearButton: true,
   autoFocus: false,
   onChangeText: (text) => { },
   onFocus: () => { },
   onBlur: () => { },
   multiline: false,
   numberOfLines: 1,
   error: '',
   value: '',
   secureTextEntry: false,
   showEye: false,
   showSearch: false,
   onPress: () => { },
}

export default React.memo(TextField)