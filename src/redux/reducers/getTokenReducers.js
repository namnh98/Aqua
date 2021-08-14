
import * as Types from '../action/getTokenAction';
const initialState = {
    loading: false,
    data: null,
    error: null
}
const getTokenReducers = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_TOKEN:
            return Object.assign({}, state, {
                loading: true,
                data: null,
                error: null
            })

        case Types.GET_TOKEN_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                data: action.data
            })

        case Types.GET_TOKEN_ERROR:
            return Object.assign({}, state, {
                loading: false,
                data: null,
                error: action.data
            })
        default:
            return state
    }
}
export default getTokenReducers;