import React, { Component } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import HeaderDetail from '../custom/HeaderDetail'
import images from '../../res/image'
import size from '../../res/size'
import moment from 'moment'
import Snackbar from '../custom/SnackBar'
import LoadingView from '../custom/LoadingView'
import I18n from '../../settings/i18n'

class NotificationComponent extends Component {
    constructor(props) {
        super(props)
        this.state = { data: [], refreshing: false, loading: true }
        this.snackBar = React.createRef()
    }

    componentDidMount() {
        this.props.getListNotifyAction()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loading !== this.props.loading && !this.props.loading) {
            if (prevProps.data !== this.props.data) {
                if (this.props.data?.error) {
                    this.setState(
                        {
                            AlertError: false,
                            snackBarMessage: "Server not responding",
                            loading: false
                        },
                        () => {
                            this.snackBar.current.showSnackBar()
                        },
                    )
                } else
                    this.setState({
                        data: this.props.data,
                        refreshing: false,
                        loading: false
                    })
            }

        }
    }

    ListEmptyComponent = () => {
        return (
            <View
                style={{
                    marginTop: size.s340 * 2,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text style={{ fontSize: size.s30, color: '#8C8C8C', fontStyle: 'italic' }}>{I18n.t('listnotifi')}</Text>
            </View>
        )
    }

    handleRefresh() {
        this.setState({
            refreshing: true,
            data: [],
        })
        this.props.getListNotifyAction()
    }

    renderItems = ({ item, index }) => (
        <TouchableOpacity style={[styles.containerListItem, { backgroundColor: item.seen ? "#FFF" : "#A1BEF0", }]} onPress={async () => {
            this.props.navigation.navigate('DetailHistory', item.so_id)
            await this.props.checkNotifyAction(item.id)
            await this.props.getListNotifyAction()
            item.seen = true
        }}>
            <View style={styles.card}>
                <Image
                    source={item.status === "Approved" ? images.ic_approved : images.ic_rejected}
                    style={styles.image}
                />
                <View style={{ marginLeft: size.s30 }}>

                    <Text style={styles.titleTxt}>{item.title}</Text>

                    <Text style={styles.bodyTxt}>{item.body}</Text>

                    <Text style={styles.dateTime}>{moment(item.date).format('DD/MM/YYYY LT')}</Text>

                </View>
            </View>
        </TouchableOpacity>
    )
    render() {
        const { data, refreshing } = this.state
        return (
            <View style={styles.container}>
                <HeaderDetail title={`${I18n.t('Notification')}`}
                    isShowBack
                    onPressBack={() => {
                        this.props.navigation.goBack()
                        this.props.getListNotifyAction()
                    }}
                />
                <LoadingView visible={this.props.loading} />
                <Snackbar
                    color={this.state.AlertError ? color.green : 'red'}
                    label={this.state.snackBarMessage}
                    size={size.s30}
                    ref={this.snackBar}
                    time={2000}
                />
                <FlatList
                    contentContainerStyle={{ paddingBottom: size.h20 }}
                    onRefresh={() => this.handleRefresh()}
                    refreshing={refreshing}
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this.renderItems}
                    ListEmptyComponent={this.ListEmptyComponent}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCD8ED',
    },

    containerListItem: {
        marginTop: size.s20,
        marginHorizontal: size.s20,

        shadowColor: '#000',
        elevation: 4,
        borderRadius: 10,

        paddingHorizontal: size.s30,
        paddingVertical: size.s20,

    },
    card: {
        flexDirection: 'row',
    },
    image: {
        width: size.h52 * 2, height: size.h52 * 2, alignSelf: "center",
        resizeMode: 'contain',
    },
    titleTxt: {
        fontSize: size.h32,
        fontWeight: 'bold',

    },

    bodyTxt: {
        marginVertical: size.s10, color: '#8C8C8C', fontSize: size.h26,
        fontWeight: 'bold'
    },

    dateTime: {
        color: '#8C8C8C',
        fontSize: size.h28
    },


})
export default NotificationComponent
