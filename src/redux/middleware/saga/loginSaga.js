import * as Types from '../../action/loginAction';
import { loginApi } from '../api/loginApi';
import { takeEvery, put } from "redux-saga/effects";
import I18n from '../../../settings/i18n'

function* loginSaga(action) {
    try {
        const response = yield loginApi(action.data);

        if (response === undefined) {
            console.log(response, 'saga');
            yield put({ type: Types.LOGIN_ERROR, error: response });
        } else {

            yield put({ type: Types.LOGIN_SUCCESS, data: response });

        }
    } catch (error) {
        const err = `${I18n.t('error')}`
        yield put({ type: Types.LOGIN_ERROR, error: err });
    }
}
export function* watchLoginSaga() {
    yield takeEvery(Types.LOGIN, loginSaga);
}
