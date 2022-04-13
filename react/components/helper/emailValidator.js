/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
const EmailValidator= (value)=>{
    if(/^\w([\.-]?\w)*@\w([\.-]?\w)*(\.\w{2,3})+$/.test(value))
        return true
    else 
        return false;
}
export {EmailValidator}
