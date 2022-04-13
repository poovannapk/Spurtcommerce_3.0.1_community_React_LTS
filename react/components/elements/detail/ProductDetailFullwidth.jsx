/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThumbnailDefault from './modules/thumbnail/ThumbnailDefault';
import InformationDefault from './modules/information/InformationDefault';
import DefaultDescription from './modules/description/DefaultDescription';

class ProductDetailFullwidth extends Component {
    constructor(props) {
        super(props);

       
    }

    
 
    render() {
       
        // console.log(res)
        const { singleProduct } = this.props.singleProduct;
        if (singleProduct !== null && typeof singleProduct !== 'Array') {
            return (
                <div className="ps-product--detail ps-product--fullwidth">
                    {console.log(this.res)}
                    <div className="ps-product__header">
                        <ThumbnailDefault product={this.props.singleProduct}/>
                        <InformationDefault product={this.props.singleProduct} setShowModal={this.props.setShowModal} setShowPriceModal={this.props.setShowPriceModal}/>
                    </div>
                    <DefaultDescription ratingInfo={this.props.ratingInfo} product={this.props.singleProduct}/>
                    </div> 
            );
        } else {
            return <p>No Data</p>;
        }
    }
}

const mapStateToProps = state => {
    return state.product;
};

export default connect(mapStateToProps)(ProductDetailFullwidth);
