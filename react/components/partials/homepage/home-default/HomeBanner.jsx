/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import Slider from 'react-slick';
import NextArrow from '../../../elements/carousel/NextArrow';
import PrevArrow from '../../../elements/carousel/PrevArrow';
import Link from 'next/link';
import { imageUrl } from '../../../../api/url';

function HomeBanner(data){

        const carouselSetting = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            autoplay: true,
            autoplaySpeed: 2000,
        };
        return (
            <div className="ps-home-banner ps-home-banner--1">
                <div className="ps-container"> 
                    <div className="ps-section__left">
                        <Slider {...carouselSetting} className="ps-carousel">
                            {data.data.map(product=>(
                                <div className="ps-banner" key={product.bannerId}>
                                <Link href="/shop">
                                    <a>
                                        <div className="home-banner-custom-img-contain">
                                        <img src={imageUrl+"?path="+product.imagePath+"&name="+product.image+"&width=1900&height=1000"}
                                            alt="martfury"
                                        >
                                            </img>
                                            </div>
                                    </a>
                                </Link>
                            </div>

                            ))}
                            
                        </Slider>
                    </div>
                    <div className="ps-section__right">
                        <Link href={{ pathname: '/shop', query: { name: 'leangchhean' }}}>
                            <a className="ps-collection">
                                <img
                                    src="/static/img/slider/home-1/promotion-1.jpg"
                                    alt="martfury"
                                />
                            </a>
                        </Link>
                        <Link href="/shop">
                            <a className="ps-collection">
                                <img
                                    src="/static/img/slider/home-1/promotion-2.jpg"
                                    alt="martfury"
                                />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        );
    
}

export default HomeBanner;
