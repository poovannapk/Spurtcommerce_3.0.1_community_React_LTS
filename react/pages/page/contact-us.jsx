/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import  Router  from "next/router";
import FooterDefault from '../../components/shared/footers/FooterDefault';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import ContactInfo from '../../components/partials/page/ContactInfo';
import ContactForm from '../../components/partials/page/ContactForm';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ContactMap from '../../components/partials/page/ContactMap';
import ThemeChanger from '../../components/elements/color/themeControl';
import useNetwork from '../../components/reusable/NetworkCheck';
import { useEffect } from 'react';

const ContactUsPage = () => {
    const network=useNetwork()

    useEffect(()=>{
        if(network===false){ Router.push('/network-error')  }
    },[])
   
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'ContactUs',
        },
    ];

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger/>
            <div className="ps-page--single" id="contact-us">
                <BreadCrumb breacrumb={breadCrumb} />
                <ContactMap/>
                <ContactInfo /> 
                <ContactForm />
            </div>
            <FooterDefault />
        </div>
    );
};

export default ContactUsPage;
