import * as Types from '../../action/passwordAction'
import { takeEvery, put } from 'redux-saga/effects'
import { changePasswordApi } from '../api/changepasswordApi'
import I18n from '../../../settings/i18n'

function* changePasswordSaga(action) {
   try {
      const response = yield changePasswordApi(action.data)
      if (response === undefined) {
         yield put({ type: Types.CHANGE_PASSWORD_ERROR, error: response })
      } else {
         yield put({ type: Types.CHANGE_PASSWORD_SUCCESS, data: response })
      }
   } catch (error) {
      const err = `${I18n.t('error')}`
      yield put({ type: Types.CHANGE_PASSWORD_ERROR, error: err })
   }
}

export function* watchPassWordSaga() {
   yield takeEvery(Types.CHANGE_PASSWORD, changePasswordSaga)
}
