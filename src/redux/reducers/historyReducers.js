import *as Types from '../action/historyAction';

const initialState = {
    loading: false,
    data: [],
    error: null
}
const historyReducers = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case Types.GET_HISTORY:
            return Object.assign({}, state, {
                loading: true,
                error: null,
                data: null
            })
        case Types.GET_HISTORY_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                data: action.data
            })

        case Types.GET_HISTORY_ERROR:
            return Object.assign({}, state, {
                loading: false,
                data: null,
                error: action.error
            })
        default:
            return state
    }
}

export default historyReducers;