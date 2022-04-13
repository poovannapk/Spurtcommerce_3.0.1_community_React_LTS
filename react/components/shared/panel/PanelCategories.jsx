/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { Component } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import categories from '../../../public/static/data/static-categories.json';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const { SubMenu } = Menu;

function PanelCategories(){
    const [openKeys,setOpenKeys]=useState(['sub1'])
    let category=useSelector(s=>s.product)

    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    const onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(
            key => openKeys.indexOf(key) === -1
        );
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            // this.setState({ openKeys });
            setOpenKeys()
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
            // this.setState({
            //     openKeys: latestOpenKey ? [latestOpenKey] : [],
            // });
        }
    };

    // render() {
        return (
            <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={e=>onOpenChange(openKeys)}>
                    {console.log(category)}
                {category. categories.map(category => (
                    <Menu.Item key={category.id}>
                        <a href={`/shop?categoryId=${category.categorySlug}`}>
                            {category.name}
                        </a>
                    </Menu.Item>
                ))}
            </Menu>
        );
    // }
}

export default PanelCategories;
