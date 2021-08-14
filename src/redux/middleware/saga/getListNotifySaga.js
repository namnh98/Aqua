import * as Types from '../../action/getListNotifyAction';
import { getListNotifyApi, checkNotifyApi } from '../api/getListNotifyApi';
import { takeEvery, put } from "redux-saga/effects";
import I18n from '../../../settings/i18n'

function* getListNotifySaga(action) {
    try {
        const response = yield getListNotifyApi();
        if (response === undefined) {
            yield put({ type: Types.GET_LIST_NOTIFY_ERROR, error: response });
        } else {
            yield put({ type: Types.GET_LIST_NOTIFY_SUCCESS, data: response });
        }
    } catch (er) {
        const err = `${I18n.t('error')}`
        yield put({ type: Types.GET_LIST_NOTIFY_ERROR, error: err });
    }
}
export function* watchGetListNotifySaga() {
    yield takeEvery(Types.GET_LIST_NOTIFY, getListNotifySaga);
}

function* checkNotifySaga(action) {
    try {
        const response = yield checkNotifyApi(action.data);
        if (response === undefined) {
            yield put({ type: Types.CHECK_NOTIFY_ERROR });
        } else {
            yield put({ type: Types.CHECK_NOTIFY_SUCCESS, data: response });
        }
    } catch (er) {
        const err = `${I18n.t('error')}`
        yield put({ type: Types.CHECK_NOTIFY_ERROR, error: err });
    }
}
export function* watchCheckNotifySaga() {
    yield takeEvery(Types.CHECK_NOTIFY, checkNotifySaga);
}
