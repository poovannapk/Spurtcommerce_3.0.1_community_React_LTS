/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import ProductDetailFullwidth from '../../components/elements/detail/ProductDetailFullwidth';
import ProductWidgets from '../../components/partials/product/ProductWidgets';
import NavigationList from '../../components/shared/navigation/NavigationList';
import BreadCrumb from '../../components/elements/BreadCrumb';
import HeaderMobileProduct from '../../components/shared/header-mobile/HeaderMobileProduct';
import { getProductsById, getProductByLoading } from '../../store/product/action';
import HeaderProduct from '../../components/shared/headers/HeaderProduct';
import { getCollections } from '../../store/collection/action';
import { getProductDetApi } from '../../api';
import { imageUrl } from '../../api/url';
import { useState } from 'react';
import {homeBannerApi} from '../../api';
import ThemeChanger from '../../components/elements/color/themeControl';
import useNetwork from '../../components/reusable/NetworkCheck';

const ProductDefaultPage=({query})=>{
    const [ratingInfo,setRatingInfo]=useState()
    const [banner,setBanner]=useState()
    const [relatedProduct,setRelatedProduct]=useState([])
    const [showModal,setShowModal]=useState(false)
    const [showPriceModal,setShowPriceModal]=useState(false)
    const [priceChartInfo,setPriceChartInfo]=useState([])
    const [questionInfo,setQuestionInfo]=useState([])
    const dispatch=useDispatch()
    let productDetail=useSelector(s=>s.product)
    let productLoadInitiate=useSelector(s=>s.product.productLoading)
    const network=useNetwork()
    let serveUdweu=process.env.NEXT_PUBLIC_SERVER_URL

    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])
 
    useEffect(()=> {
        dispatch(getProductByLoading(true))
        const  pid  = query.pid;
        if (pid===undefined) {
            Router.push('/page/page-404');
        }

        if (query) {
            const collectionsParams = [
                'customer_bought',
                'shop-recommend-items',
                'widget_same_brand',
            ];
            getProductDetApi(query.pid,dispatch,setPriceChartInfo,setQuestionInfo)
             dispatch(getProductsById(pid));
             dispatch(getCollections(collectionsParams));
             homeBannerApi(setBanner)
        }   
        Router.events.on('routeChangeStart', (url) => {
            const nextPid = url.split('/').pop();
            if (nextPid !== '' && isNaN(parseInt(nextPid)) === false) {
                dispatch(getProductByLoading(true))
                getProductDetApi(nextPid,dispatch,setPriceChartInfo,setQuestionInfo)
                dispatch(getProductsById(nextPid));
                homeBannerApi(setBanner)
            }
        });
    },[query.pid])

        const singleProduct  = useSelector(s=>s.product.singleProduct);
        const breadCrumb = [
            {
                text: 'Home',
                url: '/',
            },
            { 
                text: 'Shop',
                url: '/shop',
            },
            {
                text: singleProduct && singleProduct.name,
            },
        ];

        return (
            <div className="layout--product">
                {singleProduct ? (
                    <HeaderProduct productData={singleProduct} productSlug={query.pid} productImage={imageUrl+"?path="+singleProduct.containerName+"&name="+singleProduct.image}/>
                ) : (
                    ''
                )}
                <HeaderMobileProduct />
                <NavigationList />
                <ThemeChanger/>

                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                {productDetail.productLoading===false?<div className="ps-page--product"> 
                    <div className="ps-container"> 
                        <div className="ps-page__container">
                            <div className="ps-page__left">
                                <ProductDetailFullwidth ratingInfo={ratingInfo}  setShowModal={setShowModal} setShowPriceModal={setShowPriceModal} questionInfo={questionInfo}/>
                            </div>
                            <div className="ps-page__right">
                                <ProductWidgets collectionSlug="widget_same_brand" banner={banner}/>
                            </div>
                        </div> 
                    </div>
                        </div>:
                        <div className="ps-page--product">
                            <div className="ps-container">
                            <center><img src="/static/img/spurtloader.gif" width="100px"/></center> 
                            </div>

                        </div>  }
                <FooterDefault />
            </div>
        );
    // }
}

export default ProductDefaultPage;

ProductDefaultPage.getInitialProps=async(ctx)=>({
    query:ctx.query
})



