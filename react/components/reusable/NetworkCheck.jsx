/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { useState, useEffect } from "react";

function useNetwork(){
    const [isOnline, setNetwork] = useState(process.browser&& window.navigator.onLine);
    const updateNetwork = () => {
       setNetwork(window.navigator.onLine);
    };

    useEffect(() => {
       window.addEventListener("offline", updateNetwork);
       window.addEventListener("online", updateNetwork);
       return () => {
          window.removeEventListener("offline", updateNetwork);
          window.removeEventListener("online", updateNetwork);
       };
    });
    return isOnline;
 };

 export default useNetwork;