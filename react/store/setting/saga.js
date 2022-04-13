/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { all, put, takeEvery } from 'redux-saga/effects';

import { actionTypes, changeCurrencySuccess } from './action';

function* changeCurrencySaga({ currency }) {
    try {
        yield put(changeCurrencySuccess(currency));
    } catch (err) {
        console.error(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.CHANGE_CURRENCY, changeCurrencySaga)]);
}
