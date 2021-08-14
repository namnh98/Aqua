import React, { useEffect } from 'react';
import { Pressable, Image, View, Text, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { color } from '../../res/color';
import images from '../../res/image/index';
import size from '../../res/size';
import { userProfile } from '../../settings';
import { getListNotifyAction } from '../../redux/action/getListNotifyAction'
const Header = (props) => {

    const [ava, setAva] = React.useState(props.isShowAvatar);
    const [back, setBack] = React.useState(props.isShowBack);

    useEffect(() => {
        props.getListNotifyAction()
    }, [])

    const iconBack = () => (
        <TouchableOpacity onPress={() => { props.onPressBack() }} style={[styles.icon, styles.left]}>
            <Image source={images.ic_back} style={styles.icon} />

        </TouchableOpacity>
    );
    const iconFilter = () => (
        <TouchableOpacity onPress={() => { props.onPressFunction() }} style={[styles.icon, styles.right2]}>
            <Image source={images.ic_filter} style={styles.icon} />
        </TouchableOpacity>
    );

    const numNoti = () => {
        if (props?.dataNotify)
            if (!props?.dataNotify.error) {

                let array = props?.dataNotify?.filter((item) => !item.seen)
                if (array?.length > 0) {
                    return (
                        <View style={styles.backgroundNumNoti}>
                            <Text style={styles.txtNumNoti}>{array.length > 9 ? '9+' : array.length}</Text>
                        </View>
                    );
                }
            }
    };

    const avatar = () => (
        <TouchableOpacity style={[styles.icon, styles.left]}>
            <Image source={images.no_image || { uri: userProfile.avatar }} style={styles.icon} />
        </TouchableOpacity>
    )
    const iconBell = () => (
        <TouchableOpacity style={[styles.icon, styles.bell]} onPress={() => { props.onPressNotifi() }}>
            <ImageBackground source={images.ic_bell} style={styles.icon}>
                {numNoti()}
            </ImageBackground>
        </TouchableOpacity>
    );
    const iconMore = () => (
        <TouchableOpacity onPress={() => { }} style={[styles.icon, styles.right]}>
            <Image source={images.ic_more} style={styles.icon} />

        </TouchableOpacity>
    );
    return (

        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View style={{ backgroundColor: color.statusBar }}>
                <View style={{ height: StatusBar.currentHeight }} />
                <StatusBar
                    backgroundColor={'transparent'}
                    hidden={false}
                    translucent
                    barStyle={color.statusBar}
                />
                <View style={styles.container}>
                    {props.isShowBack ? iconBack() : null}

                    {props.isShowFilter ? iconFilter() : null}
                    {props.isShowAvatar ? avatar() : null}
                    {props.isShowMore ? iconMore() : null}
                    <Text style={[styles.title, { marginLeft: ava ? size.s80 : 0 }]}>{props.title}</Text>
                    {props.isShowNotify ? iconBell() : null}
                </View>
            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        padding: 10
    },
    title: {
        fontSize: size.h48,
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
        //borderRadius: size.s30
    },
    bell: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon24: {
        width: size.s50,
        height: size.s50,
        resizeMode: 'contain',
    },
    left: {
        position: 'absolute',
        left: 10,
    },
    right: {
        position: 'absolute',
        right: 10,
    },
    right2: {
        position: 'absolute',
        right: 10 + size.s60,
        marginRight: size.h30
    },

    backgroundNumNoti: {
        position: 'absolute',
        top: -size.s5,
        right: size.s5,
        backgroundColor: color.red,
        borderRadius: size.s10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 3,
    },
    txtNumNoti: {
        textAlign: 'center',
        fontSize: size.s20,
        paddingHorizontal: size.s2,
        color: color.white,
        fontWeight: 'bold',
    },
})

const mapStateToProps = (state) => {
    return {
        dataNotify: state.getListNotifyReducers.data,
        loadingNotify: state.getListNotifyReducers.loading,
        errorNotify: state.getListNotifyReducers.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListNotifyAction: () => {
            dispatch(getListNotifyAction())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Header))
Header.defaultProps = {
    onPressBack: () => { },
    onPressFunction: () => { },
    onPressNotifi: () => { },
}