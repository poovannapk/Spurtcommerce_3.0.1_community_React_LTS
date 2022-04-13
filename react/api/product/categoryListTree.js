import {  getProductCategories } from "../../store/product/action";


export async function categoryListApi(dispatch) {

    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/list/category-list', {
        method: 'GET',
    })
    .then(json => {
        dispatch(getProductCategories(json.data));        
    })
}