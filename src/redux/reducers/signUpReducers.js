
import * as Types from '../action/signUpAction';
const initialState = {
    loading: false,
    data: null,
    error: null
}
const signUpReducers = (state = initialState, action) => {
    switch (action.type) {
        case Types.SIGN_UP:
            return Object.assign({}, state, {
                loading: true,
                data: null,
                error: null
            })

        case Types.SIGN_UP_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                data: action.data
            })

        case Types.SIGN_UP_ERROR:
            return Object.assign({}, state, {
                loading: false,
                data: null,
                error: action.data
            })
        default:
            return state;
    }
}
export default signUpReducers;