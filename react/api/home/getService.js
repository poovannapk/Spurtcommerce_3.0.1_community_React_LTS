import { serviceDetail } from "../../store/setting/action"

export async function getServiceApi(dispatch) {
    
        await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/store-service/category-list?limit=0&offset=0&keyword=&count=0', {
            method: 'GET',
        })
        .then(json => {
            if(json.data){
                dispatch(serviceDetail(json.data))
            } 
        })    
}
