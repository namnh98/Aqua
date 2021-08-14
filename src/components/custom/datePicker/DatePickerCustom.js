import Sizes from '../../../res/size'
import React, { useRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import DatePicker from './DatePicker'
import TextField from '../TextField'
const BASE_SIZE = Sizes.h32 //text size and padding size
const VIEW_HEIGHT = BASE_SIZE * 3.5 //chiều cao của view tổng

const DatePickerCustom = (props) => {

   return (
      <DatePicker
         {...props}
         title={props.title}
         onSelect={(res) => {
            let date = new Date()
            date.setDate(res.date)
            date.setMonth(res.month - 1)
            date.setFullYear(res.year)
            const dateSelect = `${res.date < 10 ? '0' + res.date : res.date}/${res.month < 10 ? '0' + res.month : res.month
               }/${res.year}`
            props.onSelectDate(dateSelect)
         }}
         placeHolder={
            <View pointerEvents="none">
               <TextField ref={props.refs} editable={false} style={{ backgroundColor: 'white' }} {...props} />
            </View>
         }
      />
   )
}

export default DatePickerCustom

const styles = StyleSheet.create({
   icon32: { width: 32, height: 32 },
   styleDatePicker: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: 'gray',
      paddingHorizontal: Sizes.h32,
      borderRadius: 10,
      height: VIEW_HEIGHT,
      marginHorizontal: Sizes.h32,
   },
   pickerContainer: {
      justifyContent: 'space-between',
   },
   styleTimePicker: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: 'gray',
      paddingHorizontal: 10,
      borderRadius: 10,
      height: VIEW_HEIGHT,
      // width: screenWidth,
   },
   label: {
      color: 'gray',
   },
   value: {
      fontSize: BASE_SIZE,
   },
})
