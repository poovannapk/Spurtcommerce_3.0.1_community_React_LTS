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
    collections: [],
    categories: [],
    collection: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_COLLECTIONS_SUCCESS:
            return {
                ...state,
                ...{ collections: action.payload },
            };
        case actionTypes.GET_COLLECTION_SUCCESS:
            return {
                ...state,
                ...{ collection: action.payload },
            };
            case actionTypes.GET_COLLECTIONS:
                return {
                    ...state,
                    ...{ collections: action.payload },
                };
                case actionTypes.GET_COLLECTION:
                    return {
                        ...state,
                        ...{ collection: action.payload },
                    };        
        case actionTypes.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                ...{ categories: action.payload },
            };
        default:
            return state;
    }
}

export default reducer;
