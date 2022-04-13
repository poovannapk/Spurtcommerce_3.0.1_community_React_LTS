/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { useState } from 'react';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import FooterFullwidth from '../../components/shared/footers/FooterFullwidth';
import { useEffect } from 'react';
import { pageDetApi } from '../../api';
import BreadCrumb from '../../components/elements/BreadCrumb';
import Router from 'next/router';
import ThemeChanger from '../../components/elements/color/themeControl';
import useNetwork from '../../components/reusable/NetworkCheck';


const pageDetail=({query})=>{
    const [det,setDet]=useState("")
    const [postLoading,setPostLoading]=useState(true)
    const network=useNetwork()

    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])

    

 
    useEffect(()=>{
        const  pdid  = query.pdid;
        if (pdid===undefined) {
            Router.push('/page/page-404');
        }

        if (query) {
            pageDetApi(pdid,setDet,setPostLoading)
        }

        Router.events.on('routeChangeStart', (url) => {
            console.log("change router")
            const nextPid = url.split('/').pop();
            if (nextPid !== '' && isNaN(parseInt(nextPid)) === false) {
                pageDetApi(nextPid,setDet,setPostLoading)
                setPostLoading(true)
            }
        });

    },[])

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',

        },
        {
            text:'Page Detail',
            
        }
        
    ];

    return(
        <div className="site-content">
            <HeaderDefault/>
            <HeaderMobile/>
            <NavigationList />
            <ThemeChanger/>
            <BreadCrumb breacrumb={breadCrumb} />

            {postLoading===false? <div className="ps-page--simple" style={{padding:"40px"}}>
               {det!=="" && <h3>{det.title} :</h3>}
               {det!==""&& <div dangerouslySetInnerHTML={{__html: det.content}}/>}

            </div>:<div className="ps-page--product"> <div className="ps-container">
                            <center><img src="/static/img/spurtloader.gif" width="100px"/></center> 
                            </div></div>}
            <FooterFullwidth/>
        </div>
    )
}

export default pageDetail

pageDetail.getInitialProps=async(ctx)=>({
    query:ctx.query
})

