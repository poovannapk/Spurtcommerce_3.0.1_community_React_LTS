import { modalSuccess, modalWarning } from "../intercept";

export async function changePasswordApi(oldPass,newPass,setPassButtonLoader){   

    fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/customer/change-password',{
        method: 'POST',
        body: JSON.stringify({
            oldPassword:oldPass,
            newPassword:newPass,
        })
    })      
    .then((json)=>{
        setPassButtonLoader(false)
        if (json.status === 1) {
            modalSuccess('success',json.message)
        } else {
            modalWarning('warning',json.message);
        }
        return json
    })    
}