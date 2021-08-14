import * as Types from '../action/getListModelNameAction'

const initialState = {
    loading: false,
    data: [],
    error: null,
}
const getListModelNameReducers = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_LIST_MODEL_NAME:
            return Object.assign({}, state, {
                loading: true,
                error: null,
                data: [],
            })
        case Types.GET_LIST_MODEL_NAME_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                data: action.data,
            })

        case Types.GET_LIST_MODEL_NAME_ERROR:
            return Object.assign({}, state, {
                loading: false,
                data: [],
                error: action.error,
            })
        default:
            return state
    }
}

export default getListModelNameReducers
