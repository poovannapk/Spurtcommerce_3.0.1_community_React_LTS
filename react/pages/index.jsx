/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import HeaderDefault from '../components/shared/headers/HeaderDefault';
import FooterFullwidth from '../components/shared/footers/FooterFullwidth';
import HomeBanner from '../components/partials/homepage/home-default/HomeBanner';
import SiteFeatures from '../components/partials/homepage/home-default/SiteFeatures';
import HeaderMobile from '../components/shared/headers/HeaderMobile';
import NavigationList from '../components/shared/navigation/NavigationList';
import HomeDefaultDealOfDay from '../components/partials/homepage/home-default/HomeDefaultDealOfDay';
import '../scss/home-default.scss';
import { useState, useEffect } from 'react';
import {dealOfDayApi} from '../api';
import {homeBannerApi} from '../api';
import { categoryListApi } from '../api';
import ThemeChanger from '../components/elements/color/themeControl';
import useNetwork from '../components/reusable/NetworkCheck';
import  Router  from 'next/router';


function Index(props) {
    const [subscribe,setSubscribe] = useState(false)
    const [banner,setBanner]=useState([])
    const [brands,setBrands]=useState([])
    const dispatch = useDispatch()
    let deals=useSelector(s=>s.collection)
    let auth=useSelector(s=>s.auth)
    let setting=useSelector(s=>s.setting)
    const network=useNetwork()

  

   
    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])
    
    

    useEffect(() => {
        categoryListApi(dispatch)
        dealOfDayApi(dispatch) 
        homeBannerApi(setBanner)
    }, [])
  
    return (
        <div className="site-content">
            <HeaderDefault/>
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <main id="homepage-1">
                <HomeBanner data={banner}/>
                <SiteFeatures />
                {deals&&deals.collections!==[]&&<HomeDefaultDealOfDay collectionSlug="deal_of_the_day" data={deals.collections}/>}
            </main>
            <FooterFullwidth />
        </div>
    );
}


export default connect(state => state.collection)(Index);
