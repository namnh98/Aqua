import React, { Component } from 'react'
import ScanBarcodeScreen from '../../components/registration/ScanBarcodeScreen'
import { connect } from 'react-redux'
import { actGetSerialNumberAction } from '../../redux/action/serialNumberAction'

class RegsitrationContainer extends Component {
   render() {
      return <ScanBarcodeScreen {...this.props} />
   }
}
const mapStateToProps = (state) => {
   return {
      data: state.serialnumberReducers.data,
      loading: state.serialnumberReducers.loading,
      error: state.serialnumberReducers.error,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onActionGetSerial: (data) => {
         dispatch(actGetSerialNumberAction(data))
      },
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegsitrationContainer)
