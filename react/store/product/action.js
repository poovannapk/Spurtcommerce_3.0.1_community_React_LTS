/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export const actionTypes = {
    GET_PRODUCTS: 'GET_PRODUCTS',
    GET_PRODUCTS_SUCCESS: 'GET_PRODUCTS_SUCCESS',
    GET_PRODUCTS_ERROR: 'GET_PRODUCTS_ERROR',
    GET_ORDERBY:'GET_ORDERBY',
    GET_PRODUCTS_BY_CATEGORY: 'GET_PRODUCTS_BY_CATEGORY',
    GET_PRODUCTS_BY_PRICE_RANGE: 'GET_PRODUCTS_BY_PRICE_RANGE',
    GET_PRODUCTS_BY_BRAND: 'GET_PRODUCTS_BY_BRAND',
    GET_PRODUCTS_BY_KEYWORD: 'GET_PRODUCTS_BY_KEYWORD',
    GET_PRODUCTS_BY_KEYWORD_SUCCESS: 'GET_PRODUCTS_BY_KEYWORD_SUCCESS',

    GET_PRODUCT_BY_ID: 'GET_PRODUCT_BY_ID',
    GET_PRODUCT_BY_ID_SUCCESS: 'GET_PRODUCT_BY_ID_SUCCESS',
    GET_PRODUCT_LOADING:'GET_PRODUCT_LOADING',
    GET_TOTAL_OF_PRODUCTS: 'GET_TOTAL_OF_PRODUCTS',
    GET_TOTAL_OF_PRODUCTS_SUCCESS: 'GET_TOTAL_OF_PRODUCTS_SUCCESS',

    // GET_PRODUCT_PRICE:'GET_PRODUCT_PRICE',
    GET_BRANDS: 'GET_BRANDS',
    GET_BRANDS_SUCCESS: 'GET_BRANDS_SUCCESS',

    GET_PRODUCT_CATEGORIES: 'GET_PRODUCT_CATEGORIES',
    GET_PRODUCT_CATEGORIES_SUCCESS: 'GET_PRODUCT_CATEGORIES_SUCCESS',
};

export function getProducts(payload) {
    return { type: actionTypes.GET_PRODUCTS, payload:payload };
}

export function getTotalProducts(payload) {
    return { type: actionTypes.GET_TOTAL_OF_PRODUCTS, payload:payload };
}

export function getOrderBy(payload) {
    return { type: actionTypes.GET_ORDERBY, payload:payload };
}

// export function getProductsByPrice(payload){
//     return {type:actionTypes.GET_PRODUCT_PRICE,payload:payload}
// }

export function getBrands(payload) {
    return { type: actionTypes.GET_BRANDS,payload:payload };
}

export function getBrandsSuccess(payload) {
    return { type: actionTypes.GET_BRANDS_SUCCESS, payload };
}

export function getProductCategories(payload) {
    return { type: actionTypes.GET_PRODUCT_CATEGORIES,payload:payload };
}

export function getProductCategoriesSuccess(payload) {
    return { type: actionTypes.GET_PRODUCT_CATEGORIES_SUCCESS, payload };
}

export function getTotalProductsSuccess(payload) {
    return {
        type: actionTypes.GET_TOTAL_OF_PRODUCTS_SUCCESS,
        payload,
    };
}

export function getProductsSuccess(data) {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        data,
    };
}
export function getProductByKeywordsSuccess(payload) {
    return {
        type: actionTypes.GET_PRODUCTS_BY_KEYWORD_SUCCESS,
        payload,
    };
}

export function getSingleProductsSuccess(data) {
    return {
        type: actionTypes.GET_PRODUCT_BY_ID_SUCCESS,
        data,
    };
}

export function getProductsError(error) {
    return {
        type: actionTypes.GET_PRODUCTS_ERROR,
        error,
    };
}

export function getProductsByCategory(category) {
    return {
        type: actionTypes.GET_PRODUCTS_BY_CATEGORY,
        category,
    };
}

export function getProductsByBrand(payload) {
    return {
        type: actionTypes.GET_PRODUCTS_BY_BRAND,
        payload,
    };
}

export function getProductsByKeyword(keyword) {
    return {
        type: actionTypes.GET_PRODUCTS_BY_KEYWORD,
        keyword,
    };
}

export function getProductsById(payload) {
    return {
        type: actionTypes.GET_PRODUCT_BY_ID,
        payload:payload,
    };
}

export function getProductsByPrice(payload) {
    return {
        type: actionTypes.GET_PRODUCTS_BY_PRICE_RANGE,
        payload:payload,
    };
}

export function getProductByLoading(payload){
    return{
        type:actionTypes.GET_PRODUCT_LOADING,
        payload:payload,
    }
}
