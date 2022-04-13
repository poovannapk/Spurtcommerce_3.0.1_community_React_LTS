import  Router  from "next/router";
import { modalSuccess, modalWarning } from "../intercept";

export async function contactApi(name,mail,phone,message,setName,setMail,setPhone,setMessage,setNameError,setMailError,setPhoneError,setMessageError) {

    fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/list/contact-us', {
            method: 'POST',
            body: JSON.stringify({
                    "name": name,
                    "email":mail,
                    "phoneNumber":phone,
                    "message":message
            })
    })
    .then(json=>{
        if(json.status===1){
            setName("");
            setMail("");
            setPhone("");
            setMessage("");
            setNameError("");
            setMailError("");
            setPhoneError("");
            setMessageError("");
            Router.push('/')
            modalSuccess('success',json.message)
        }
        else{
            modalWarning('error',json.message);
        }
    })
}