/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { actionTypes } from './action';

export const initState = {
    isLoggedIn: false,
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...{ isLoggedIn: true },
            };
            case actionTypes.LOGIN_REQUEST:
                return {
                    ...state,
                    ...{ isLoggedIn: true },
                };
        case actionTypes.LOGOUT:
            return {
                ...state,
                ...{ isLoggedIn: false },
            };
        default:
            return state;
    }
}

export default reducer;
