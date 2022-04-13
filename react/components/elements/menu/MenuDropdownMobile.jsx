/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { Component } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';

const { SubMenu } = Menu;

class MenuDropdownMobile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { menuData } = this.props;
        return (
            <SubMenu
                key="sub1"
                title={
                    menuData.type === 'dynamic' ? (
                        <Link
                            href={`${menuData.url}/[pid]`}
                            as={`${menuData.url}/${menuData.endPoint}`}>
                            <a>{menuData.text}</a>
                        </Link>
                    ) : (
                        <Link href={menuData.url} as={menuData.alias}>
                            <a>{menuData.text}</a>
                        </Link>
                    )
                }>
                {menuData.subMenu ? (
                    <ul className={menuData.subClass}>
                        {menuData.subMenu.map((subMenuItem, index) => (
                            <MenuDropdownMobile
                                menuData={subMenuItem}
                                key={index}
                            />
                        ))}
                    </ul>
                ) : (
                    ''
                )}
            </SubMenu>
            /*

            <li className={menuData.subMenu ? 'menu-item-has-children dropdown' : ''}>

                {menuData.type === 'dynamic' ? (
                    <Link href={`${menuData.url}/[pid]`} as={`${menuData.url}/${menuData.endPoint}`}>
                        <a>{menuData.text}</a>
                    </Link>
                ) : (
                    <Link href={menuData.url} as={menuData.alias}>
                        <a>{menuData.text}</a>
                    </Link>
                )}
                {menuData.subMenu ? (
                    <ul className={menuData.subClass}>
                        {menuData.subMenu.map((subMenuItem, index) => (
                            <MenuDropdownMobile menuData={subMenuItem} key={index}/>
                        ))}z
                    </ul>
                ) : (
                    ''
                )}
            </li>
            * */
        );
    }
}

export default MenuDropdownMobile;
