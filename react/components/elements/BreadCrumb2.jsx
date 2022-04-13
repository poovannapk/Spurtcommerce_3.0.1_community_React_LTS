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

const BreadCrumb = ({ breacrumb }) => {
    return (
        <div className="ps-breadcrumb 2">
            <ul className="breadcrumb">
                {breacrumb&&breacrumb.map(item => {
                    if (!item.url) {
                        return <li key={item.text}>{item.text}</li>;
                    } else {
                        return (
                            <li key={item.text}>
                                <Link href={item.url}>
                                    <a>{item.text}</a>
                                </Link>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default BreadCrumb;
