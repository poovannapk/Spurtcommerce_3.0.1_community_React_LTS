/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, {  useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {  addItemToWishlist, wishListLoading } from '../../../store/wishlist/action';
import Link from 'next/link';
import ProductCart from '../../elements/products/ProductCart';
import { useEffect } from 'react';
import { wishListApi } from '../../../api';
import { delWishApi } from '../../../api';

function Wishlist(props){
    const [wishlistData,setWishListApi]=useState()
    const [delstatus,setDelStatus]=useState(0)
    const dispatch=useDispatch()
    let currentColor=useSelector(s=>s.palette.currentColor)

    const wishApiCall=()=>{
        dispatch(wishListLoading(true))
            wishListApi(setWishListApi,dispatch)
    }

    useEffect(()=>{
        setDelStatus(0)
        wishApiCall()
    },[delstatus])

    const handleRemoveWishListItem = (e, productId) => {
        e.preventDefault();
        delWishApi(productId,setDelStatus)
        dispatch(addItemToWishlist(1))        
    };

        return (
            <div className="ps-section--shopping ps-whishlist">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Wishlist</h1>
                    </div>
                    <div className="ps-section__content">
                        {wishlistData && wishlistData.length === 0  ? (
                            <div className="alert alert-danger" role="alert">
                                Wishlist is empty!
                            </div>
                        ) : (
                            <div>{props.wishLoad===false? 
                            <div className="table-responsive">
                                <table className="table ps-table--whishlist">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product name</th>
                                            <th>Unit Price</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wishlistData&&wishlistData.map(product => (
                                            <tr key={product.product.productId}>
                                                <td>
                                                    <a
                                                        href="#"
                                                        onClick={e =>
                                                            handleRemoveWishListItem(
                                                                e,
                                                                product.product.productId
                                                            )
                                                        }>
                                                        <i className="icon-cross"></i>
                                                    </a>
                                                </td>
                                                <td>
                                                    <ProductCart
                                                        product={product}
                                                        type="wishlist"
                                                    />
                                                </td>
                                                <td className="price">
                                                    ${product.product.price}
                                                </td>
                                                <td>
                                                <Link
                            href="/product/[pid]"
                            as={`/product/${product.product.productId}`}>
                                                    <a className={`ps-btn ${currentColor}`}>
                                                        Add to cart
                                                    </a>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>:
                <div className="container">
                    <center><img src="/static/img/spurtloader.gif" width="100px"/></center>

                </div>}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        );
    
}
const mapStateToProps = state => {
    return state.wishlist;
};
export default connect(mapStateToProps)(Wishlist);
