import React from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import size from '../../res/size';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);
export default function ChartDonut({
  percentage = '',
  radius = 40,
  strokeWidth = 10,
  duration = 3000,
  color = '#003DA5',
  delay = 500,
  textColor,
  max = 100,
  defaults = 25,
}) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const animation = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  };
  React.useEffect(() => {
    animation(percentage);
    animatedValue.addListener((v) => {
      if (circleRef.current) {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPerc) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
      if (inputRef?.current) {
        inputRef.current.setNativeProps({

        })
      }
    });
    return () => {
      animatedValue.removeAllListeners();
    }
  }, [max, defaults]);
  return (
    <View>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
          />
        </G>
      </Svg>
      <AnimatedInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        //defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: size.h30, color: "#4F4F4F" },
          { fontWeight: '900', marginLeft: size.h34 }
        ]}
      />
    </View>
  );
}