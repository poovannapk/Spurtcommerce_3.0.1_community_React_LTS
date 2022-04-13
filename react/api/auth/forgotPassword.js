import { modalSuccess, modalWarning } from "../intercept";

export async function forgotApi(email,Router) {
    fetch(process.env.NEXT_PUBLIC_SERVER_URL +'/customer/forgot-password', {
        method: 'POST',
        body: JSON.stringify({
            "emailId": email,
        })
    })
    .then(json => {
        if (json) {
            if (json.status === 1) {
                modalSuccess('success',json.message)
                Router.push('/account/login')    
            } else {
                modalWarning('warning',json.message);
            }
        }
    })
}