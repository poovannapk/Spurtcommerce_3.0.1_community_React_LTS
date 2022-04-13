/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export const actionTypes = {
    GET_COLLECTIONS: 'GET_COLLECTIONS',
    GET_COLLECTIONS_SUCCESS: 'GET_COLLECTIONS_SUCCESS',

    GET_COLLECTION: 'GET_COLLECTION',
    GET_COLLECTION_SUCCESS: 'GET_COLLECTION_SUCCESS',

    GET_CATEGORIES: 'GET_CATEGORIES',
    GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
};

export function getCollections(payload) {
    return { type: actionTypes.GET_COLLECTION, payload:payload };
}



export function getCollectionsSuccess(payload) {
    return {
        type: actionTypes.GET_COLLECTIONS_SUCCESS,
        payload,
    };
}

export function getCategories(payload) {
    return { type: actionTypes.GET_CATEGORIES, payload };
}

export function getCategoriesSuccess(payload) {
    return {
        type: actionTypes.GET_CATEGORIES_SUCCESS,
        payload,
    };
}

export function getCollection(payload) {
    return { type: actionTypes.GET_COLLECTIONS, payload:payload };
}

export function getCollectionSuccess(payload) {
    return {
        type: actionTypes.GET_COLLECTIONS_SUCCESS,
        payload,
    };
}
