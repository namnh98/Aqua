import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import { fonts } from '../../res/values/styles/baseTheme';
import { color } from "../../res/color";
import size from "../../res/size";
import ProgressCircle from './ProgressCircle';
const StepView = (props) => {
   const [step, setStep] = useState(0);
   useEffect(() => {
      setStep(props.step);
   }, []);
   return (
      <View style={styles.container}>
         <ProgressCircle
            value={step / props.totalStep}
            children={
               <Text style={styles.step}>{`${props.step}/${props.totalStep}`}</Text>
            }
         />
         <View style={styles.titleView}>
            <Text style={styles.txtStep}>{`Bước ${props.step}`}</Text>
            <Text style={styles.txtTitle}>{props.title}</Text>
         </View>
      </View>
   );
};

export default StepView;
StepView.defaultProps = {
   step: 1,
   totalStep: 3,
   title: 'Tiêu đề',
};
const styles = StyleSheet.create({
   container: {
      backgroundColor: color.white,
      borderBottomColor: color.gray2,
      borderBottomWidth: 1,
      paddingVertical: size.h32,
      paddingHorizontal: size.s40,
      flexDirection: 'row',
      alignItems: 'center',
   },
   step: {
      fontSize: size.h28,
      color: color.green1,
      //fontFamily: fonts.regular,
   },
   titleView: {
      marginLeft: size.h32,
      flex: 1,
   },
   txtStep: {
      fontSize: size.h20,
      color: color.green1,
      //fontFamily: fonts.bold,
   },
   txtTitle: {
      fontSize: size.h28,
      color: color.black2,
      //fontFamily: fonts.regular,
   },
});