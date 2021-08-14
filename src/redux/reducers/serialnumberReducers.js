import * as Types from '../action/serialNumberAction'

const initialState = {
   loading: false,
   data: [],
   error: null,
}
const serialnumberReducers = (state = initialState, action) => {
   // console.log(action)
   switch (action.type) {
      case Types.GET_SERIAL_NUMBER:
         return Object.assign({}, state, {
            loading: true,
            error: null,
            data: null,
         })
      case Types.GET_GET_SERIAL_NUMBER_SUCCESS:
         return Object.assign({}, state, {
            loading: false,
            error: null,
            data: action.data,
         })

      case Types.GET_GET_SERIAL_NUMBER_ERROR:
         return Object.assign({}, state, {
            loading: false,
            data: null,
            error: action.error,
         })
      default:
         return state
   }
}

export default serialnumberReducers
