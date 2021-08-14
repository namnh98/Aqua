import React, { Component } from 'react'
import { connect } from 'react-redux'
import BankComponent from '../../components/login/BankComponent';
import { actGetListBank } from '../../redux/action/bankAction';
import { actSignUpAction } from '../../redux/action/signUpAction';

export class BankContainer extends Component {


    render() {
        return (
            <BankComponent {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.bankReducers.data,
        loading: state.bankReducers.loading,
        error: state.bankReducers.error,

        dataSignUp: state.signUpReducers.data,
        loadingSignUp: state.signUpReducers.loading,
        errorSignUp: state.signUpReducers.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetBankAction: () => {
            dispatch(actGetListBank())
        },
        onSignUpAction: (data) => {
            dispatch(actSignUpAction(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankContainer)
