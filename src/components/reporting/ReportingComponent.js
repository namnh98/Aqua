import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import size from '../../res/size'
import Header from '../custom/Header'

class ReportingComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header title="Reporting" isShowNotify onPressNotifi={() => this.props.navigation.navigate('NotificationComponent')} />
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text style={{ textAlign: 'center', fontSize: size.h18 * 2 }}>Feature will be update to version new</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCD8ED'
    }
})

export default ReportingComponent
