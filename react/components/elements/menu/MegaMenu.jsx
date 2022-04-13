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

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { menuData } = this.props;
        return (
            <li
                className={
                   'menu-item-has-children has-mega-menu'
                       
                }>
                    {console.log(menuData)}
                {/* {menuData.type === 'dynamic' ? ( */}
                    <Link
                         href={{ pathname: '/shop', query: { categoryId: menuData.categoryId } }}
                        // as={`${menuData.url}/${menuData.endPoint}`}
                        >
                        <a>{menuData.name}</a>
                    </Link>
                {/* ) : (
                    <Link href={'/shop'} 
                    // as={menuData.url}
                    >
                        <a>{menuData.name}</a>
                    </Link>
                )} */}
                <div className="mega-menu">
                    {menuData &&
                        menuData.children.map(megaItem => (
                            <div
                                className="mega-menu__column"
                                key={megaItem.name}>
                                <h4>{megaItem.name}</h4>
                                <ul className="mega-menu__list">
                                    {megaItem.children.map(megaSubItem => (
                                        <li key={megaSubItem.name}>
                                            {megaSubItem.type === 'dynamic' ? (
                                                <Link
                                                    href={{ pathname: '/shop', query: { categoryId: megaSubItem.categorySlug } }}
                                                    // as={`${megaSubItem.url}/${megaSubItem.endPoint}`}
                                                    >
                                                    <a>{megaSubItem.name}</a>
                                                </Link>
                                            ) : (
                                                <Link
                                                href={{ pathname: '/shop', query: { categoryId: megaSubItem.categorySlug } }}                                                    // as={megaSubItem.url}
                                                    >
                                                    <a>{megaSubItem.name}</a>
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                </div>
            </li>
        );
    }
}

export default Menu;
