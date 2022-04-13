/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { combineReducers } from 'redux';
import product from './product/reducer';
import setting from './setting/reducer';
import cart from './cart/reducer';
import auth from './auth/reducer';
import wishlist from './wishlist/reducer';
import collection from './collection/reducer';
import palette from './colorPalette/reducer';

export default combineReducers({
    auth,
    product,
    setting,
    cart,
    wishlist,
    collection,
    palette
});
