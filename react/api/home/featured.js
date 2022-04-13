import { getCollections } from "../../store/collection/action"

export async function featuredApi(dispatch) {
    //To fetch posts in newsfeed
        await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/product-store/featureproduct-list', {
            method: 'GET',  
        })
        .then(json => {
            dispatch(getCollections(json.data)) 
        })
    }
