/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import CheckBackOrder from '../../components/partials/account/BackOrderCheck';
import ThemeChanger from '../../components/elements/color/themeControl';

const CheckoutSuccess=({query})=>{


    return( 
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile /> 
            <NavigationList />
            <ThemeChanger/>
            <div className="ps-page--simple">
                <CheckBackOrder orderId={query.cid}/>
                
            </div>
            <FooterDefault />
        </div>
    )
}

export default CheckoutSuccess;

CheckoutSuccess.getInitialProps=async(ctx)=>({
    query:ctx.query
})

