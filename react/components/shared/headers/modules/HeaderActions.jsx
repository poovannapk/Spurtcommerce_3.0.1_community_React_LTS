/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import MiniCart from './MiniCart';
import AccountQuickLinks from './AccountQuickLinks';
import { useEffect } from 'react';
import { useState } from 'react';
import { login } from '../../../../store/auth/action';
import { wishListApi } from '../../../../api';
import { addItemToWishlist } from '../../../../store/wishlist/action';

function HeaderActions({auth,compare}){
    const [wishlistData,setWishListApi]=useState([])
    let reloadCart=useSelector(s=>s.wishlist.addwishlist)
 
    const dispatch=useDispatch()
    const wishlist=""
    let TokenAuth=""
    let cartLocal=[]

    const authFunc=()=>{
        if(TokenAuth!==null){
            dispatch(login())
           
        }
    }
    
    const cartGet=()=>{
        console.log(cartLocal&&cartLocal.length)
        if(cartLocal===null||cartLocal.length===0){
            localStorage.getItem("spurtToken")
        }
    }
    

    useEffect(()=>{
        TokenAuth=localStorage.getItem("spurtToken")
        cartLocal=JSON.parse(localStorage.getItem("cartItem")) 
        console.log(TokenAuth)
        authFunc()
        cartGet()    
    },[])

    useEffect(()=>{

        dispatch(addItemToWishlist(0))
        localStorage.getItem("spurtToken")&&wishListApi(setWishListApi,dispatch)
    },[reloadCart])
   
        return (
            <div className="header__actions">
                <Link href="/account/wishlist">
                    <a className="header__extra">
                        <i className="icon-heart"></i>
                        <span>
                            <i>{wishlistData&&wishlistData.length!==0? wishlistData&&wishlistData.length:0}</i>
                        </span>
                    </a>
                </Link>
                <MiniCart />
                {auth.isLoggedIn && Boolean(auth.isLoggedIn) ? (
                    <AccountQuickLinks isLoggedIn={true} />
                ) : (
                    <AccountQuickLinks isLoggedIn={false} />
                )}
            </div>
        );
    // }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(HeaderActions);
