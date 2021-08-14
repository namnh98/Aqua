import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import Header from '../custom/Header'
import size from '../../res/size'
import images from '../../res/image/index'
import TextField from '../custom/TextField'
import ChartDonut from '../custom/ChartDonut'
import DatePickerCustom from '../custom/datePicker/DatePickerCustom'
import { validateInput, convertDate } from '../../res/function'
import SnackBar from '../custom/SnackBar'
import { color } from '../../res/color'

class updateSOComponent extends Component {
    constructor(props) {
        super(props)
        let date = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        console.log('year', year)
        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }
        if (year < 10) {
            year = '0' + year
        }
        this.state = {
            idTap: 1,
            date: '',
            username: '',
            phone: '',
            snackBarMessage: '',
            snackBarError: false,
            dateString: `${year}-${month}-${day}`,
        }
        this.date = React.createRef()
        this.username = React.createRef()
        this.phone = React.createRef()
        this.snackBar = React.createRef()
    }
    onNextStep = () => {
        const { date, username, phone } = this.state

        const data = {
            selloutdate: date.slice(0, 10).split('/').reverse().join('-') + 'T00:00:00.000Z',
            username: username,
            phone: phone,
        }
        if (!this.checkData()) return null
        this.props.navigation.navigate('updateBarCode', { data })
    }
    checkData = () => {
        if (this.state.date === '') {
            this.setState(
                {
                    snackBarMessage: 'Please select date',
                    snackBarError: true,
                },
                () => {
                    this.snackBar.current.showSnackBar()
                },
            )
        }
        if (this.state.username === '') {
            // this.usernameRef.current.error('Please enter the username')
            this.username.current.error('Please enter the username')
        }
        if (this.state.phone === '') {
            this.phone.current.error('Please enter the phone')
        } else if (!validateInput(this.state.phone)) {
            this.phone.current.error('Please enter the correct format phone number')
            return false
        } else {
            return true
        }
    }
    componentDidMount() {
        this.setState({
            date: this.props.route.params.data.sell_out_date,
            username: this.props.route.params.data.customer_name,
            phone: this.props.route.params.data.customer_phone,
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Header
                    title="Update SO"
                    isShowNotify
                    onPressNotifi={() => this.props.navigation.replace('NotificationComponent')}
                />

                <SnackBar
                    color={this.state.snackBarError != true ? color.green : color.red}
                    label={this.state.snackBarMessage}
                    size={size.s30}
                    ref={this.snackBar}
                />
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled">
                    <View style={styles.body}>
                        <View style={styles.cricle}>
                            <ChartDonut percentage={25} defaults={25} />
                        </View>
                        <Text style={styles.textpage}>1 of 4</Text>

                        <View style={styles.content}>
                            <View style={styles.text01}>
                                <Text style={{ fontSize: size.h40, fontWeight: 'bold' }}>GENERAL INFORMATION</Text>
                            </View>

                            <View style={styles.text02}>
                                <Text style={{ fontSize: size.h36, color: '#828282' }}>Next: Scan Barcode</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.centerScreeen}>
                        <DatePickerCustom
                            {...this.props}
                            label="Sell out Date"
                            value={this.state.date}
                            title="Sell out Date"
                            onSelectDate={(res) => {
                                let date = new Date()
                                date.setDate(res.date)
                                date.setMonth(res.month - 1)
                                date.setFullYear(res.year)
                                this.setState(
                                    {
                                        date: res,
                                    },
                                    () => {
                                        console.log(this.state.date.slice(0, 10).split('/').reverse().join('-'), 'dateeeeee')
                                    },
                                )
                            }}
                        />
                        <TextField
                            label="Customer Name"
                            ref={this.username}
                            onChangeText={(text) => {
                                this.setState({
                                    username: text,
                                })
                            }}
                            value={this.state.username}
                        />
                        <TextField
                            label="Customer Phone"
                            ref={this.phone}
                            onChangeText={(text) => {
                                this.setState({
                                    phone: text,
                                })
                            }}
                            numeric={true}
                            value={this.state.phone}
                        />
                    </View>
                    <View style={styles.endButton}>
                        <TouchableOpacity
                            style={styles.bottomend}
                            onPress={() => {
                                this.onNextStep()
                            }}>
                            <Text style={styles.ebut}>NEXT</Text>
                            <Image style={styles.leftIcon} source={images.iC_arrowright} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCD8ED',
    },
    body: {
        flexDirection: 'row',
        padding: size.h24,
        justifyContent: 'space-around',
    },
    picture: {
        width: size.s300,
        height: size.s300,
    },
    text01: {
        flexDirection: 'row',
    },
    text02: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    picture2: {
        width: size.s100,
        height: size.s100,
    },
    endButton: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    bottomend: {
        backgroundColor: '#CCD8ED',
        paddingHorizontal: size.h60,
        paddingVertical: size.s30,
        marginRight: size.s45,
        flexDirection: 'row',
        alignItems: 'center',
    },
    centerScreeen: {
        padding: size.h48,
        justifyContent: 'space-around',
    },
    text: {
        marginLeft: size.h20,
        marginBottom: size.h16,
        color: '#4F4F4F',
        fontSize: size.h36,
    },
    ebut: {
        fontSize: size.h40,
        fontWeight: 'bold',
        color: '#003DA5',
    },
    leftIcon: {
        width: size.h52,
        height: size.h52,
        marginTop: size.s5,
        paddingRight: size.s7,
    },
    content: {
        padding: size.h16,
    },
    cricle: {
        transform: [{ rotate: '180deg' }],
    },
    textpage: {
        fontSize: size.h28,
        color: '#4F4F4F',
        position: 'absolute',
        bottom: 0,
        padding: size.h65,
        paddingBottom: size.s80 + 2,
    },
    crollview: {
        flex: 1,
    },
})
export default updateSOComponent;
