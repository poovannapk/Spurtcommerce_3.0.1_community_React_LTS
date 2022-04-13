/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import NavigationDefault from '../navigation/NavigationDefault';
import HeaderActions from './modules/HeaderActions';
import MenuCategories from './modules/MenuCategories';
import SearchHeader from './modules/SearchHeader';
import { stickyHeader } from '../../../utilities/common-helpers';
import { imageUrl } from '../../../api/url';
import NextArrow from '../../elements/carousel/NextArrow';
import PrevArrow from '../../elements/carousel/PrevArrow';
import Slider from 'react-slick';
import { categoryListApi } from '../../../api/product/categoryListTree';

function HeaderProduct({productData,productSlug,productImage}){

    const dispatch=useDispatch()
    let category=useSelector(s=>s.product)
    let currentColor=useSelector(s=>s.palette.currentColor)


const carouselSetting = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow/>,
    prevArrow:<PrevArrow/>,
    arrows:false
};

useEffect(()=>{
    categoryListApi(dispatch)
},[])

    useEffect(()=>{
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    },[])


        return (
            <header
                className="header header--1 header--product"
                data-sticky="true"
                id="headerSticky">
                <div className={`header__top ${currentColor}`}>
                    <div className="ps-container">
                        <div className="header__left">
                            <Link href="/">
                                <a className="ps-logo">
                                <div className="logo-div">
                                    <img
                                        src="/static/img/SpurtcommunityLOGO.png"
                                        alt=""
                                    />
                                    </div>
                                </a>
                            </Link>
                            <div className="menu--product-categories">
                                <div className="menu__toggle">
                                    <i className="icon-menu"></i>
                                    <span> Shop by Department</span>
                                </div>
                                <div className="menu__content">
                                    <MenuCategories category={category.categories}/>
                                </div>
                            </div>
                        </div>
                        <div className="header__center">
                            <SearchHeader />
                        </div>
                        <div className="header__right">
                            <HeaderActions />
                        </div>
                    </div>
                </div>
                <NavigationDefault />
                <nav className="navigation navigation--product">
                    <div className="container">
                        <article className="ps-product--header-sticky">
                            <div className="ps-product__thumbnail">
                            <Slider {...carouselSetting} className="ps-carousel">
                            {productData&&productData.productImage&&productData.productImage.map((image,index)=>{
                                return(
                                    <div className="ps-banner">
                                <img src={imageUrl+"?path="+image.containerName+"&name="+image.image+"&width=1900&height=1000"}/>
                                 </div>

                                )

                            }) }
                            </Slider>
                            </div>
                            <div className="ps-product__wrapper">
                                <div className="ps-product__content">
                                    <Link
                                        href="/product/[pid]"
                                        as={`/product/${productData.productSlug}`}>
                                        <a className="ps-product__title">
                                            {productData.name}
                                        </a>
                                    </Link>
                                </div>
                                <div className="ps-product__shopping">
                                </div>
                            </div>
                        </article>
                    </div>
                </nav>
            </header>
        );

}
export default connect((state) => state.product)(HeaderProduct);
