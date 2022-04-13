/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { Component } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { removeItem, addItem } from '../../../../store/cart/action';
import { useEffect } from 'react';
import { useState } from 'react';
import { imageUrl } from '../../../../api/url';
import { cartRemove } from '../../../helper/cartHelper';
import { useTranslation } from '../../../../i18n'
import OptionNameDisplay from './optionNamePar';


function MiniCart(){
    const dispatch=useDispatch() 
    const [data,setData]=useState([])
    const [totalData,setTotalData]=useState([])
    let reloadCart=useSelector(s=>s.cart.addproduct)
    let removeFromCart=useSelector(s=>s.cart.removeproduct)

    const { t } = useTranslation('common');

   const totalInCart=()=>{
    const locale=JSON.parse(localStorage.getItem("cartItem"))
    console.log(locale)

    var len = locale&&locale.length;
    let detailArray=[] 
    console.log(locale)
    for (var i = 0; i < len; i++) {
        if(locale[i].optionName===""||locale[i].optionName===undefined){
            detailArray.push(locale[i].price *locale[i].quantity)
        }
        else{
            detailArray.push((JSON.parse(locale[i].initialPrice) + (JSON.parse(locale[i].optionName).totalOptions)) *locale[i].quantity)
        }
    }
    var sum = detailArray.reduce(function(a, b){
        return a + b;
    }, 0);
    setTotalData(sum)

   }

    useEffect(()=>{
        dispatch(addItem(0));
        setData(JSON.parse(localStorage.getItem("cartItem")))
        totalInCart()
    },[reloadCart,removeFromCart])

    const handleRemoveCartItem = (e,productId,product,optionIdArrayValue) => {
        e.preventDefault()
        if(optionIdArrayValue===undefined){
            let totalOptionResponse=JSON.parse(product.optionName).options
            let productOptionResponse=JSON.parse(product.optionName).optionValueArray
            let productOptionValueId=[]
            let productOptionValue=[]
           totalOptionResponse.forEach((i)=>{

            i.optionValue.forEach((a)=>{
                productOptionValueId.push(a.productOptionValueId)
                productOptionValue.push({productOptionValueId:a.productOptionValueId,optionValueName:a.optionValueName})
                
            })
           })
           let myArrayOption=[]
           for( var i =productOptionValue.length - 1; i>=0; i--){
            for( var j=0; j<productOptionResponse.length; j++){
              if(productOptionValue[i].optionValueName === productOptionResponse[j]){
                myArrayOption.push(productOptionValue[i].productOptionValueId)
               }
             }
           }
           cartRemove(product)
           dispatch(removeItem(product))
        }
        else{
            cartRemove(product)
            dispatch(removeItem(product))
        }
    };

            return (
            <div className="ps-cart--mini">
                <a className="header__extra" href="#">
                    <i className="icon-bag2"></i>
                    <span>
                        <i>{data!==null? data&&data.length:0}</i>
                    </span>
                </a>
                {data && data.length> 0 ? (
                    <div className="ps-cart__content">
                        <div className="ps-cart__items">
                            {data&& data.length > 0
                                ? data && data.map((product,index ) => (
                                      <div
                                          className="ps-product--cart-mobile"
                                          key={index}>
                                          <div className="ps-product__thumbnail">
                                              <Link
                                                  href="/product/[pid]"
                                                  as={`/product/${product.productId}`}>
                                                  <a>
                                                  {product.processImage?<img src={ imageUrl+"?path="+product.processImage.containerName+"&name="+product.processImage.name+"&width=200&height=400"}  alt="martfury"/>:<img src={ imageUrl+"?path="+product.containerName+"&name="+product.image+"&width=200&height=400"}  alt="martfury"/>}
                                                  
                                                           
                                                  </a>
                                              </Link>
                                          </div>
                                          <div className="ps-product__content">
                                              <a
                                                  className="ps-product__remove"
                                                  onClick={e=>handleRemoveCartItem(e,product.productId,product,product.optionIdArrayValue)}>
                                                  <i className="icon-cross"></i>
                                              </a>
                                              <Link
                                                  href="/product/[pid]"
                                                  as={`/product/${product.productId}`}>
                                                  <a className="ps-product__title">
                                                      {product.name} 
                                                  </a>

                                              </Link>

                                              <OptionNameDisplay optionName={JSON.parse(product&&product.optionName)}/>

                                             
                                                <small>
                               {" "+product.quantity} x{' $ '}
                                {product.initialPrice}
                            </small>

                                          </div>
                                      </div>
                                  ))
                                : ''}
                        </div>
                        <div className="ps-cart__footer">
                            <h3>
                                Sub Total:
                                <strong>{'$ '}{totalData}</strong>
                            </h3>
                            <figure>
                                <Link href="/account/shopping-cart">
                                    <a className="ps-btn">{t('view-cart')}</a>
                                </Link>
                                <Link href="/account/checkout">
                                    <a className="ps-btn">{t('checkout')}</a>
                                </Link>
                            </figure>
                        </div>
                    </div>
                ) : (
                    <div className="ps-cart__content">
                        <div className="ps-cart__items">
                            <span>No products in cart</span>
                        </div>
                    </div>
                )}
            </div>
        );
    
}
const mapStateToProps = (state) => {
    return state.cart,state.setting;
};
export default connect(mapStateToProps)(MiniCart);
