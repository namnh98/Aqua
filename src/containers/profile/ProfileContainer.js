import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProfileComponent from '../../components/profile/ProfileComponent'
import { actUpdateUser, actUserAction } from '../../redux/action/userAction'
import { actGetShopNameAction } from '../../redux/action/shopNameAction'
import { actChangePasswordAction } from '../../redux/action/passwordAction'
import { actGetListBank } from '../../redux/action/bankAction'
import { getTokenAction } from '../../redux/action/getTokenAction';
import { actParamClearAction } from '../../redux/action/paramAction'
import { actSetLanguageAction } from '../../redux/action/changeLangAction'
export class ProfileContainer extends Component {
   render() {
      return <ProfileComponent {...this.props} />
   }
}

const mapStateToProps = (state) => {
   console.log(state.langReducers, 'language state')
   return {
      data: state.userReducers.data,
      loading: state.userReducers.loading,
      error: state.userReducers.error,

      dataUpdate: state.updateUserReducers.data,
      loadingUpdate: state.updateUserReducers.loading,
      errorUpdate: state.updateUserReducers.error,

      dataShopCode: state.shopNameReducers.data,
      loadingShopCode: state.shopNameReducers.loading,
      errorShopCode: state.shopNameReducers.error,

      dataChangePassword: state.changePassReducers.data,
      loadingChangePassword: state.changePassReducers.loading,
      errorChangePassword: state.changePassReducers.error,

      dataBank: state.bankReducers.data,
      loadingBank: state.bankReducers.loading,
      errorbank: state.bankReducers.error,

      errorToken: state.getTokenReducers.error,
      loadingToken: state.getTokenReducers.loading,
      dataToken: state.getTokenReducers.data,

      lang: state.langReducers.lang,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onGetUserAction: () => {
         dispatch(actUserAction())
      },
      onUpdateUserAction: (data) => {
         dispatch(actUpdateUser(data))
      },
      onActionGetShopName: (data) => {
         dispatch(actGetShopNameAction(data))
      },
      onChangePassword: (data) => {
         dispatch(actChangePasswordAction(data))
      },
      onGetBankAction: () => {
         dispatch(actGetListBank())
      },

      getTokenAction: (data) => {
         dispatch(getTokenAction(data));
      },
      onClearAction: () => {
         dispatch(actParamClearAction());
      },
      onChangeLanguage: (data) => {
         dispatch(actSetLanguageAction(data))
      }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
