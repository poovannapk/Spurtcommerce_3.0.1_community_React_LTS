/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import App from 'next/app';
import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import configureStore from '../store/store';
import DefaultLayout from '../components/layouts/DefaultLayout';
import {createWrapper} from 'next-redux-wrapper';
import {appWithTranslation} from '../i18n';
import '../scss/style.scss';
import getProfileApi from '../api/home/getProfile';
import getPageApi from '../api/home/getPage';
import { colorThemeCurrent } from '../store/colorPalette/action';
import Router from 'next/router';


function MyApp({ Component, pageProps }){
    const RedirectMaintain=useSelector(s=>s.setting.maintenance)
    useEffect(()=>{
    if(RedirectMaintain===1){
        Router.push('/maintenance')
    }
    },[])

    const dispatch=useDispatch()

    useEffect(()=> {
        setTimeout(function() {
            document.getElementById('__next').classList.add('loaded');
        }, 100);
        getProfileApi(dispatch)
        getPageApi(dispatch)
        dispatch(colorThemeCurrent(localStorage.getItem("colorThemeSpurt")))
    },[])
   
        const getLayout =
            Component.getLayout || (page => <DefaultLayout children={page} />);
        return getLayout(

            <Provider store={configureStore}>
                    <Component {...pageProps} />
            </Provider>
        );
    
}

const makestore=()=>configureStore;
const wrappers=createWrapper(makestore);

export default wrappers.withRedux(appWithTranslation(MyApp))

MyApp.getInitialProps = async (appContext) => ({ ...await App.getInitialProps(appContext) })
