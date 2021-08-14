import * as Types from '../../action/serialNumberAction'
import { put, takeEvery } from 'redux-saga/effects'
import { getSerialNumberApi } from '../api/serialnumberApi'
import I18n from '../../../settings/i18n'

function* serialnumberSaga(action) {
   try {
      const response = yield getSerialNumberApi(action.data)
      if (response === undefined) {
         yield put({ type: Types.GET_GET_SERIAL_NUMBER_ERROR, error: response })
      } else {
         yield put({ type: Types.GET_GET_SERIAL_NUMBER_SUCCESS, data: response })
      }
   } catch (error) {
      const err = `${I18n.t('error')}`
      yield put({ type: Types.GET_GET_SERIAL_NUMBER_ERROR, error: err })
   }
}
export function* watchSerialnumberSaga() {
   yield takeEvery(Types.GET_SERIAL_NUMBER, serialnumberSaga)
}
