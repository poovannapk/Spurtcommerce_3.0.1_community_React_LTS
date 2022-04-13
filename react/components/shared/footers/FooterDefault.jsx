/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import FooterWidgets from './modules/FooterWidgets';
import FooterLinks from './modules/FooterLinks';
import FooterCopyright from './modules/FooterCopyright';

const FooterDefault = () => (
    <footer className="ps-footer">
        <div className="container">
            <FooterWidgets />
            <FooterCopyright />
        </div>
    </footer>
);

export default FooterDefault;
