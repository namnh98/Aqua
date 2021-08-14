import * as Types from '../../action/getListModelNameAction'
import { put, takeEvery } from 'redux-saga/effects'
import { getListModelNameApi } from '../api/getListModelNameApi'
import I18n from '../../../settings/i18n'

function* listModelNameSaga() {
    try {
        const response = yield getListModelNameApi()
        if (response === undefined) {
            console.log(response)
            yield put({ type: Types.GET_LIST_MODEL_NAME_ERROR, error: response })
        } else {
            yield put({ type: Types.GET_LIST_MODEL_NAME_SUCCESS, data: response })
        }
    } catch (error) {
        const err = `${I18n.t('error')}`
        yield put({ type: Types.GET_LIST_MODEL_NAME_ERROR, error: err })
    }
}
export function* watchListModelNameSaga() {
    yield takeEvery(Types.GET_LIST_MODEL_NAME, listModelNameSaga)
}