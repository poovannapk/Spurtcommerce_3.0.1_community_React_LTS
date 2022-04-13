/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export function cartAdd(payload, quantity, availValue) {
    console.log(payload)
    let product = payload;
    const localCart = JSON.parse(localStorage.getItem('cartItem'))
    let currentCart = localCart;
    if(currentCart===null){
        currentCart=[]
    }
    let existItem = currentCart&&currentCart.find(
        (item) => item.productId === product.productId
    );
    
    let existItemsArray = currentCart&&currentCart.filter(
        (item) => item.productId === product.productId
    );

    if (existItem) {

        if(product.optionName.length!==0){
            let existObject=existItemsArray&&existItemsArray.find(
                (item) => JSON.parse(item.optionName).optionValueArray.sort().toString() === JSON.parse(product.optionName).optionValueArray.sort().toString()
            );
            if(existObject!==undefined){
                existItem=existObject
            }

        }
        
        let productOptName=JSON.parse(product.optionName)
        let existOptName=JSON.parse(existItem.optionName)

        if (JSON.stringify(productOptName.optionValueArray)!==JSON.stringify(existOptName.optionValueArray) ) {
            product.quantity = quantity;
            currentCart.push(product);

 
        }
        else {
                product.quantity = quantity
                existItem.quantity += product.quantity;
        }


    } else {
        product.quantity = quantity;
        currentCart.push(product);


    }

    return localStorage.setItem("cartItem", JSON.stringify(currentCart))
}

export function cartRemove(payload){
    const  product  = payload;
    let localCart = JSON.parse(localStorage.getItem('cartItem'))

    if(product.optionName.length!==0){
    let existItemsArray = localCart&&localCart.filter(
        (item) => item.productId === product.productId
    );

    let existObject=existItemsArray&&existItemsArray.find(
        (item) => JSON.parse(item.optionName).optionValueArray.sort().toString() === JSON.parse(product.optionName).optionValueArray.sort().toString()
    );
    let index=localCart.indexOf(existObject)
        localCart.splice(index, 1);
    }
    else{
    let index = localCart.findIndex(
        (item) => item.productId === product.productId
    );

    if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
        localCart.splice(index, 1);
    }
}

    return localStorage.setItem("cartItem",JSON.stringify(localCart))
}

export function incrementQuantity(payload){
    const product = payload;
        let localCart = JSON.parse(localStorage.getItem('cartItem'))
        let selectedItem = localCart.find(
            (item) => item.productId === product.productId
        );
        if(product&&product.productOption&&product.productOption.length!==0){
            let existItemsArray = localCart&&localCart.filter(
                (item) => item.productId === product.productId
            );
        
            let existObject=existItemsArray&&existItemsArray.find(
                (item) => JSON.parse(item.optionName).optionValueArray.sort().toString() === JSON.parse(product.optionName).optionValueArray.sort().toString()
            );
                existObject.quantity++;
        }
        else{
            if (selectedItem) {
                selectedItem.quantity++;
            }

        }
        
        return localStorage.setItem("cartItem",JSON.stringify(localCart))
}

export function decrementQuantity(payload){
    const  product  = payload;
    const localCart =JSON.parse(localStorage.getItem('cartItem'));
    let selectedItem = localCart.find(
        (item) => item.productId === product.productId
    );
        if (selectedItem) {
            if(selectedItem.quantity-1>=1){
                selectedItem.quantity--;
            }
        }
    return localStorage.setItem("cartItem",JSON.stringify(localCart))

}
