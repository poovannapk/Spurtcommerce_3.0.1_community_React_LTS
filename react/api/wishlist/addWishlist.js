// import {notification } from 'antd';
import { addItemToWishlist } from "../../store/wishlist/action";
import { modalWarning, modalSuccess } from "../intercept";


export async function AddWishlist(productId,dispatch) {
    fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/customer/add-product-to-wishlist', {
        method: 'POST',
        body: JSON.stringify({
            "productId": productId,
            "productOptionValueId": "",
            
        })
    })
        .then(json => {
            if (!json.data) {
                console.log(json)
                modalWarning('warning',json.message)
            }
            else{
                modalSuccess('success',json.message)
                dispatch(addItemToWishlist(1))
            }
        })
}