import { modalSuccess, modalWarning } from "../intercept";
import  Router  from "next/router";

export async function enquiryApi(serviceId,name,mail,phone,message) {

    fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/store-service/store-enquiry', {
            method: 'POST',
            body: JSON.stringify({
                    "serviceId": serviceId,
                    "name":name,
                    "email":mail,
                    "mobile":phone,
                    "comments":message
            })
    })
    .then(json=>{
        if(json.status===1){
            Router.push('/services/enquiry-success')
            modalSuccess('success',json.message)
        }
        else{
            modalWarning('error',json.message);

        }
    })
}