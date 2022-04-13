/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import Link from 'next/link';
import NavigationDefault from '../navigation/NavigationDefault';
import HeaderActions from './modules/HeaderActions';
import MenuCategories from './modules/MenuCategories';
import SearchHeader from './modules/SearchHeader';
import { stickyHeader } from '../../../utilities/common-helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from '../../../i18n';

function HeaderDefault(){
    let category=useSelector(s=>s.product)
    const { t } = useTranslation('common');
    let currentColor=useSelector(s=>s.palette.currentColor)

    useEffect(()=> {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    },[])

        return (
            <header
                className="header header--1"
                data-sticky="true"
                id="headerSticky">
                <div className= {`header__top ${currentColor}`}>
                    <div className="ps-container">
                        <div className="header__left">
                            <Link href="/">
                                <a className="ps-logo">
                                    <div className="logo-div">
                                    <img
                                        src="/static/img/SpurtcommunityLOGO.png"
                                        alt="picco"
                                    /> 
                                    </div>
                                    
                                </a>
                            </Link>
                            <div className="menu--product-categories">
                                <div className="menu__toggle">
                                    <i className="icon-menu"></i>
                                    <span > {t('soc')}</span>
                                </div>
                                <div className="menu__content">
                                    <MenuCategories category={category.categories}/>
                                </div>
                            </div>
                        </div>
                        <div className="header__center">
                            <SearchHeader />
                        </div>
                        <div className="header__right">
                            <HeaderActions />
                        </div>
                    </div>
                </div>
                <NavigationDefault />
            </header>
        );
}

export default HeaderDefault;
