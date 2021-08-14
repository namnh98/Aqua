import * as Types from '../../action/selloutAction'
import { put, takeEvery } from 'redux-saga/effects'
import { createSO, DetailSO, updateSO } from '../api/sellOutApi'
import I18n from '../../../settings/i18n'

/// create seo
function* sellOutSaga(action) {
   try {
      const response = yield createSO(action.data)
      if (response === undefined) {
         yield put({ type: Types.CREATE_SELL_OUT_ERROR, error: response })
      } else {
         yield put({ type: Types.CREATE_SELL_OUT_SUCCEES, data: response })
      }
   } catch (error) {
      const err = `${I18n.t('error')}`
      yield put({ type: Types.CREATE_SELL_OUT_ERROR, error: err })
   }
}
export function* watchSellOutSaga() {
   yield takeEvery(Types.CREATE_SELL_OUT, sellOutSaga)
}

/// detail seo
function* sellOutDetailSaga(action) {
   try {
      const response = yield DetailSO(action.data)
      if (response === undefined) {
         yield put({ type: Types.SELL_OUT_DETAIL_ERROR, error: response })
      } else {
         yield put({ type: Types.SELL_OUT_DETAIL_SUCCEES, data: response })
      }
   } catch (error) {
      const err = `${I18n.t('error')}`
      yield put({ type: Types.SELL_OUT_DETAIL_ERROR, error: err })
   }
}
export function* watchSellOutDetailSaga() {
   yield takeEvery(Types.SELL_OUT_DETAIL, sellOutDetailSaga)
}

/// update seo
function* sellOutUpdatelSaga(action) {
   try {
      const response = yield updateSO(action.data)
      if (response === undefined) {
         yield put({ type: Types.SELL_OUT_UPDATE_ERROR, error: response })
      } else {

         yield put({ type: Types.SELL_OUT_UPDATE_SUCCEES, data: response })
      }
   } catch (error) {
      const err = `${I18n.t('error')}`
      yield put({ type: Types.SELL_OUT_UPDATE_ERROR, error: err })
   }
}
export function* watchSellOutUpdateSaga() {
   yield takeEvery(Types.SELL_OUT_UPDATE, sellOutUpdatelSaga)
}















