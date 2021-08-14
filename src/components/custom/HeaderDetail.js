import React from 'react';
import { Pressable, Image, View, Text, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, StatusBar } from 'react-native';
import { color } from '../../res/color';
import images from '../../res/image/index';
import size from '../../res/size';
const HeaderDetai = (props) => {


    const iconBack = () => (
        <TouchableOpacity onPress={() => { props.onPressBack() }} style={[styles.icon, styles.left]}>
            <Image source={images.ic_back} style={styles.icon} />

        </TouchableOpacity>
    );
    const iconMore = () => (
        <TouchableOpacity onPress={() => { }} style={[styles.icon, styles.right]}>
            <Image source={images.ic_more} style={styles.icon} />

        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={{ height: StatusBar.currentHeight }} />
            <StatusBar
                backgroundColor={'transparent'}
                hidden={false}
                translucent
                transparent={true}
                barStyle={color.statusBar}
            />
            <View style={styles.container}>
                {props.isShowBack ? iconBack() : null}
                {props.isShowMore ? iconMore() : null}
                <Text style={styles.title}>{props.title}</Text>
                {props.isStatus ? <Text style={{
                    color: props.color,
                    fontSize: 12,
                }}>{props.status}</Text> : null}
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: size.s100,
    },
    title: {
        fontSize: size.h36,
        fontWeight: 'bold',

    },
    status: {
        fontSize: 5,
        fontWeight: 'bold',
    },
    iconBack: {
        position: 'absolute',
        left: 0,
        height: 48,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: size.s60,
        width: size.s60,

    },


    left: {
        position: 'absolute',
        left: 10,

    },
    right: {
        position: 'absolute',
        right: 10,

    },



})
export default React.memo(HeaderDetai);

HeaderDetai.defaultProps = {
    onPressBack: () => { }
}