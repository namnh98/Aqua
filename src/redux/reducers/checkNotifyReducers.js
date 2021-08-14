
import * as Types from '../action/getListNotifyAction';
const initialState = {
    loading: false,
    data: null,
    error: null,
}
const checkNotifyReducers = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHECK_NOTIFY:
            return Object.assign({}, state, {
                loading: true,
                data: null,
                error: null
            })

        case Types.CHECK_NOTIFY_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                data: action.data,
            })

        case Types.CHECK_NOTIFY_ERROR:
            return Object.assign({}, state, {
                loading: false,
                data: null,
                error: action.error
            })
        default:
            return state
    }
}
export default checkNotifyReducers;