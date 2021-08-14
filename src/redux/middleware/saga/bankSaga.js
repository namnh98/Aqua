import * as Types from '../../action/bankAction';
import { put, takeEvery } from 'redux-saga/effects';
import { getListBankApi } from '../api/getListBankApi';
import I18n from '../../../settings/i18n'

function* bankSaga() {
    try {
        const response = yield getListBankApi()
        if (response === undefined) {
            yield put({ type: Types.GET_LIST_BANK_ERROR, error: response })
        } else {
            yield put({ type: Types.GET_LIST_BANK_SUCCESS, data: response })
        }
    } catch (error) {
        const err = `${I18n.t('error')}`
        yield put({ type: Types.GET_LIST_BANK_ERROR, error: err })
    }
}
export function* watchBankSaga() {
    yield takeEvery(Types.GET_LIST_BANK, bankSaga)
}
