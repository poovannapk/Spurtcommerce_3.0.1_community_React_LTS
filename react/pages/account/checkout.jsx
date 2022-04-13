/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { useEffect } from 'react';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import Checkout from '../../components/partials/account/Checkout';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';
import  Router  from 'next/router';
import useNetwork from '../../components/reusable/NetworkCheck';

const OrderTrackingPage = () => {
    const network=useNetwork()

    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])

    

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shopping Cart',
            url: '/account/shopping-cart',
        },
        {
            text: 'Checkout Information',
        },
    ];
    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <Checkout />
            </div>
            <FooterDefault />
        </div>
    );
};

export default OrderTrackingPage;
