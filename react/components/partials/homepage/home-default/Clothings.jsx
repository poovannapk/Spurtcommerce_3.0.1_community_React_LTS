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
import Slider from 'react-slick';
import Product from '../../../elements/products/Product';
import { carouselFullwidth } from '../../../../utilities/carousel-helpers';
import { getColletionBySlug } from '../../../../utilities/product-helper';
import { connect } from 'react-redux';
import { imageUrl } from '../../../../api/url';
import NextArrow from '../../../elements/carousel/NextArrow';
import PrevArrow from '../../../elements/carousel/PrevArrow';

function Clothings({data}){

    const carouselFull = {
        dots: false,
        infinite: true,
        speed: 750,
        slidesToShow: 7,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        // arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        lazyload: true,
        responsive: [
            {
                breakpoint: 1750,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,
                    arrows: true,

    
                },
            },
    
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    infinite: true,
                    arrows: true,

                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    arrows: true,

    
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: true,
                    arrows: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    arrows: true,

                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    arrows: true,

                },
            },
        ],
    };
        return (
            <div className="ps-product-list ps-garden-kitchen">
                <div className="ps-container">
                    <div className="ps-section__content">
                        {data.length > 0 ? (
                            <Slider
                                {...carouselFull}
                                className="ps-carousel outside">
                                {data.map(product => (
                                    <div className="item" key={product.manufacturerId.id}>
                    <center><img src={imageUrl+"?path="+product.imagePath+"&name="+product.image+"&height=300&width=300"} style={{height:"70px",width:"120px"}}/></center>
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <p>No products</p>
                        )}
                    </div>
                </div>
            </div>
        );
    
}

export default connect(state => state.collection)(Clothings);
