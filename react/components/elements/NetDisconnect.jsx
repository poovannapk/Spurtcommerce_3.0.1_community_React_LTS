/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import { useState } from 'react';
import Router from 'next/router'


function NetworkFallback(){
    const [netError,setNetError]=useState(false)

    const ReconnectClick=(e)=>{
        if(window.navigator.onLine===true){
            Router.back()
            setNetError(false)
        }
        else{
            setNetError(true)
           const recon = setInterval(()=>{
                console.log("hiii",window.navigator.onLine)
                if(window.navigator.onLine===true){
                    console.log("hello,w")
                    Router.back()
                    setNetError(false)
                    clearInterval(recon);
                }
            },3000)
        }
    }

    return(
        <div className="custom-network-container">
            <div className="network-error-main">
            <div className="network-reconnect-loader">
               <img src="static/img/disconnect.png"/>
            </div>

                <div className="network-error-Heador">
                    <h3>Oops...Your network is disconnected</h3>
                </div>
                <div className="network-reconnect-anchor">
                    <a onClick={e=>ReconnectClick(e)}>Try Reconnecting</a>

                </div>
                <div className="network-reconnect-loader">
                {netError&&<img src="static/img/332.gif" style={{height:"33px"}}></img>}


                </div>

            </div>

        </div>
    )
}

export default NetworkFallback

