/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export function colorThemeShow(){

    let currentTheme=localStorage.getItem("colorThemeSpurt")

    if(currentTheme){
        return currentTheme;
    }
    else{
        return "normal";
    }

}