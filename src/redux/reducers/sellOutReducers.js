import * as Types from '../action/selloutAction'

const initialState = {
   loading: false,
   data: [],
   error: null,
}
const sellOutReducers = (state = initialState, action) => {
   // console.log(action)
   switch (action.type) {
      case Types.CREATE_SELL_OUT:
         return Object.assign({}, state, {
            loading: true,
            error: null,
            data: null,
         })
      case Types.CREATE_SELL_OUT_SUCCEES:
         return Object.assign({}, state, {
            loading: false,
            error: null,
            data: action.data,
         })

      case Types.CREATE_SELL_OUT_ERROR:
         return Object.assign({}, state, {
            loading: false,
            data: null,
            error: action.error,
         })
      default:
         return state
   }
}

const sellOutDetailReducers = (state = initialState, action) => {
   // console.log(action)
   switch (action.type) {
      case Types.SELL_OUT_DETAIL:
         return Object.assign({}, state, {
            loading: true,
            error: null,
            data: null,
         })
      case Types.SELL_OUT_DETAIL_SUCCEES:
         return Object.assign({}, state, {
            loading: false,
            error: null,
            data: action.data,
         })

      case Types.SELL_OUT_DETAIL_ERROR:
         return Object.assign({}, state, {
            loading: false,
            data: null,
            error: action.error,
         })
      default:
         return state
   }
}


const sellOutUpdateReducers = (state = initialState, action) => {

   switch (action.type) {
      case Types.SELL_OUT_UPDATE:
         return Object.assign({}, state, {
            loading: true,
            error: null,
            data: null,
         })
      case Types.SELL_OUT_UPDATE_SUCCEES:
         return Object.assign({}, state, {
            loading: false,
            error: null,
            data: action.data,
         })

      case Types.SELL_OUT_UPDATE_ERROR:
         return Object.assign({}, state, {
            loading: false,
            data: null,
            error: action.error,
         })
      default:
         return state
   }
}


export { sellOutReducers, sellOutDetailReducers, sellOutUpdateReducers }
