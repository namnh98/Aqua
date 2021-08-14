import * as Types from '../action/passwordAction'
const initialState = {
   loading: false,
   data: null,
   error: null,
}
const changePassReducers = (state = initialState, action) => {
   switch (action.type) {
      case Types.CHANGE_PASSWORD:
         return Object.assign({}, state, {
            loading: true,
            data: null,
            error: null,
         })

      case Types.CHANGE_PASSWORD_SUCCESS:
         return Object.assign({}, state, {
            loading: false,
            error: null,
            data: action.data,
         })

      case Types.CHANGE_PASSWORD_ERROR:
         return Object.assign({}, state, {
            loading: false,
            data: null,
            error: action.data,
         })
      default:
         return state
   }
}
export default changePassReducers
