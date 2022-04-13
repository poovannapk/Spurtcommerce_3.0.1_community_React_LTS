/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { Component, useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Product from '../../elements/products/Product';
import ProductWide from '../../elements/products/ProductWide';
import { Pagination, Skeleton } from 'antd';
import { getProducts, getOrderBy } from '../../../store/product/action';
import { useState } from 'react';
import { imageUrl } from '../../../api/url';


function LayoutShop({data,count,setOffset,setInitialLoad,loader,setLimit,limit}){
    const [listView,setListView]=useState(true)
    const [currentPage,setCurrentPage]=useState(1)
    const products=data
    const total=""
    const viewMode = listView
    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)
    const dispatch=useDispatch()

    const handleChangeViewMode = (event) => {
        event.preventDefault();
        setListView(!listView)
    };

    const handlePagination=(value)=> {     
        setOffset(Math.ceil((value-1) * 12))
        setInitialLoad(true)
        executeScroll()
        setCurrentPage(value)
    }

    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   

    const sortFunction=(value)=>{
        setInitialLoad(true)
        dispatch(getOrderBy(value))

    }

    const onShowSizeChange=(current, pageSize)=> {
        setLimit(pageSize)
        setInitialLoad(true)
      }

        return (
            <div className="ps-shopping" ref={myRef}>
                <div className="ps-shopping__header" >
                    <p>
                        <strong className="mr-2">{count}</strong>
                        Products found
                    </p>
                    <div className="ps-shopping__actions">
                        <select
                            className="ps-select form-control"
                            data-placeholder="Sort Items" onChange={e=>sortFunction(e.target.value)}>
                            <option value={"ASC"}>Sort by price: low to high</option>
                            <option value={"DESC"}>Sort by price: high to low</option>
                        </select>
                        <div className="ps-shopping__view">
                            <p>View</p>
                            <ul className="ps-tab-list">
                                <li
                                    className={
                                        viewMode === true ? 'active' : ''
                                    }>
                                    <a
                                        href="#"
                                        onClick={handleChangeViewMode}>
                                        <i className="icon-grid"></i>
                                    </a>
                                </li>
                                <li
                                    className={
                                        viewMode !== true ? 'active' : ''
                                    }>
                                    <a
                                        href="#"
                                        onClick={handleChangeViewMode}>
                                        <i className="icon-list4"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {loader===false?<div className="ps-shopping__content">
                    {products.length!==0? <div>
                    {viewMode === true ? (
                        <div className="ps-shopping-product">
                            <div className="row">
                                {products && products.length > 0
                                    ? products&&products.map((item) => (
                                          <div
                                              className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6 "
                                              key={item.id}>
                                              <Product product={item} image={item.Images&&item.Images.containerName!=="/"? imageUrl+"?path="+item.Images.containerName+"&name="+item.Images.image+"&width=200&height=600": "/static/img/no-image.png"}/>
                                          </div>
                                      ))
                                    : ''}
                            </div>
                        </div>
                    ) : (
                        <div className="ps-shopping-product">
                            {products && products.length > 0
                                ? products&&products.map((item) => (
                                      <ProductWide
                                          product={item}
                                          key={item.productId}
                                          image={item.Images&&item.Images.containerName!=="/"? imageUrl+"?path="+item.Images.containerName+"&name="+item.Images.image+"&width=200&height=600": "/static/img/no-image.png"}
                                      />
                                  ))
                                : ''}
                        </div>
                    )}
                    <div className="ps-shopping__footer text-center pt-40">
                        <Pagination
                            current={currentPage}
                            total={count}
                            pageSize={limit}
                            pageSizeOptions={['10','12','15','20']}
                            showSizeChanger={true}
                            responsive={true}
                            defaultCurrent={1}
                            onChange={handlePagination}
                            onShowSizeChange={onShowSizeChange}

                        />
                    </div>
                    </div>:<center><p>No Results found</p></center>}
                </div>:<center><img src="/static/img/spurtloader.gif" width="100px"/></center>}
            </div>
        );
    
}

export default connect((state) => state.product)(LayoutShop);
