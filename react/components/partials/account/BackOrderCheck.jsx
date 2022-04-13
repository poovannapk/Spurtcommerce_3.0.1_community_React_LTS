/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { useState, useEffect } from 'react';
import  Router  from 'next/router';
import { useSelector } from 'react-redux';
import { colorThemeShow } from '../../helper/colorTheme';

const CheckBackOrder=({orderId})=>{
    let currentColor=useSelector(s=>s.palette.currentColor)

    

    const handleRoute=()=>{
        Router.push("/shop")
    }

    return(
        <div className="ps-order-tracking">
            <div className="container">
            <div className="ps-section__header">

                {/* <div className="cart-check-image"> */}
                    <img src="/static/img/tick.jpg" style={{width:"200px"}}/>
                    <h3>Congratulation! Your order <span style={{color:"rgb(252, 184, 0)"}}>{orderId}</span> has been placed</h3>

                {/* </div> */}
                <div className="form-group">
                        <button className={`ps-btn ${currentColor}`} onClick={e=>handleRoute()}>Return To Shop</button>
                    </div>          
                      </div>

            </div>
        </div>


    )
}

export default CheckBackOrder;
