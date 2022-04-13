/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
};

export function login() {
    return { type: actionTypes.LOGIN_REQUEST};
}

export function loginSuccess() {
    return { type: actionTypes.LOGIN_SUCCESS };
}

export function logOut() {
    return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
    return { type: actionTypes.LOGOUT_SUCCESS };
}
