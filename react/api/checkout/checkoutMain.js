import  Router  from "next/router";
import {modalSuccess} from "../intercept";

export async function checkOutApi(fname,lname,address,num,city,postCode,email,productDetail,address1) {

    fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/orders/customer-checkout', {
            method: 'POST',
            body: JSON.stringify({
                    "shippingFirstName": fname,
                    "shippingLastName":lname,
                    "shippingCity":city,
                    "shippingPostCode":postCode,
                    "shippingZone":1,
                    "phoneNumber":num,
                    "shippingAddress_1":address,
                    "shippingAddress_2":address1,
                    "emailId":email,
                    "shippingCountryId":12,
                    "productDetails":productDetail,
                    "shippingCountry":"India"
            })
    })
    .then(json=>{
        if(json.status===1){
            localStorage.setItem("cartItem",JSON.stringify([]))
            modalSuccess("success",json.message)
            Router.push('/checkout-success/[cid]','/checkout-success/'+json.data.orderPrefixId)
        }
    })
}