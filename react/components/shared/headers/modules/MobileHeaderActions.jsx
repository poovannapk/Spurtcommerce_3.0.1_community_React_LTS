/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { Component } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import AccountQuickLinks from './AccountQuickLinks';
import Link from 'next/link';
import AccountQuickLinksMobile from './AccountQuickLinksMobile';
import { useState } from 'react';
import { useEffect } from 'react';

function MobileHeaderActions({auth,cartTotal}){
    let reloadCart=useSelector(s=>s.cart.addproduct)
    let auths=useSelector(s=>s.auth)
    const [menuDrawer,setMenuDrawer]=useState(false)
    const [cartDrawer,setCartDrawer]=useState(false)
    const [searchDrawer,setSearchDrawer]=useState(false)
    const [categoriesDrawer,setCategoriesDrawer]=useState(false)
    const [cartData,setCartData]=useState([])
    let cartLocal=[]
    const dispatch=useDispatch()



    useEffect(()=>{
        setCartData(JSON.parse(localStorage.getItem("cartItem")))
        cartLocal=JSON.parse(localStorage.getItem("cartItem")) 
        cartGet()

    },[reloadCart])

    const cartGet=()=>{
        console.log(cartLocal&&cartLocal.length)
        if(cartLocal===null||cartLocal.length===0){
            localStorage.getItem("spurtToken")
            // &&cartCountApi(dispatch)
        }
    }
 
    const handleDrawerClose = () => {
        setMenuDrawer(false)
        setCartDrawer(false)
        setSearchDrawer(false)
        setCategoriesDrawer(false)
        
    };

        return (
            <div className="navigation__right">
                {console.log(auths)}
                <Link href="/account/shopping-cart">
                    <a className="header__extra">
                        <i className="icon-bag2"></i>
                        <span>
                            <i>{cartData!==null? cartData&&cartData.length:0}</i>
                        </span>
                    </a>
                </Link>

                {auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? (
                    <AccountQuickLinksMobile />
                ) : (
                    <div className="header__extra">
                        <Link href="/account/login">
                            <i className="icon-user"></i>
                        </Link>
                    </div>
                )}
            </div>
        );
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(MobileHeaderActions);
