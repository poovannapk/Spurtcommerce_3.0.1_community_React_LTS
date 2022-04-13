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
import {
    getCart,
    increaseItemQty,
    decreaseItemQty,
    removeItem,
    addItem,
} from '../../../store/cart/action';

import Link from 'next/link';
import ProductCart from '../../elements/products/ProductCart';
import { useEffect } from 'react';
import { useState } from 'react';
import { cartRemove, incrementQuantity,decrementQuantity } from '../../helper/cartHelper';
import { useTranslation } from '../../../i18n'


function ShoppingCart(){
    const[data,setData]=useState()
    const [totalData,setTotalData]=useState("")
    const [cartLoader,setCartLoader]=useState(true)
    let removeFromCart=useSelector(s=>s.cart.removeproduct)
    let reloadCart=useSelector(s=>s.cart.addproduct)
    let incrementLoad=useSelector(s=>s.cart.increment)
    let decrementLoad=useSelector(s=>s.cart.decrement)
    const dispatch=useDispatch()
    const { t } = useTranslation('common');
    let currentColor=useSelector(s=>s.palette.currentColor)




    
// class ShoppingCart extends Component {
//     constructor(props) {
//         super(props);
//     }

useEffect(()=>{
    //  dispatch(getCart());
        // cartListApi()
        setCartLoader(true)
        // cartListApi(setCartLoader)
        setData(JSON.parse(localStorage.getItem("cartItem")))
        totalInCart()


        
        // setTimeout(()=>{
        //     cartApiCall()
        // },1000)
    },[reloadCart,removeFromCart,incrementLoad,decrementLoad])


    const totalInCart=()=>{
        const locale=JSON.parse(localStorage.getItem("cartItem"))
        console.log(locale)
        var len = locale&&locale.length;
        let detailArray=[]
        for (var i = 0; i < len; i++) {
            if(locale[i].optionName===""||locale[i].optionName===undefined){
                detailArray.push(locale[i].initialPrice *locale[i].quantity)
                // console.log("dfds ")
            }
            else{
                // console.log(JSON.parse(locale[i].optionName).totalOptions)
                // console.log(locale[i].price)
    
                detailArray.push((JSON.parse(locale[i].initialPrice) + (JSON.parse(locale[i].optionName).totalOptions)) * locale[i].quantity)
    
            }
        }
        console.log(detailArray)
        var sum = detailArray.reduce(function(a, b){
            return a + b;
        }, 0);
        setTotalData(sum)
    
       }

// const apiCall=()=>{
//     cartListApi(setData)
// }

//     useEffect(()=>{
//         apiCall()
//         // this.props.dispatch(getCart());
//     },[])

    const handleIncreaseItemQty=(product)=>{
        incrementQuantity(product)
       dispatch(increaseItemQty(product));
       dispatch(addItem(1))
       console.log("fdu")
    }

    const handleDecreaseItemQty=(product)=> {
        decrementQuantity(product)
        dispatch(decreaseItemQty(product));
        dispatch(addItem(1))


    }

    // const handleRemoveCartItem = product => {
    //     removeFromCartApi(product.productId)
    //     // this.props.dispatch(removeItem(product));
    //     cartRemove(product)
    //    dispatch(removeItem(product))
    // };

    const handleRemoveCartItem = (e,productId,product,optionIdArrayValue) => {
        // console.log(product)
        e.preventDefault()
        if(optionIdArrayValue===undefined){
            let totalOptionResponse=JSON.parse(product.optionName).options
            let productOptionResponse=JSON.parse(product.optionName).optionValueArray
            let productOptionValueId=[]
            let productOptionValue=[]
        //    console.log(totalOptionResponse,productOptionResponse)
           totalOptionResponse.forEach((i)=>{

            i.optionValue.forEach((a)=>{

                // if(a.optionValueName===)
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
        //    removeFromCartApi(productId,product.price,myArrayOption)
           cartRemove(product)
           dispatch(removeItem(product))
           console.log(product)

 

        //    console.log(myArrayOption)
        //    console.log(productOptionValueId,productOptionValue)

        }
        else{
            console.log(product)

            // removeFromCartApi(productId,product.price,optionIdArrayValue)
            cartRemove(product)
            dispatch(removeItem(product))
        }
    };

    

    // render() {
        const { amount, cartTotal, cartItems } = "";
        let currentCartItems = [];
        // if (cartItems && cartItems.length > 0) {
        //     currentCartItems = cartItems;
        // }
        return (
            <div className="ps-section--shopping ps-shopping-cart">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Shopping Cart</h1>
                    </div>
                    <div className="ps-section__content">
                    {data && data.length === 0  ? (
                            <div className="alert alert-danger" role="alert">
                                Cart is empty!
                            </div>
                        ) : (
                        <div className="table-responsive">
                            <table className="table ps-table--shopping-cart">
                                <thead>
                                    <tr>
                                        <th>{t('product')}</th>
                                        <th>{t('price')}</th>
                                        <th>{t('quantity')}</th>
                                        <th>{t('total')}</th>
                                        <th>{t('action')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data&&data.map((product,index) => (
                                        
                                        <tr key={product.sku+index}>
                                            {/* {console.log(product)} */}
                                            <td> 
                                                <ProductCart product={product} type="cart"/>
                                                {/*<div className="ps-product--cart">
                                                    <div className="ps-product__thumbnail">
                                                        <Link
                                                            href="/product/[pid]"
                                                            as={`/product/${product.id}`}>
                                                            <a>
                                                                <img
                                                                    src={
                                                                        product.thumbnail
                                                                    }
                                                                    alt="martfury"
                                                                />
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="ps-product__content">
                                                        <Link
                                                            href="/product/[pid]"
                                                            as={`/product/${product.id}`}>
                                                            <a className="ps-product__title">
                                                                {product.title}
                                                            </a>
                                                        </Link>
                                                        <p>
                                                            Sold By:
                                                            <strong>
                                                                {product.vendor}
                                                            </strong>
                                                        </p>
                                                    </div>
                                                </div>*/}
                                            </td>
                                            <td className="price">
                                            {'$ '}{product.initialPrice}

                                            </td>
                                            <td>
                                                <div className="form-group--number">
                                                    <button
                                                        className="up"
                                                        onClick={e=>handleIncreaseItemQty(product)}>
                                                        +
                                                    </button>
                                                    <button
                                                        className="down"
                                                        onClick={e=>handleDecreaseItemQty(product)}>
                                                        -
                                                    </button>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="1"
                                                        value={product.quantity}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                $
                                                {product.quantity *
                                                
                                                   product.initialPrice}

                                            </td>
                                            <td>
                                                <a
                                                href=""
                                                    onClick={e=>handleRemoveCartItem(e,product.productId,product,product.optionIdArrayValue)}>
                                                    <i className="icon-cross"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>)}
                        <div className="ps-section__cart-actions">
                            <Link href="/shop">
                                <a>
                                    <i className="icon-arrow-left mr-2"></i>
                                    Back to Shop
                                </a>
                            </Link>
                        </div>
                    </div>
                    {data && data.length !== 0 &&<div className="ps-section__footer">
                        <div className="row justify-content-end">
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                                <div className="ps-block--shopping-total">
                                    <div className="ps-block__header">
                                        <p>
                                        {t('subtotal')} <span>$ {totalData}</span>
                                        </p>
                                    </div>
                                    <div className="ps-block__content">
                                        <ul className="ps-block__product">
                                        </ul>
                                        <h3>
                                        {t('total')} <span>$ {totalData}</span>
                                        </h3>
                                    </div>
                                </div>
                                <Link href="/account/checkout">
                                    <a className={`ps-btn ps-btn--fullwidth ${currentColor}`} >
                                    {t('proceed-to-checkout')}
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        );
    
}

const mapStateToProps = state => {
    return state.cart,state.setting;
};
export default connect(mapStateToProps)(ShoppingCart);
