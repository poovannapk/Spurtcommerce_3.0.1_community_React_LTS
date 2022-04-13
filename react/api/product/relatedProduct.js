export async function relatedProductListApi(productId,setRelatedProduct) {

    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/list/related-product-list?productId='+productId, {
        method: 'GET',
    })
    .then(json => {
        setRelatedProduct(json.data)
    })
}