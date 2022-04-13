export async function pinCodeApi(productId,pin,setPinInfo,setCheckStatus) {

    fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/vendor-store/check-pincode-availability?productId='+productId+'&pincode='+pin, {
        method: 'GET',
    })
    .then(json => {
        if (json.status === 1) {
            setCheckStatus("success")
            setPinInfo(json.message)
        }
        else {
            setCheckStatus("error")
            setPinInfo(json.message)
            }
        })
}