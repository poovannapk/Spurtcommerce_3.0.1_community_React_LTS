import { getWishlistList, wishListLoading } from "../../store/wishlist/action";
// import {RegisterIntercept} from '../intercept'


export async function wishListApi(setWishListApi,dispatch) {

    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/customer/wishlist-product-list', {
    method: 'GET',})
    .then(json => {
        console.log(json,"wishlist-data")
        if(json.data){
            setWishListApi(json.data)
            dispatch(getWishlistList(json.data))
            setTimeout(()=>{
                dispatch(wishListLoading(false))
            },2000)
        }
        else{
            dispatch(wishListLoading(false))
        }
    } 
        )
}


// fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/customer/wishlist-product-list', {
//     method: 'GET',
//     headers: {
//         "Content-type": 'application/json',
//         "Accept": 'application/json',
//         "Authorization":"Bearer "+localStorage.getItem('spurtToken')
//     }
// })
//     .then(response => {
//         // console.log(response)
//         return response.json()
//     })
//     .then(json => {
//         if(json.data){
//             setWishListApi(json.data)
//             dispatch(wishListLoading(false))
//         }
//     }
//     )
//     .catch(e => console.log(e))