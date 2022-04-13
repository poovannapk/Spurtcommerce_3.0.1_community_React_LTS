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

import MegaMenu from './MegaMenu';
import MenuDropdown from './MenuDropdown';

 
const Menu = ({ data, className,currentColor }) => (
    <ul className={className}>
        {data &&
            data.map(item => {
                // console.log(data)

                if(item.title!=="Services"&&item.title!==undefined){
                    return <MenuDropdown menuData={item} key={item.title} currentColor={currentColor}/>;

                }
 
                else 
                if (item.title==="Services") {
                    return <MenuDropdown menuData={item} key={item.text} />;

                    // <MenuDropdown menuData={item} key={item.text} />;
                }
                
                else {
                    return <MegaMenu menuData={item} key={item.categoryId} currentColor={currentColor}/>;

                } 
            })}
    </ul>
);

export default Menu;
