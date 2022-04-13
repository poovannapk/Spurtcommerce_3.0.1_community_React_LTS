/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import LayoutShop from '../../components/partials/shop/LayoutShop';
import BreadCrumb from '../../components/elements/BreadCrumb';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ShopWidget from '../../components/partials/shop/modules/ShopWidget';
import {
    getProducts,
    getProductsByCategory,
} from '../../store/product/action';
import { getCollections } from '../../store/collection/action';
import { useEffect } from 'react';
import { productListApi } from '../../api';
import { useState } from 'react';
import { productCountApi } from '../../api';
import { categoryListApi } from '../../api';
import { ManufacturerApi} from '../../api';
import ThemeChanger from '../../components/elements/color/themeControl';
import useNetwork from '../../components/reusable/NetworkCheck';

function ShopDefaultPage(props){
    const { query } = props;
    const dispatch=useDispatch()
    const [productData,setProductData]=useState([])
    const [offset,setOffset]=useState(0)
    const pro=useSelector(s=>s.product)
    const [initialLoad,setInitialLoad]=useState(true)
    const [count,setCount]=useState("")
    const [categoryInitial,setCategoryInitial]=useState("")
    const [loader,setLoader]=useState(false)
    const [search,setSearch]=useState("")
    const [brands,setBrands]=useState([])
    const [manuId,setManuId]=useState("")
    const [limit,setLimit]=useState(12)
    const [maxPrice,setMaxPrice]=useState(0)
    const [specificCat,setSpecificCat]=useState()

    let orderBy=props.product.orderBy
    let price=props.product.price
    const router=useRouter()
    let reloadKey=router.query.keyword
    let categorySlug=router.query.categoryId
    let brandInitial=router.query.brand
    const network=useNetwork()

    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])

    const productApiCall=()=>{
        
        initialLoad&&setLoader(true)
       initialLoad&&productListApi(dispatch,setProductData,offset,setLoader,props.product.orderBy,props.product.price,search,categoryInitial,manuId,limit)
       initialLoad&&productCountApi(dispatch,setCount,props.product.price,props.product.orderBy,search,categoryInitial,manuId,limit,setMaxPrice,initialLoad)

    }

    useEffect(()=>{
        productApiCall()
    },[offset,orderBy,price,search,categoryInitial,manuId,limit])

    useEffect(()=>{
        ManufacturerApi(dispatch,setBrands)
    },[])

    useEffect(()=>{
        categoryListApi(dispatch)

    },[])

    useEffect(()=>{
        if(reloadKey!==undefined){
            setInitialLoad(true)
            setSearch(reloadKey)
        }
    },[reloadKey])

    useEffect(()=>{
        if(categorySlug!==undefined){
            setInitialLoad(true)
            setCategoryInitial(categorySlug)
        }
    },[categorySlug])

    useEffect(()=>{
        if(brandInitial!==undefined){
            setInitialLoad(true)
            setManuId(brandInitial)
            if(brandInitial!==null){
                console.log(brandInitial)
                if(initialLoad===true){
                    document.getElementById("myCheckbox"+brandInitial).checked = true;
                    console.log("dfuifn fefer fefe rf e")
                }
            }
        }
    },[brandInitial])


    useEffect(()=> {
        if (query) {
            if (query.category) {
                dispatch(getProductsByCategory(query.category));
            } else {
                const params = {
                    _start: 1,
                    _limit: 12,
                };
                dispatch(getProducts(params));
            }
            const collectionsParams = [
                'shop_best_sale_items',
                'shop-recommend-items',
            ];
            dispatch(getCollections(collectionsParams));
        }
    },[])

        const breadCrumb = [
            {
                text: 'Home',
                url: '/',
            },
            {
                text: 'Shop',
            },
        ];
        return (
            <div className="site-content">
                <HeaderDefault />
                <HeaderMobile />
                <NavigationList />
                <ThemeChanger/>
                <div className="ps-page--shop">
                    <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                    <div className="ps-container">
                        <div className="ps-layout--shop">
                            <ShopWidget type={"normal"}  categoryMain={props.product.categories} setInitialLoad={setInitialLoad} brands={brands} manuId={manuId} setManuId={setManuId} maxPrice={maxPrice} setMaxPrice={setMaxPrice} setCategoryInitial={setCategoryInitial} categoryInitial={categorySlug }/>
                            <div className="ps-layout__right">
                                {initialLoad?<LayoutShop data={productData} count={count} setOffset={setOffset} setInitialLoad={setInitialLoad} loader={loader} setLimit={setLimit} limit={limit}/>:<LayoutShop data={[]} count={count} setOffset={setOffset} setInitialLoad={setInitialLoad} loader={loader} setLimit={setLimit} limit={limit}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <FooterDefault />
            </div>
        );
    
}
export default connect(state=>state)(ShopDefaultPage);
