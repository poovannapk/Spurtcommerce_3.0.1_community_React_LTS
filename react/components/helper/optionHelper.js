/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export function productOptionHelper(payload){
    const  product  = payload;
    const localCart = JSON.parse(localStorage.getItem('cartItem'))

    let currentCart = localCart;
    let existItem = currentCart.find(
        (item) => item.productId === product.productId
    );

    if (existItem) {
        
     
    } else {
        
    }

}