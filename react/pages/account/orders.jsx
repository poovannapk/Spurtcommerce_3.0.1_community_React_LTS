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
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../components/elements/BreadCrumb';
import NavigationList from '../../components/shared/navigation/NavigationList';
import MyOrder from '../../components/partials/account/MyOrder';
import ThemeChanger from '../../components/elements/color/themeControl';
import useNetwork from '../../components/reusable/NetworkCheck';
import  Router  from 'next/router';

const MyAccountPage = () => {
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
            text: 'order',
        },
    ];
    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <MyOrder/>
            </div>
            <FooterDefault />
        </div>
    );
};

export default MyAccountPage;