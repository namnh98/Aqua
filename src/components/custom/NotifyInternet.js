import React, { useImperativeHandle, forwardRef, useRef } from 'react';
import { Animated, Text, Image, SafeAreaView, Platform } from 'react-native'
import size from '../../res/size';
import { color } from "../../res/color";
import { getStatusBarHeight } from '../../res/getStatusBarHeight';
const NotifyInternet = forwardRef((props, ref) => {
  const { time } = props;
  const _animatedView = useRef(new Animated.Value(0)).current;

  showNotifyInternet = () => {
    Animated.timing(_animatedView, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }
  hideNotifyInternet = () => {
    Animated.timing(_animatedView, {
      toValue: 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }

  useImperativeHandle(ref, () => ({
    showNotifyInternet: () => {
      showNotifyInternet();
      setTimeout(() => {
        hideNotifyInternet();
      }, time)
    },
  }));

  const labelStyle = {
    bottom: 0,
    transform: [
      {
        translateY: _animatedView.interpolate({
          inputRange: [0, 1],
          outputRange: [200, props.paddingBottom],
        }),
      },
    ],
    width: "100%",
    backgroundColor: props.color,
    position: "absolute",
    paddingHorizontal: 18,
    zIndex: 3,
  };

  return (
    <Animated.View style={labelStyle}>
      <SafeAreaView
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          resizeMode="contain"
          source={props.icon}
          style={{
            width: props.size * 1.5,
            height: props.size * 1.5,
            tintColor: '#fff'
          }}

        />
        <Text
          style={{
            fontSize: props.size,
            color: "#fff",
            paddingVertical: props.size,
            paddingHorizontal: size.s20,
          }}
        >
          {props.label}
        </Text>
      </SafeAreaView>
    </Animated.View>
  );
});

NotifyInternet.defaultProps = {
  label: "This is the title",
  time: 2000,
  type: "default",
  size: 14,
  color: color.green,
  paddingBottom: -80,
};

export default NotifyInternet;
