/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { colorThemeShow } from '../../helper/colorTheme';

const PrevArrow = props => {
    const { className, onClick, icon } = props;

    let currentColor=useSelector(s=>s.palette.currentColor)


    return (
        <button
            className={`slick-arrow slick-prev ${className} ${currentColor}`}
            onClick={onClick}>
            {icon ? (
                <i className={icon}></i>
            ) : (
                <i className="icon-chevron-left"></i>
            )}
        </button>
    );
};

export default PrevArrow;
