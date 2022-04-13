/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import moment from 'moment'

export default function DateRev({dateCarry}){
    let date = moment(dateCarry).format('DD MMM, YYYY  HH:mmA');
    return(
    <p>{date!=="Invalid date"?date:""}</p>
    )
}