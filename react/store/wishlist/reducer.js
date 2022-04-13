/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { actionTypes } from './action';

export const initState = {
    wishlistItems: [],
    wishlistTotal: 0,
    addwishlist:"",
    wishLoad:true
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_WISHLIST_LIST:
            return {
                ...state,
                ...{  wishlistItems: action.payload  }
                };
        case actionTypes.GET_WISHLIST_LIST_SUCCESS:
            return {
                ...state,
            };
        case actionTypes.UPDATE_WISHLISH_LIST_SUCCESS:
            return {
                ...state,
                ...{
                    wishlistItems: action.payload.wishlistItems,
                    wishlistTotal: action.payload.wishlistTotal,
                },
            }; 
        case actionTypes.GET_WISHLIST_LIST_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
            case actionTypes.ADD_ITEM_WISHLISH:
                return {
                    ...state,
                    ...{ addwishlist: action.payload },
                }; 
                
        case actionTypes.WISHLIST_LOADING:
            return {
                ...state,
                ...{ wishLoad: action.payload },
                };
        default:
            return state;
    } 
}

export default reducer;
