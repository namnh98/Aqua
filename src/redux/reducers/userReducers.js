import *as Types from '../action/userAction';

const initialState = {
    loading: false,
    data: [],
    error: null
}
const userReducers = (state = initialState, action) => {

    switch (action.type) {
        case Types.GET_USER:
            return Object.assign({}, state, {
                loading: true,
                error: null,
                data: null
            })
        case Types.GET_USER_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                data: action.data
            })

        case Types.GET_USER_ERROR:
            return Object.assign({}, state, {
                loading: false,
                data: null,
                error: action.error
            })
        default:
            return state
    }
}

const updateUserReducers = (state = initialState, action) => {

    switch (action.type) {
        case Types.UPDATE_USER:
            return Object.assign({}, state, {
                loading: true,
                error: null,
                data: null
            })
        case Types.UPDATE_USER_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                data: action.data
            })

        case Types.UPDATE_USER_ERROR:
            return Object.assign({}, state, {
                loading: false,
                data: null,
                error: action.error
            })
        default:
            return state
    }
}


export { userReducers, updateUserReducers };