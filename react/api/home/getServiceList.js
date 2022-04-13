import { serviceListInfoDet } from "../../store/setting/action"

export async function getServiceListApi(dispatch,categoryId,setServelistLoader) {
    
        await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/store-service/service-list?limit=0&offset=0&keyword=&categoryId='+categoryId+'&count=0', {
            method: 'GET',
        })
        .then(json => {       
            dispatch(serviceListInfoDet(json.data))
            setServelistLoader(false)  
        })
}

