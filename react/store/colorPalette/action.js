/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export const actionTypes = {
   COLOR_SHOW:'COLOR_SHOW',
   COLOR_THEME:'COLOR_THEME'
};

export function colorShowContent(payload){
    return { type: actionTypes.COLOR_SHOW,payload:payload };

}

export function colorThemeCurrent(payload){
    return { type: actionTypes.COLOR_THEME,payload:payload };

}