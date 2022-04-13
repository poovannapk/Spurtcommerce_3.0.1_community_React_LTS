/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { actionTypes } from './action';

export const palette = {
    showContent:"color-show",
    currentColor:""
}

function reducer(state = palette, action) {
    switch (action.type) {
        case actionTypes.COLOR_SHOW:
            return {
                ...state,
                ...{ showContent: action.payload },
            };
        case actionTypes.COLOR_THEME:
            return {
                ...state,
                ...{ currentColor: action.payload },
            };
        default:
            return state;
        }
    }
export default reducer;
