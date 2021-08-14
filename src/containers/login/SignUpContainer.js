import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignUpComponent from '../../components/login/SignUpComponent'
import { actSignUpAction } from '../../redux/action/signUpAction'
import { actGetShopNameAction } from '../../redux/action/shopNameAction'

export class SignUpContainer extends Component {
   render() {
      return <SignUpComponent {...this.props} />
   }
}

const mapStateToProps = (state) => {
   return {
      data: state.signUpReducers.data,
      loading: state.signUpReducers.loading,
      error: state.signUpReducers.error,

      dataShopCode: state.shopNameReducers.data,
      loadingShopCode: state.shopNameReducers.loading,
      errorShopCode: state.shopNameReducers.error,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onSignUpAction: (data) => {
         dispatch(actSignUpAction(data))
      },
      onActionGetShopName: (data) => {
         dispatch(actGetShopNameAction(data))
      },
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer)
