
import * as Types from '../action/getListNotifyAction';
const initialState = {
    loading: false,
    data: null,
    error: null,
}
const getListNotifyReducers = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_LIST_NOTIFY:
            return Object.assign({}, state, {
                loading: true,
                data: null,
                error: null
            })

        case Types.GET_LIST_NOTIFY_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                data: action.data,
            })

        case Types.GET_LIST_NOTIFY_ERROR:
            return Object.assign({}, state, {
                loading: false,
                data: null,
                error: action.error
            })
        default:
            return state
    }
}
export default getListNotifyReducers;