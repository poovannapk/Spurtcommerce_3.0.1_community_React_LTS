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

const NextArrow = props => {
    const { className, onClick, icon } = props;
    let currentColor=useSelector(s=>s.palette.currentColor)

    


    return (
        <button
            className={`slick-arrow slick-next ${className} ${currentColor}`}
            style={{marginRight:"2px"}}
            onClick={onClick}>
            {icon ? (
                <i className={icon}></i>
            ) : (
                <i className="icon-chevron-right"></i>
            )}
        </button>
    );
};

export default NextArrow;
