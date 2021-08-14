import React, { Component } from 'react'
import HistoryComponent from '../../components/history/HistoryComponent'
import { connect } from 'react-redux'
import { getHistoryAction } from '../../redux/action/historyAction'
import { getListNotifyAction } from '../../redux/action/getListNotifyAction'
class HistoryContainer extends Component {
   render() {
      return <HistoryComponent {...this.props} />
   }
}
const mapStateToProps = (state) => {
   return {
      data: state.historyReducers.data,
      loading: state.historyReducers.loading,
      error: state.historyReducers.error,

      dataNotify: state.getListNotifyReducers.data,
      loadingNotify: state.getListNotifyReducers.loading,
      errorNotify: state.getListNotifyReducers.error,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onGetHistoryAction: (data) => {
         dispatch(getHistoryAction(data))
      },
      getListNotifyAction: () => {
         dispatch(getListNotifyAction())
      },
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer)
