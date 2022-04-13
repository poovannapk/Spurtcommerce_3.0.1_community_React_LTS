import { modalSuccess, modalWarning } from "../intercept";

export async function delWishApi(productId,setDelStatus) {
 
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/customer/wishlist-product-delete/' + productId, {
        method: 'DELETE',
    })
         .then(json => {
            if (json.status === 1) {
                modalSuccess('success',json.message)
                setTimeout(()=>{
                    setDelStatus(1)    
                },1000)
                
            } else {
                modalWarning('warning',json.message);
            }
         })
}