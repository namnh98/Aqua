import React, { Component } from 'react'
import { Dimensions, ImageBackground, StatusBar, StyleSheet, View ,Image} from 'react-native'
import images from '../../res/image/index';
import size from '../../res/size';
export default class SplashComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a: 'Login'
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.replace(this.state.a)
        }, 3000)
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="transparent"
                    hidden={false}
                    translucent
                />
            <Image source={images.logo_aqua} style={{width:201,height:78}}/>
                {/* <ImageBackground
                    source={images.logo_aqua}
                    style={{ flex: 1 }}
                    imageStyle={{
                        height: null,
                        width: null,
                        resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',
                        marginHorizontal: Platform.OS === 'ios' ? size.s80 : 0
                    }}
                /> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 100,
        height: '100%',
        width: '100%',
        backgroundColor: '#CCD8ED',
        justifyContent: 'center',
        alignItems: 'center',
    }
})