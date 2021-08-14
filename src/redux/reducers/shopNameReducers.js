import * as Types from '../action/shopNameAction'

const initialState = {
   loading: false,
   data: [],
   error: null,
}
const shopNameReducers = (state = initialState, action) => {
   // console.log(action)
   switch (action.type) {
      case Types.GET_SHOP_NAME:
         return Object.assign({}, state, {
            loading: true,
            error: null,
            data: null,
         })
      case Types.GET_SHOP_NAME_SUCCESS:
         return Object.assign({}, state, {
            loading: false,
            error: null,
            data: action.data,
         })

      case Types.GET_SHOP_NAME_ERROR:
         return Object.assign({}, state, {
            loading: false,
            data: null,
            error: action.error,
         })
      default:
         return state
   }
}

export default shopNameReducers
