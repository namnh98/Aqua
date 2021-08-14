import * as Types from '../../action/shopNameAction'
import { put, takeEvery } from 'redux-saga/effects'
import { getShopNameApi } from '../api/shopNameApi'
import I18n from '../../../settings/i18n'

function* shopNameSaga(action) {
   try {
      const response = yield getShopNameApi(action.data)
      if (response === undefined) {
         console.log(response)
         yield put({ type: Types.GET_SHOP_NAME_ERROR, error: response })
      } else {
         yield put({ type: Types.GET_SHOP_NAME_SUCCESS, data: response })
      }
   } catch (error) {
      const err = `${I18n.t('error')}`
      yield put({ type: Types.GET_SHOP_NAME_ERROR, error: err })
   }
}
export function* watchShopNameSaga() {
   yield takeEvery(Types.GET_SHOP_NAME, shopNameSaga)
}
