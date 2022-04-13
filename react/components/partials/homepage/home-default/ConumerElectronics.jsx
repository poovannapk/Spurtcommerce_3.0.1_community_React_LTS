/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { Component,useState } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Slider from 'react-slick';
import Product from '../../../elements/products/Product';
import { getColletionBySlug } from '../../../../utilities/product-helper';
import { carouselFullwidth } from '../../../../utilities/carousel-helpers';
import { imageUrl } from '../../../../api/url';
import {useTranslation} from 'react-i18next';


function ConsumerElectronics({collections,collectionSlug,data}){

    const { t } = useTranslation('common');
        const products = getColletionBySlug(collections, collectionSlug);
    
        return (
            <div className="ps-product-list ps-garden-kitchen">              
                <div className="ps-container">
                    <div className="ps-section__header">
                      <h3>{t('featured')}</h3>
                    </div>
                    <div className="ps-section__content">
                            <Slider
                                {...carouselFullwidth}
                                className="ps-carousel outside">
                                {data&&data.map(product => (
                                    <div className="item" key={product.productId}>
                                        <Product product={product} image={product.Images&&product.Images.containerName!=="/"? imageUrl+"?path="+product.Images.containerName+"&name="+product.Images.image+"&width=300&height=200": "/static/img/no-image.png"}/>
                                    </div>
                                ))}
                            </Slider>
                    </div>
                </div>
            </div>
        );
    
}

export default connect(state => state.collection)(ConsumerElectronics);
