import { getProductsById, getProductByLoading } from "../../store/product/action";
import { questionsApi } from "./question";

export async function getProductDetApi(productSlug,dispatch,setPriceChartInfo,setQuestionInfo) {
    let dummyKeyword=""
    let dummyLoader=false

    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/product-store/productdetail/'+productSlug, {
        method: 'GET',
    })
    .then(json => {
        if(json.data){
            dispatch(getProductsById(json.data))
            // questionsApi(json.data.productId, setQuestionInfo, dummyKeyword, dummyLoader, 3)
            dispatch(getProductByLoading(false))
            // setPriceChartInfo(json.data.productTirePrices)
        }
        return json
       
    })
}