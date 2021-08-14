import React, { Component } from 'react'
import NotificationComponent from '../../components/notification/NotificationComponent'
import { connect } from 'react-redux'
import { getListNotifyAction, checkNotifyAction } from '../../redux/action/getListNotifyAction'
class NotificationContainer extends Component {
    render() {
        return <NotificationComponent {...this.props} />
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.getListNotifyReducers.data,
        loading: state.getListNotifyReducers.loading,
        error: state.getListNotifyReducers.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListNotifyAction: () => {
            dispatch(getListNotifyAction())
        },

        checkNotifyAction: (data) => {
            dispatch(checkNotifyAction(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer)
