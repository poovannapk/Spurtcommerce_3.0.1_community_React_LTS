/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import Menu from '../../elements/menu/Menu';
import { useSelector, connect } from 'react-redux';
import { useTranslation } from '../../../i18n';

function NavigationDefault(props){
    let category=useSelector(s=>s.product)
    const { t } = useTranslation('common');
    let currentColor=useSelector(s=>s.palette.currentColor)
   const dataMap=[{title:"Home",link:'/'},{title:"Contact",link:'/page/contact-us'}]


        return (
            <nav className={`navigation ${currentColor}`}>
                <div className="ps-container">  
                    <div className="navigation__left">
                        <div className="menu--product-categories">
                            <div className="menu__toggle">
                                <i className="icon-menu"></i>
                                <span className={`${currentColor}`}>{t('soc')}</span>
                            </div>
                            <div className="menu__content">
                                <Menu
                                    data={category.categories}
                                    className="menu--dropdown"
                                    currentColor={currentColor}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="navigation__right">
                        <Menu
                            data={dataMap}
                            className="menu"
                            currentColor={currentColor}
                        />
                    </div>
                </div>
            </nav>
        );
}

export default connect(s=>s.setting) (NavigationDefault)
