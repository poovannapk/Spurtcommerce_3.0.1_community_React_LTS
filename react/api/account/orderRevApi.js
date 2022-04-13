export async function orderRevDetailApi(orderProductId,setOrderDetailInfo,setRevLoader) {

    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/orders/order-detail?orderProductId='+orderProductId, {
        method: 'GET',
    })
    .then(json => {
        if(json.data){
            setOrderDetailInfo(json.data)
            setRevLoader(false)
        }
    })
}