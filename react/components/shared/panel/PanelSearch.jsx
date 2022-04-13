/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { Component } from 'react';
import { getProductsByKeyword } from '../../../store/product/action';
// import ProductResult from '../../elements/products/ProductSearchResult';
import { connect } from 'react-redux';
import Router from 'next/router'

class PanelSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPanel: false,
            searchProducts: [],
            keyword: '',
        };
    }

    searchByProductName = (keyword, object) => {
        let matches = [];
        let regexp = new RegExp(keyword.toLowerCase(), 'g');

        object.forEach((product) => {
            if (product.title.toLowerCase().match(regexp))
                matches.push(product);
        });

        return matches;
    };

    handleSubmit(e) {
        e.preventDefault();
        const keyword = this.state.keyword;
        Router.push(`/search?keyword=${keyword}`);
    }
    handleSearch(e) {
        e.preventDefault();
       const keyword = e.target.value;
             this.setState({
                searchPanel: true,
                keyword: e.target.value,
            });

        // const keyword = this.state.keyword;
        Router.push(`/shop?keyword=${keyword}`);
        // if (e.target.value !== '') {
        //     const keyword = e.target.value;
        //     this.props.dispatch(getProductsByKeyword(keyword));
        //     this.setState({
        //         searchPanel: true,
        //         keyword: e.target.value,
        //     });
        // } else {
        //     this.setState({ searchPanel: false, searchProducts: [] });
        // }
    }
    render() {
        const { searchProducts } = this.state;
        const { searchResults } = this.props;
        return (
            <div className="ps-panel__search-results">
                <form
                    className="ps-form--search-mobile"
                    action="/"
                    method="get">
                    <div className="form-group--nest">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search something..."
                            onChange={this.handleSearch.bind(this)}
                        />
                        <button>
                            <i className="icon-magnifier"></i>
                        </button>
                    </div>
                </form>
                {/* {searchResults &&
                    searchResults.map((product) => (
                        <ProductResult product={product} key={product.id} />
                    ))} */}
            </div>
        );
    }
}

export default connect((state) => state.product)(PanelSearch);
