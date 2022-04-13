/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import ThumbnailQuickView from './modules/thumbnail/ThumbnailQuickView';
import InformationQuickView from './modules/information/InformationQuickView';

const ProductDetailQuickView = ({ product,image,wishListStatus }) => (
    <div className="ps-product--detail ps-product--quickview">
        <div className="ps-product__header">
            <ThumbnailQuickView product={product} image={image}/>
            <InformationQuickView product={product} wishListStatus={wishListStatus}/>
        </div>
    </div>
);

export default ProductDetailQuickView;
