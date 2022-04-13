/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { Component } from 'react';
import Slider from 'react-slick';
import Product from '../../../components/elements/products/Product';
import { carouselFullwidth, carouselStandard } from '../../../utilities/carousel-helpers';
import { getColletionBySlug } from '../../../utilities/product-helper';
import { connect } from 'react-redux';
import NextArrow from '../../elements/carousel/NextArrow';
import PrevArrow from '../../elements/carousel/PrevArrow';
import { imageUrl } from '../../../api/url';

class RelatedProduct extends Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        const carouselStandard1 = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };
        const { boxed, layout } = this.props;
        const { collections, collectionSlug } = this.props;
        const products = getColletionBySlug(collections, collectionSlug);
        if (layout === 'fullwidth') {
            return (
                <div
                    className={`ps-section--default ps-related-products ${
                        boxed === true ? 'boxed' : ''
                    }`}>
                    <div className="ps-section__header">
                        {console.log(this.props.relatedProduct)}
                        <h3>Related products</h3>
                    </div>
                    <div className="ps-section__content">
                        <Slider {...carouselStandard1} infinite={this.props.relatedProduct.length < 7 ? false : true}
                                className="ps-carousel" >
                            {this.props.relatedProduct&&this.props.relatedProduct.map(item => {
                                return (
                                    <Product product={item} image={item.productImage&&item.productImage.containerName!=="/"? imageUrl+"?path="+item.productImage.containerName+"&name="+item.productImage.image+"&width=300&height=200": "/static/img/no-image.png"}/>
                                );
                            })} 
                        </Slider>
                    </div>
                </div>
            );
        } 
        else {
            return (
                <div
                    className={`ps-section--default ps-related-products ${
                        boxed === true ? 'boxed' : ''
                    }`}>
                    <div className="ps-section__header">

                        <h3>Related products</h3>
                    </div>
                    <div className="ps-section__content">
                        <Slider {...carouselStandard1} className="ps-carousel">
                            {products.map(product => {
                                return (
                                    <Product product={product} key={product.id}/>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            );
        }

    }
}

export default connect(state => state.collection)(RelatedProduct);
