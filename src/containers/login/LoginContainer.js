import React, { Component } from 'react';
import LoginComponent from '../../components/login/LoginComponent';
import { connect } from 'react-redux';
import { actLoginAction } from '../../redux/action/loginAction';
import { getTokenAction } from '../../redux/action/getTokenAction';
class LoginContainer extends Component {
    render() {
        return <LoginComponent {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.loginReducers.error,
        loading: state.loginReducers.loading,
        data: state.loginReducers.data,

        errorToken: state.getTokenReducers.error,
        loadingToken: state.getTokenReducers.loading,
        dataToken: state.getTokenReducers.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (data) => {
            dispatch(actLoginAction(data));
        },
        getTokenAction: (data) => {
            dispatch(getTokenAction(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
