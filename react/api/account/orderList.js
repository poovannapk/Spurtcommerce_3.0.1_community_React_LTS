export async function orderListApi(limit,offset,setOrderData,searchVal,count,setOrderLoader,setCount) {
 
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/orders/order-list?limit='+limit+'&offset='+offset+'&keyword='+searchVal+'&count='+count, {
        method: 'GET',
    })
    .then(json => {
            if(json.status===1&&json.message!=="Successfully get Count. "){
                setOrderData(json.data)
                setOrderLoader(false)
            }      
            if(json.message==="Successfully get Count. "){
                setCount(json.data)
            }
    })
}