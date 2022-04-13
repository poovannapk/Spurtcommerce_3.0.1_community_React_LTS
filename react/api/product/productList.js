import { getProducts} from '../../store/product/action';

export async function productListApi(dispatch,setProductData,offset,setLoader,orderBy,price,search,categoryInitial,manuId,limit) {

    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/list/custom-product-list?limit='+limit+'&offset='+offset+'&priceFrom='+price.priceMin+'&priceTo='+price.priceMax+'&price='+orderBy+'&keyword='+search+'&manufacturerId='+manuId+'&categoryId='+categoryInitial+'&condition=', {
        method: 'GET',
    })
        .then(json => {
            if(json.data){
                dispatch(getProducts(json.data));
                setProductData(json.data)
                setTimeout(()=>{
                   setLoader(false)
                },1000)
            }
        })
}