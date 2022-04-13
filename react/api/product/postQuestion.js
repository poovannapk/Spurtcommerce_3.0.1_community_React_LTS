import { modalSuccess, modalWarning } from "../intercept"

export async function postQuestionPopApi(productId,question,setShowModal,setQuestionError,setQuestion) {
    fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/store-question-answer/add-question', {
        method: 'POST',
        body: JSON.stringify({
            "productId": productId,
            "question": question   
        })
    })
    .then(json => {
        if (json) {
            if (json.status===1) {  
                    setShowModal(false)
                    modalSuccess('success',json.message)
                    setQuestionError("")
                    setQuestion("")
                }
                else{
                    modalWarning('warning',json.message)
                }
            }
        })
}