import { combineReducers } from 'redux'
import { userReducers, updateUserReducers } from './userReducers'
import historyReducers from './historyReducers'
import bankReducers from './bankReducers'
import loginReducers from './loginReducers'
import signUpReducers from './signUpReducers'
import shopNameReducers from './shopNameReducers'
import serialnumberReducers from './serialnumberReducers'
import { sellOutReducers, sellOutDetailReducers, sellOutUpdateReducers } from './sellOutReducers'
import changePassReducers from './changePassReducers'
import getTokenReducers from './getTokenReducers'
import getListNotifyReducers from './getListNotifyReducers'
import checkNotifyReducers from './checkNotifyReducers'
import paramsReducers from './paramsReducers'
import getListModelNameReducers from './getListModelNameReducers'
import langReducers from './langReducers'
const allReducers = combineReducers({
    userReducers,
    updateUserReducers,
    historyReducers,
    bankReducers,
    loginReducers,
    signUpReducers,
    shopNameReducers,
    serialnumberReducers,
    sellOutReducers,
    changePassReducers,
    getTokenReducers,
    sellOutDetailReducers,
    getListNotifyReducers,
    checkNotifyReducers,
    paramsReducers,
    sellOutUpdateReducers,
    getListModelNameReducers,
    langReducers
})

export default allReducers
