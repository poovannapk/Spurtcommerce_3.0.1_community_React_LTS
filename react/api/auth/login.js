import { login } from "../../store/auth/action";
import { modalSuccess } from "../intercept";

export const UserLogin = (email,password,loginType,Router,setLoginError) => {

    return fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/customer/login', {
        method: 'POST',
        body: JSON.stringify({
            'emailId':email, 'password': password,"type":loginType
        })
    })
        .then((response) => {
                if (response.status === 1) {
                    localStorage.setItem("spurtToken", response.data.token);
                    localStorage.setItem("spurtUser",JSON.stringify(response.data.user));
                    modalSuccess('success',response.message)
                    Router.push('/');
                } else {
                    setLoginError(response.message)
                }
        })
};