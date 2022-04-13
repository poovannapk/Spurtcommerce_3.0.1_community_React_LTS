import { modalSuccess, modalWarning } from "../intercept"

export async function abuseReportApi(remark,answerId,reasonId,setShowModal,setRemark,setReasonId) {
    fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/store-question-answer/add-report-abuse', {
        method: 'POST',
        body: JSON.stringify({
            "remark":remark,
            "answerId":answerId,
            "reasonId":reasonId  
        })
    })
    .then(json => {
        if (json) {
            if (json.status===1) {
                
                setShowModal(false)
                modalSuccess('success',json.message)
                setRemark("")
                setReasonId("")
            }
            else{
                modalWarning('warning',json.message)
            }
        }
    })
}