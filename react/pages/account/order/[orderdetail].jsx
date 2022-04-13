/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import FooterDefault from '../../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../../components/elements/BreadCrumb';
import NavigationList from '../../../components/shared/navigation/NavigationList';
import OrderDetailFunc from '../../../components/partials/account/OrderDetail'
import { useEffect } from 'react';
import { useState } from 'react';
import { orderDetailApi } from '../../../api';
import useNetwork from '../../../components/reusable/NetworkCheck';
import  Router  from 'next/router';
import ThemeChanger from '../../../components/elements/color/themeControl';

const MyOrderDetail = ({query}) => {
    const [orderDetailInfo,setOrderDetailInfo]=useState("")
    const [orderLoading,setOrderLoading]=useState(true)
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
            text: 'Account',
        },
        {
            text:'Order Details'
        },
        {
            text:orderDetailInfo&&orderDetailInfo.orderProductPrefixId
        }
    ];

    useEffect(()=>{
        const orderProductId=query.orderdetail
        if (orderProductId===undefined) {
            Router.push('/page/page-404');
        }
        if (query) {
            orderDetailApi(orderProductId,setOrderDetailInfo,setOrderLoading) 
        }
    },[])


    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <OrderDetailFunc orderDetailInfo={orderDetailInfo} orderLoading={orderLoading}/>
            </div>
            <FooterDefault />
        </div>
    );
};

export default MyOrderDetail;

MyOrderDetail.getInitialProps=async(ctx)=>({
    query:ctx.query
})
