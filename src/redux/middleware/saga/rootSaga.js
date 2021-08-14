import { all } from 'redux-saga/effects'
import { watchUserSaga, watchUpdateUserSaga } from './userSaga'
import { watchHistorySaga } from './historySaga'
import { watchBankSaga } from './bankSaga'
import { watchLoginSaga } from './loginSaga'
import { watchSignUpSaga } from './signUpSaga'
import { watchShopNameSaga } from './shopNameSaga'
import { watchSerialnumberSaga } from './serialnumberSaga'
import { watchSellOutSaga, watchSellOutDetailSaga, watchSellOutUpdateSaga } from './sellOutSaga'
import { watchPassWordSaga } from './passwordSaga'
import { watchGetTokenSaga } from './getTokenSaga'
import { watchGetListNotifySaga, watchCheckNotifySaga } from './getListNotifySaga'
import { watchListModelNameSaga } from './getListModelNameSaga'
export default function* rootSaga() {
    yield all([
        watchUserSaga(),
        watchHistorySaga(),
        watchBankSaga(),
        watchLoginSaga(),
        watchSignUpSaga(),
        watchUpdateUserSaga(),
        watchShopNameSaga(),
        watchSerialnumberSaga(),
        watchSellOutSaga(),
        watchPassWordSaga(),
        watchGetTokenSaga(),
        watchSellOutDetailSaga(),
        watchGetListNotifySaga(),
        watchCheckNotifySaga(),
        watchSellOutUpdateSaga(),
        watchListModelNameSaga(),
    ])

}
