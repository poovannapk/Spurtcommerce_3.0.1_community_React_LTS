/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import MobileHeaderActions from '../headers/modules/MobileHeaderActions';
import Link from 'next/link';

class HeaderMobileProduct extends React.Component {
    constructor(props) {
        super(props);
    }

    handleBackToPrevious = e => {
        e.preventDefault();
    };

    render() {
        return (
            <header
                className="header header--mobile header--mobile-product"
                data-sticky="true">
                <div className="navigation--mobile">
                    <div className="navigation__left">
                        <Link href="/shop">
                            <a
                                href="/"
                                className="header__back"
                            >
                                <i className="icon-chevron-left"></i>
                                <strong>Back to previous</strong>
                            </a>
                        </Link>

                    </div>
                    <div className="navigation__right">
                        <MobileHeaderActions />
                    </div>
                </div>
            </header>
        );
    }
}

export default HeaderMobileProduct;
