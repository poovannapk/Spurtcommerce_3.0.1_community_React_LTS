import {modalSuccess, modalWarning} from "../intercept";

export async function UserRegister(name, email, password,confirmPassword,number,Router) {
    fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/customer/register', {
        method: 'POST',
        body: JSON.stringify({
            "name": name,
            "emailId": email,
            "password": password,
            "confirmPassword": confirmPassword,
            "phoneNumber":number
        })
    })
        .then(json => {
            if (json) {
                if (json.status) {
                    modalSuccess("success",json.message)
                    Router.push('/account/login');
                }
                else {
                    modalWarning("warning",json.message)
                }
            }
        })
}