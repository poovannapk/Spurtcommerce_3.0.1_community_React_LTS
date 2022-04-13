/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { all } from 'redux-saga/effects';
import ProductSaga from './product/saga';
import SettingSaga from './setting/saga';
import CartSaga from './cart/saga';
import AuthSaga from './auth/saga';
import WishlistSaga from './wishlist/saga';
import CollectionSaga from './collection/saga';

export default function* rootSaga() {
    yield all([
        ProductSaga(),
        SettingSaga(),
        CartSaga(),
        AuthSaga(),
        WishlistSaga(),
        CollectionSaga(),
    ]);
}
