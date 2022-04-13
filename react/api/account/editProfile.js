import { modalWarning, modalSuccess } from "../intercept"

export async function editProfileApi(fname,lname,email,num,Router,newDp,setButtonLoader){     
        fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/customer/edit-profile',{
        method: 'POST',
        body: JSON.stringify({
            firstName:fname,
            lastName:lname,
            emailId:email,
            image:newDp,
            phoneNumber:num,
        }) 
    }) 
    .then((json)=>{
        setButtonLoader(false)
        if (json.status === 1) {
            modalSuccess('success',json.message)
            localStorage.setItem("spurtUser",JSON.stringify(json.data)) 
            Router.push('/')
        } else {
            modalWarning('warning',json.message);
        }
        return json
    })    
}