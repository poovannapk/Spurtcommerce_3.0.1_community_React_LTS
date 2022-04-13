/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import Link from 'next/link';
import { logOut } from '../../../../store/auth/action';
import  Router  from 'next/router';
import { useTranslation } from '../../../../i18n'


function AccountQuickLinks(props){
const { t } = useTranslation('common');
const dispatch=useDispatch()

    const handleLogout = e => {
        e.preventDefault();
        localStorage.clear()
        dispatch(logOut());
        Router.push("/account/login")
    };

        const accountLinks = [
            {
                text: t('account-info'),
                url: '/account/user-information',
            },
            {
                text: 'My Orders',
                url: '/account/orders',
            },
            {
                text: t('wishlist'),
                url: '/account/wishlist',
            },
        ];
        const { isLoggedIn } = props;
        if (isLoggedIn === true) {
            return (
                <div className="ps-block--user-account">
                    <i className="icon-user"></i>
                    <div className="ps-block__content">
                        <ul className="ps-list--arrow">
                            {accountLinks.map(link => (
                                <li key={link.text}>
                                    <Link href={link.url}>
                                        <a>{link.text}</a>
                                    </Link>
                                </li>
                            ))}
                            <li className="ps-block__footer">
                                <a
                                    href="#"
                                    onClick={e=>handleLogout(e)}>
                                    {t('logout')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="ps-block--user-header">

                    <div className="ps-block__left">
                        <i className="icon-user"></i>
                    </div>
                    <div className="ps-block__right">
                        <Link href="/account/login">
                            <a>Login</a>
                        </Link>
                        <Link href="/account/register">
                            <a>Register</a>
                        </Link>
                    </div>
                </div>
            );
        }
    
}
const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps)(AccountQuickLinks);
