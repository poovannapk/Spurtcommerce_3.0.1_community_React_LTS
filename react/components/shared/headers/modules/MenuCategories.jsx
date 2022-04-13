/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import menuData from '../../../../public/static/data/menu';
import Menu from '../../../elements/menu/Menu';
const MenuCategories = ({category}) => (
    
    
    <Menu data={category} className="menu--dropdown"/>
); 

export default MenuCategories;
