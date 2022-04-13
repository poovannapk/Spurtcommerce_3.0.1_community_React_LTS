export async function productRatingApi(productId,setRatingInfo) {

    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/product-store/Get-Product-rating?productId='+productId, {
        method: 'GET',
    })
    .then(json => {
        setRatingInfo(json.data)            
    })
}