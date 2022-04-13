/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { carouselFullwidth } from '../../../../utilities/carousel-helpers';
import { getColletionBySlug } from '../../../../utilities/product-helper';
import { imageUrl } from '../../../../api/url';
import {useTranslation} from 'react-i18next';
import Product from '../../../elements/products/Product';


function HomeDefaultDealOfDay({collections,collectionSlug,data}){
        const {t} = useTranslation('common');
        const products =getColletionBySlug(collections, collectionSlug);
        return (
            <div className="ps-product-list ps-garden-kitchen">
                <div className="ps-container">
                    <div className="ps-section__header">
                        <h3>{t('deal')}</h3>
                    </div>
                    <div className="ps-section__content">
                        
                        <Slider
                            {...carouselFullwidth}
                            className="ps-carousel outside">
                            {data&&data.map(product => (
                               <div className="item" key={product.productId}>
                               <Product product={product} image={imageUrl+"?path="+product.productImage.containerName+"&name="+product.productImage.image+"&width=300&height=200"}/>
                           </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        );
        
    
}

export default connect(state => state.collection)(HomeDefaultDealOfDay);

HomeDefaultDealOfDay.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});
