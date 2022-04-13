export async function orderDetailApi(orderProductId,setOrderDetailInfo,setOrderLoading) {

    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/orders/order-detail?orderId='+orderProductId, {
        method: 'GET',
    })
    .then(json => {
        if(json.data){
            setOrderDetailInfo(json.data)
            setOrderLoading(false)
        }    
    })
}