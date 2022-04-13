import { modalSuccess, modalWarning } from "../intercept"

export async function quotationReq(productId,quantityVal,unit,orderVal,need,comments,setShowModal,setQuantityVal,setQuantError,setUnit,setUnitError,setOrderVal,setOrderValError,setNeed,setNeedError,setComments,setCommentsError,setSubmit) {
    fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/quotation/quotation-request', {
        method: 'POST',
        body: JSON.stringify({
            "productId": productId,
            "quantity": quantityVal,
            "quantityUnit": unit,
            "orderValue": orderVal,
            "purpose":need,
            "comments":comments  
        })
    })
        .then(json => {
            if (json) {
                if (json.status===1) {
                    setShowModal(false)
                    modalSuccess('success',json.message) 
                }
                else{
                    modalWarning('warning',json.message)
                    setShowModal(false)
                    setQuantityVal("")
                    setQuantError("")
                    setUnit("")
                    setUnitError("")
                    setOrderVal("")
                    setOrderValError("")
                    setNeed("")
                    setNeedError("")
                    setComments("")
                    setCommentsError("")
                    setSubmit(0)
                }
            }
        })
}