
import * as Types from '../action/loginAction';
const initialState = {
    loading: false,
    data: null,
    error: null
}
const loginReducers = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN:
            return Object.assign({}, state, {
                loading: true,
                data: null,
                error: null
            })

        case Types.LOGIN_SUCCESS:
            console.log(action.data);
            return Object.assign({}, state, {
                loading: false,
                error: null,
                data: action.data
            })

        case Types.LOGIN_ERROR:
            return Object.assign({}, state, {
                loading: false,
                data: null,
                error: action.error
            })
        default:
            return state
    }
}
export default loginReducers;