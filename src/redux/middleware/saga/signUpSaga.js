import *as Types from '../../action/signUpAction';
import { takeEvery, put } from 'redux-saga/effects';
import { SignUpApi } from '../api/signUpApi';
import I18n from '../../../settings/i18n'

function* signUpSaga(action) {
    try {
        const response = yield SignUpApi(action.data);
        if (response === undefined) {
            yield put({ type: Types.SIGN_UP_ERROR, error: response })
        } else {
            yield put({ type: Types.SIGN_UP_SUCCESS, data: response })
        }
    } catch (error) {
        const err = `${I18n.t('error')}`
        yield put({ type: Types.SIGN_UP_ERROR, error: err })
    }
}
export function* watchSignUpSaga() {
    yield takeEvery(Types.SIGN_UP, signUpSaga);
}