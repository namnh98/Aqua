import *as Types from '../action/bankAction';

const initialState = {
    loading: false,
    data: [],
    error: null
}
const bankReducers = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case Types.GET_LIST_BANK:
            return Object.assign({}, state, {
                loading: true,
                error: null,
                data: null
            })
        case Types.GET_LIST_BANK_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                data: action.data
            })

        case Types.GET_LIST_BANK_ERROR:
            return Object.assign({}, state, {
                loading: false,
                data: null,
                error: action.error
            })
        default:
            return state
    }
}

export default bankReducers;