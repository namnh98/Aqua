import * as Types from '../action/paramAction'

const initialState = {
    customer_name: '',
    customer_phone: '',
    evidence: [
        {
            category: 'red_voice',
            url: '',
            image_name: null,
            quality: null,
            type: null

        },
        {
            category: 'serial_number',
            url: '',
            image_name: null,
            quality: null,
            type: null
        },
        {
            category: 'product',
            url: '',
            image_name: null,
            quality: null,
            type: null
        },
    ],
    model_name: '',
    sell_out_date: '',
    serial_number: '',
    date: '',
    activity: '',
    id: '',
    note: '',
    editable: true
}
const paramsReducers = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_DATA:
            return {
                ...state,
                ...action.data,
            }
        case Types.SET_URL:
            return {
                ...state,
                evidence: state.evidence.map((el) => {
                    if (el.category === action.data.category) {
                        el.url = action.data.url
                    }
                    return el
                }),
            }
        case Types.UPDATE_IMAGE:
            return {
                ...state,
                evidence: state.evidence.map((evd, index) => {
                    if (index == action.data.index) {
                        evd = action.data.image_data
                    }
                    return evd
                }),
            }
        case Types.CLEAR_STATE:
            return initialState
        default:
            return state
    }
}
export default paramsReducers