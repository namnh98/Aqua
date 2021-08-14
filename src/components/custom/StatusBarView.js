import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar } from 'react-native'

export class StatusBarView extends Component {
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#CCD8ED' }}>
        <View style={{ height: StatusBar.currentHeight }}></View>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          hidden={false}
          translucent
        //  backgroundColor="white"
        />

      </SafeAreaView>
    )
  }
}

export default StatusBarView;
