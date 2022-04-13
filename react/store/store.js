/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { applyMiddleware, createStore } from 'redux';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import rootReducer from './rootReducer';
import { createWrapper } from 'next-redux-wrapper';


    const initialState = {};
    const middleware=[thunk];

const configureStore=createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default configureStore;

const makestore=()=>configureStore;
export const wrappers=createWrapper(makestore);


