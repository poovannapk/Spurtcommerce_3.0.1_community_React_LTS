import { getTotalProducts } from "../../store/product/action";


export async function productCountApi(dispatch,setCount,price,orderBy,search,categoryInitial,manuId,limit,setMaxPrice,initialLoad) {

    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/list/product-count?limit='+limit+'&offset=0&manufacturerId='+manuId+'&categoryId='+categoryInitial+'&priceFrom='+ price.priceMin+'&priceTo='+price.priceMax+'&price='+orderBy+'&keyword='+search+'&count=true', {
        method: 'GET',
    })
        .then(json => {
            dispatch(getTotalProducts(json.data.productCount));
            setCount(json.data.productCount)
            setMaxPrice(json.data.maximumProductPrice)
        })
}