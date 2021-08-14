import * as Types from "../../action/userAction";
import { put, takeEvery } from "redux-saga/effects";

import { getUserApi, updateUserApi } from "../api/userApi";

import I18n from '../../../settings/i18n'

function* userSaga() {
    try {
        const response = yield getUserApi();

        if (response === undefined) {
            yield put({ type: Types.GET_USER_ERROR, error: response });
        } else {
            yield put({ type: Types.GET_USER_SUCCESS, data: response });
        }
    } catch (error) {
        const err = `${I18n.t('error')}`
        yield put({ type: Types.GET_USER_ERROR, error: err });
    }
}

export function* watchUserSaga() {
    yield takeEvery(Types.GET_USER, userSaga);
}

function* updateUserSaga(action) {
    try {
        const response = yield updateUserApi(action.data);

        if (response === undefined) {
            yield put({ type: Types.UPDATE_USER_ERROR, error: response });
        } else {
            yield put({ type: Types.UPDATE_USER_SUCCESS, data: response });
        }
    } catch (error) {
        const err = `${I18n.t('error')}`
        yield put({ type: Types.UPDATE_USER_ERROR, error: err });
    }
}

export function* watchUpdateUserSaga() {
    yield takeEvery(Types.UPDATE_USER, updateUserSaga);
}
