import * as Types from '../../action/historyAction'
import { put, takeEvery } from 'redux-saga/effects'

import { getHistoryApi } from '../api/historyApi'
import I18n from '../../../settings/i18n'

function* historySaga(action) {
   try {
      const response = yield getHistoryApi(action.data)
      if (response === undefined) {
         yield put({ type: Types.GET_HISTORY_ERROR, error: response })
      } else {
         yield put({ type: Types.GET_HISTORY_SUCCESS, data: response })
      }
   } catch (error) {
      const err = `${I18n.t('error')}`
      yield put({ type: Types.GET_HISTORY_ERROR, error: err })
   }
}
export function* watchHistorySaga() {
   yield takeEvery(Types.GET_HISTORY, historySaga)
}
