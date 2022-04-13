/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import { useState } from 'react';
import { useEffect } from 'react';
import { addressListApi } from '../../../api';
import { useTranslation } from '../../../i18n'


function Checkout(){
    const [cartItems,setCartItems]=useState("")
    const [details,setDetail]=useState("")
    const [totalData,setTotalData]=useState("")
    const [addressData,setAddressData]=useState([])
    const [addressLoader,setAddressLoader]=useState(false)
    const { t } = useTranslation('common');


    const totalInCart=()=>{
        const locale=JSON.parse(localStorage.getItem("cartItem"))
        var len = locale&&locale.length;
        let detailArray=[]
        for (var i = 0; i < len; i++) {
            detailArray.push(locale[i].initialPrice * locale[i].quantity)
        }
        var sum = detailArray.reduce(function(a, b){
            return a + b;
        }, 0);
        setTotalData(sum)
    
       }

    // const addressList=()=>{
    //     addressListApi(setAddressData,setAddressLoader)
    // }

    // useEffect(()=>{
    //     addressList()
    // },[])
    
 
    const arrayCreate=()=>{
        const locale=JSON.parse(localStorage.getItem("cartItem"))
        var len = locale&&locale.length;
        console.log(len)
        let detailArray=[]
        for (var i = 0; i < len; i++) {
            
            detailArray.push({
                productId: locale[i].productId,
                quantity: locale[i].quantity,
                price: locale[i].price,
                basePrice:locale[i].price,
                model:locale[i].name,
                name:locale[i].name,
                productOptions:[],
                taxType: null,
                taxValue: null

            });
            
        }
        console.log(detailArray)
        setDetail(detailArray)
       
    }



    useEffect(()=>{
        setCartItems(JSON.parse(localStorage.getItem("cartItem")))
        arrayCreate()
        totalInCart()
        

    },[])
// class Checkout extends Component {
//     constructor(props) {
//         super(props);
//     }

    // render() {
    //     const { amount, cartTotal, cartItems } = this.props;
        return (
            <div className="ps-checkout ps-section--shopping">
                {console.log(addressData)}
                <div className="container">
                    <div className="ps-section__header">
                        <h1>{t('checkout-info')}</h1>
                    </div>
                    <div className="ps-section__content">
                        <FormCheckoutInformation
                            // amount={amount}
                            // cartTotal={cartTotal}
                            cartItems={cartItems}
                            productDetail={details}
                            amount={totalData}
                            addressData={addressData}
                        />
                    </div>
                </div>
            </div>
        );
    
}

const mapStateToProps = state => {
    return state.cart;
};
export default connect(mapStateToProps)(Checkout);
