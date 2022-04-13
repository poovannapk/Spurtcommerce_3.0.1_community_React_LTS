/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { orderListApi } from '../../../api';
import { imageUrl } from '../../../api/url';
import  Router  from 'next/router';
import { logOut } from '../../../store/auth/action';
import OrderDate from './modules/DateOrder';
import { Pagination } from 'antd';



function MyOrder({currency}){
    const [orderData,setOrderData]=useState([])
    const [loadImg,setLoadImg]=useState(false)
    const [searchVal,setSearchVal]=useState("")
    const [imgLoadId,setImgLoadId]=useState("")
    const [fname,setFname]=useState("")
    const [orderLoader,setOrderLoader]=useState(true)
    const dispatch=useDispatch()
    const [cancel,setCancel]=useState(false)
    const [cancelReason,setCancelReason]=useState([])
    const [cancelId,setCancelId]=useState("")
    const [reload,setReload]=useState(0)
    const [limit,setLimit]=useState(5)
    const [currentPage,setCurrentPage]=useState(1)
    const [count,setCount]=useState("")
    const [offset,setOffset]=useState(0)
    const [userDetail,setUserDetail]=useState("")

    let currentColor=useSelector(s=>s.palette.currentColor)
    let currentValidColor = currentColor === null ? "normal" : currentColor

    
    useEffect(()=>{
        if(localStorage.getItem("spurtUser")){
            setUserDetail(JSON.parse(localStorage.getItem("spurtUser"))) 
            setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName)
            

        }
        
    },[])
 

    useEffect(()=>{
       setOrderLoader(true)
       setReload(0)
       orderListApi(limit,offset,setOrderData,searchVal,"",setOrderLoader,setCount)
       orderListApi(limit,offset,setOrderData,searchVal,1,setOrderLoader,setCount)
    },[searchVal,reload,offset,limit])

    const handleTrackOrder=(e,orderProductId)=>{
        console.log(orderProductId)
        Router.push("/order/[orderid]","/order/"+orderProductId)
 
    } 

    const handleOrderDetails=(e,orderProductId)=>{
        console.log(orderProductId)
        Router.push("/account/order/[orderdetail]","/account/order/"+orderProductId)
    }

    const handleLogout=(e)=>{
        e.preventDefault()
        localStorage.clear()
        dispatch(logOut())
        Router.push("/account/login")
    }

    const onShowSizeChange=(current, pageSize)=> {
        setLimit(pageSize)
      }

      const handlePagination=(value)=> {
        setOffset(Math.ceil((value-1) * 5))
        setCurrentPage(value)
    }

   

        const accountLinks = [
            {
                text: 'Account Information',
                url: '/account/user-information',
                icon: 'icon-user',
            },
            {
                text: 'My Order',
                url: '/account/orders',
                icon: 'icon-bag2',
                active: true,

            },
            {
                text: 'Wishlist',
                url: '/account/wishlist',
                icon: 'icon-heart',
            },
        ];  
        return (
            <section className="ps-my-account ps-page--account">
                {console.log(orderData)}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ps-section__left">
                                <aside className="ps-widget--account-dashboard">
                                    <div className="ps-widget__header">
                                    {userDetail && userDetail.avatarPath ? <img src={imageUrl+"?path="+userDetail.avatarPath+"&name="+userDetail.avatar}/>: userDetail && !userDetail.avatarPath&& <img src="/static/img/no-image-new.png" />}
                                        <figure>
                                            <figcaption>Hello</figcaption>
                                            <p>{fname}</p>
                                        </figure>
                                    </div>
                                    <div className="ps-widget__content">
                                        <ul>
                                            {accountLinks.map(link => (
                                                <li
                                                    key={link.text}
                                                    className={
                                                        link.active
                                                            ? `active ${currentValidColor}`
                                                            : ''
                                                    }>
                                                    <Link href={link.url}>
                                                        <a>
                                                            <i
                                                                className={
                                                                    link.icon
                                                                }></i>
                                                            {link.text}
                                                        </a>
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                    <a onClick={e=>handleLogout(e)} href="">
                                                        <i className="icon-power-switch"></i>
                                                        Logout
                                                    </a>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-section--account-setting">
                            <div className="ps-section__header">
                                        <h3>My Orders</h3>
                                    </div>
                                <div className="ps-section__content">
                                    <div className="row">
                                        <div className="col-md-12 col-24">
                                            {orderLoader===false?<div>
                                                {orderData&&orderData.length!==0? <div>
                                                
                                                    <div className="overall-custom-div">
                                                <div className="custom-div-container">
                                                    <div className="first-custom-orderdiv">
                                                        <h5>Orders</h5>
                                                    </div>
                                                    <div className="second-custom-orderdiv">
                                                        <h5>Date</h5>
                                                    </div>
                                                    <div className="second-custom-orderdiv">
                                                        <h5>Status</h5>
                                                    </div>
                                                    <div className="second-custom-orderdiv">
                                                        <h5>Total</h5>
                                                    </div>
                                                    <div className="second-custom-orderdiv">
                                                        <p>ORDER</p>
                                                    </div>
                                                </div>
                                                {orderData&&orderData.map((order,index)=>{
                                                return(<div className="sub-div-container">
                                                    <div className="first-custom-orderdiv">
                                                        <h5>{order && order.orderPrefixId}</h5>
                                                    </div>
                                                    <div className="second-custom-orderdiv">
                                                    <OrderDate dateCarry={order&&order.createdDate}/>
                                                    </div>
                                                    <div className="second-custom-orderdiv">
                                                        <h5>{order&&order.orderStatus.name}</h5>
                                                    </div>
                                                    <div className="second-custom-orderdiv">
                                                        <h5>$ {order&&order.total}</h5>
                                                    </div>
                                                    <div className="second-custom-orderdiv">
                                                        <button onClick={e=>handleOrderDetails(e,order.orderId)}>Order details</button>
                                                        
                                                    </div>
 
                                                </div>
                                                )
                                            })} 
                                            </div>
                                            <div className="ps-shopping__footer text-center pt-40">
                        <Pagination
                            current={currentPage}
                            total={count}
                            pageSize={limit}
                            pageSizeOptions={['5','10','15','20']}
                            showSizeChanger={true}
                            responsive={true}
                            defaultCurrent={1}
                            onChange={handlePagination}
                            onShowSizeChange={onShowSizeChange}

                        /></div>
                                                </div>:
                                                <div>No results found</div>}
                                                 

                                            </div>:<div className="ps-section__content">
                                    <center><img src="/static/img/spurtloader.gif" width="100px"/></center>
                                    </div>}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    
}

const mapStateToProps=state=>{
    return state.setting;

}

export default connect(mapStateToProps) (MyOrder);