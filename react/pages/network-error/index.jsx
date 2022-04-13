/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import NetworkFallback from '../../components/elements/NetDisconnect';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ThemeChanger from '../../components/elements/color/themeControl';

function NetworkIndex(){
    return(
        <div className="custom-network-container">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <ThemeChanger />
            <NetworkFallback />
        </div>
    )
}

export default NetworkIndex