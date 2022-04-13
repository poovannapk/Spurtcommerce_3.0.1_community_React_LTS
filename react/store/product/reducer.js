/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { actionTypes } from './action';

export const initialState = {
    allProducts: null,
    singleProduct: {},
    error: false,
    totalProducts: 0,
    categories: [],
    brands: [],
    orderBy:"ASC",
    productsLoading: true,
    productLoading: true,
    searchResults: null,
    price:{priceMin: 0,
        priceMax: ""}
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_PRODUCTS:
            return {
                ...state,
                ...{ allProducts: action.payload },
            };
        case actionTypes.GET_PRODUCT_CATEGORIES:
            return {
                ...state,
                ...{ categories: action.payload },
            };
        case actionTypes.GET_PRODUCTS_BY_PRICE_RANGE:
            return {
                ...state,
                ...{ price: action.payload },
            };
        case actionTypes.GET_ORDERBY:
            return {
                ...state,
                ...{ orderBy: action.payload },
            };
        case actionTypes.GET_TOTAL_OF_PRODUCTS:
            return {
                ...state,
                ...{ totalProducts: action.payload },
            };
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                ...{ allProducts: action.data, productsLoading: false },
            };
        case actionTypes.GET_TOTAL_OF_PRODUCTS_SUCCESS:
            return {
                ...state,
                ...{ totalProducts: action.payload },
            };
        // case actionTypes.GET_BRANDS_SUCCESS:
        //     return {
        //         ...state,
        //         ...{ brands: action.payload },
        //     };
        case actionTypes.GET_BRANDS:
            return {
                ...state,
                ...{ brands: action.payload },
            };
        case actionTypes.GET_PRODUCT_CATEGORIES_SUCCESS:
            return {
                ...state,
                ...{ categories: action.payload },
            };
        case actionTypes.GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                ...{ singleProduct: action.data, productLoading: false },
            };
        case actionTypes.GET_PRODUCTS_BY_KEYWORD_SUCCESS:
            return {
                ...state,
                ...{ searchResults: action.payload },
            };

        case actionTypes.GET_PRODUCTS_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
        case actionTypes.GET_PRODUCT_BY_ID:
            return {
                ...state,
                ...{ singleProduct: action.payload },
                };
        case actionTypes.GET_PRODUCT_LOADING:
            return {
                ...state,
                ...{ productLoading: action.payload },
            };

        default:
            return state;
    }
}

export default reducer;
