import { getCollection } from "../../store/collection/action"
export async function dealOfDayApi(dispatch) {
     await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/product-store/todayDeals-list?limit=&offset=&keyword=&sku=&count=', {
        method: 'GET',      
    })
    .then(json => {
        console.log(json)
        dispatch(getCollection(json.data))
    })
}

