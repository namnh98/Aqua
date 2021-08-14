import * as Types from '../../action/getTokenAction';
import { getTokenApi } from '../api/getTokenApi';
import { takeEvery, put } from "redux-saga/effects";
import I18n from '../../../settings/i18n'

function* getTokenSaga(action) {
    try {
        const response = yield getTokenApi(action.data);

        if (response === undefined) {
            yield put({ type: Types.GET_TOKEN_ERROR, error: response });
        } else {
            yield put({ type: Types.GET_TOKEN_SUCCESS, data: response });
        }
    } catch (error) {
        const err = `${I18n.t('error')}`
        yield put({ type: Types.GET_TOKEN_ERROR, error: err });
    }
}
export function* watchGetTokenSaga() {
    yield takeEvery(Types.GET_TOKEN, getTokenSaga);
}
