import fetchIntercept from 'fetch-intercept';
import {notification } from 'antd';


const baseurl = process.env.NEXT_PUBLIC_SERVER_URL

export const modalSuccess = (type,message) => {
    notification[type]({
        message: message,
        // description: 'Successfully added a product to wishlist!',
    });
}

export const modalWarning = (type,message) => {
    notification[type]({
        message: message,
        // description: 'Try again after some time!',
        duration: 1,
    });
};

export const RegisterIntercept = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        var token = localStorage.getItem('spurtToken')
    // Modify the url or config here
    if (url.includes(baseurl)) {
        if(token!==null){
            config.headers = { Authorization:"Bearer " + token || undefined,"Content-type": 'application/json',
      "Accept": 'application/json', }
       }
       else{
        config.headers = { "Content-type": 'application/json',
        "Accept": 'application/json', }

       }
       
      
    }
        // config.headers={
        //     "Content-type": 'application/json',
        //     "Accept": 'application/json',
        //     "Authorization":"Bearer " || undefined
        // }
        return [url, config];
    }, 
 
    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },
 
    response: function (response) {
        // Modify or log the reponse object
        // console.log(response)
        // modalSuccess("success" , response.json.message);
        return response.json();
    },
 
    responseError: function (error) {
        // Handle a fetch error
        return Promise.reject(error);
    }
});

// Call fetch to see your interceptors in action.
// fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/customer/wishlist-product-list');

// Unregister your interceptor
// RegisterIntercept();

