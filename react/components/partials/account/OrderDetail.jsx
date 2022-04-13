/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { Component } from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import  Router  from 'next/router';
import { imageUrl } from '../../../api/url';
import { logOut } from '../../../store/auth/action';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import moment from 'moment'

function OrderDetailFunc({orderDetailInfo,orderLoading,currency}){
    const [fname,setFname]=useState("")
    let currentColor=useSelector(s=>s.palette.currentColor)
    let companyData=useSelector(s=>s.setting)
    const dispatch=useDispatch() 
    const [loadImg,setLoadImg]=useState(false)
    const [userDetail,setUserDetail]=useState("")
    let pdf ;

    useEffect(()=>{
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        if(localStorage.getItem("spurtUser")){
            setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName)
            setUserDetail(JSON.parse(localStorage.getItem("spurtUser"))) 
        }
    },[])

    const handleLogout=(e)=>{
        e.preventDefault()
        localStorage.clear() 
        dispatch(logOut())
        Router.push("/account/login")
    }

    const generatePdf =()=> {
        let tableData={};
        tableData.widths = ['10%', '50%', '20%', '20%'];
        const item1 = orderDetailInfo.productList.map((item, index) => {
            return [
              index + 1,
              item.name,
              item.quantity,
              '$ ' + item.total
            ];
          });

          tableData.body = [
              [
                { alignment: 'center', text: 'S.no', style: 'tr' },
                { alignment: 'center', text: 'Products', style: 'tr' },
                { alignment: 'center', text: 'Qty', style: 'tr' },
                { alignment: 'center', text: 'Total Amount', style: 'tr' }
              ]
            ].concat(item1);

        const docDefinition = {
          content: [
            {
              margin: [0, 0, 0, 0],
    
              columns: [
                // {
                //   margin: [0, 30, 0, 0],
                //   width: '60%',
                //   stack: [
                //     {
                //       width: 180,
                //       height: 60,
                //       image: "this.postImage"
                //     }
                //   ]
                // },
                {
                  alignment: 'left',
                  width: '40%',
                  stack: [
                    { style: 'h1', text: 'INVOICE' },
                    { style: 'h2', text: '' },
                    { style: 'h2', text: companyData.footerDet.storeAddress },
                    { style: 'h2', text: companyData.footerDet.storeTelephone },
                    { style: 'h2', text: companyData.footerDet.storeEmail }
                  ]
                }
              ]
            },
            '\n', // optional space between columns
    
            {
              canvas: [
                {
                  color: '#D3D3D3',
                  type: 'line',
                  x1: 0,
                  y1: 5,
                  x2: 595 - 2 * 40,
                  y2: 5,
                  lineWidth: 0.5
                }
              ]
            },
            '\n',
            {
              columns: [
                {
                  width: '25%',
                  stack: [
                    { style: 'shipping', text: 'Shipping address' },
                    { style: 'h2', text: '' },
                    { style: 'h2', text: orderDetailInfo.shippingCompany },
                    { style: 'h2', text: orderDetailInfo.shippingAddress1 },
                    { style: 'h2', text: orderDetailInfo.shippingAddress2 },
                    { style: 'h2', text: orderDetailInfo.shippingCity },
                    { style: 'h2', text: orderDetailInfo.shippingZone },
                    { style: 'h2', text: orderDetailInfo.telephone }
                  ]
                },
                {
                  width: '25%',
                  stack: [
                    { style: 'billing', text: 'Billing address' },
                    { style: 'h2', text: '' },
                    { style: 'h2', text: orderDetailInfo.shippingCompany },
                    { style: 'h2', text: orderDetailInfo.shippingAddress1 },
                    { style: 'h2', text: orderDetailInfo.shippingAddress2 },
                    { style: 'h2', text: orderDetailInfo.shippingCity },
                    { style: 'h2', text: orderDetailInfo.shippingZone },
                    { style: 'h2', text: orderDetailInfo.telephone }
                  ]
                },
                {
                  width: '20%',
                  margin: [40, 0, 0, 0],
                  stack: [
                    { style: 'detail', text: 'Invoice ID' },
                    { style: 'h2', text: '' },
                    { style: 'h2', text: 'Issue Date' },
                    { style: 'h2', text: '' }
                  ]
                },
                {
                  width: '20%',
                  stack: [
                    { style: 'invoice_d', text: orderDetailInfo.invoiceNo },
                    { style: 'h2', text: '' },
                    {
                      style: 'invoice',
                      text: moment(orderDetailInfo.createdDate).format('DD MMM, YYYY')
                    }
                  ]
                }
              ]
            },
            '\n',
            {
              canvas: [
                {
                  color: '#D3D3D3',
                  type: 'line',
                  x1: 0,
                  y1: 5,
                  x2: 595 - 2 * 40,
                  y2: 5,
                  lineWidth: 0.5
                }
              ]
            },
            '\n',
            {
              text: 'Order Details',
              style: 'order'
            },
            '\n',
            {
              alignment: 'center',
              table: tableData
            },
            '\n',
            {
              columns: [
                {
                  width: '80%',
                  alignment: 'right',
                  stack: [{ style: 'h2', text: 'Total Amount' }]
                },
                {
                  width: '13%',
                  alignment: 'right',
                  stack: [
                    {
                      style: 'h2',
                      text: '$ ' + orderDetailInfo.total
                    }
                  ]
                }
              ]
            }
          ],
          footer: [
            {
              margin: [0, 0, 0, 10],
              table: {
                body: [
                  [
                    {
                      border: [false, false, false, false],
                      text: ' ',
                      style: 'note'
                    }
                  ],
                  [
                    {
                      border: [false, false, false, false],
                      text: '',
                      style: 'content',
                      margin: [0, 0, 0, 0]
                    }
                  ]
                ]
              }
            }
          ],
          styles: {
            h1: {
              margin: [0, 10, 0, 0],
              fontSize: 16,
              bold: true
            },
            detail: {
              margin: [0, 10, 0, 0],
              fontSize: 12,
              bold: false
            },
            shipping: {
              margin: [0, 10, 0, 0],
              fontSize: 12,
              bold: true
            },
            billing: {
              margin: [0, 10, 0, 0],
              fontSize: 12,
              bold: true
    
            },
            h2: {
              margin: [0, 5, 0, 0],
              fontSize: 12,
              bold: false,
            },
            invoice: {
              margin: [0, 5, 0, 0],
              fontSize: 12,
              bold: true
            },
            invoice_d: {
              margin: [0, 10, 0, 0],
              fontSize: 12,
              bold: true
            },
            order: {
              margin: [0, 0, 0, 0],
              fontSize: 12,
              bold: true
            },
            total: {
              margin: [0, 5, 0, 0],
              fontSize: 10,
              bold: true
            },
            note: {
              margin: [0, 0, 0, 0],
              bold: true
            },
            content: {
              margin: [0, 0, 0, 0],
              bold: false,
              fontSize: 10
            },
            th: {
              margin: [0, 10, 0, 0],
              bold: false,
              fontSize: 10
            },
            td: {
              margin: [0, 10, 0, 0],
              bold: false,
              fontSize: 10
            }
          }
        };
        pdf = pdfMake;
        pdf.createPdf(docDefinition).download('invoice');
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
            },
            {
                text: 'Wishlist',
                url: '/account/wishlist',
                icon: 'icon-heart',
            },
        ];
        return (
            <section className="ps-my-account ps-page--account">
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
                                                            ? 'active'
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
                                <div className="ps-section__content">
                                    <div className="row">                                                                  
                                            <div className="col-md-12 col-24">
                                            <figure className="ps-block--address">
                                                <figcaption>
                                                    Order Details
                                                </figcaption>
                                                {orderLoading===false?<div className="ps-block__content" id="orderinvoice"> 
                                                    <div className="order-detail-position-container diff-flex">
                                                        <div className="order-detail-position-left ">
                                                            <h4>Shipping Address</h4>
                                                            <h5>{orderDetailInfo.shippingAddress1},{orderDetailInfo.shippingAddress2}</h5>
                                                            <p>{orderDetailInfo.shippingCity}</p>
                                                            <p>{orderDetailInfo.shippingPostcode}</p>
                                                        </div>
                                                    <div  className="order-detail-position-right">
                                                        <h4>Order Summary</h4>
                                                        <p className="diff-flex right-para-custom">
                                                            <span>Invoice No.:</span>{orderDetailInfo.invoiceNo}
                                                        </p>
                                                        <p className="diff-flex right-para-custom">
                                                            <span>Order Id:</span>{orderDetailInfo.orderPrefixId}
                                                        </p>
                                                        <p className="diff-flex right-para-custom right-para-weight">
                                                            <span style={{fontWeight: "700"}}>Total Amount:</span>{'$ '}{orderDetailInfo.total}
                                                        </p>
 
                                                    </div>

                                                    </div> 
                                                    <div className="itemlistordercotainer">
                                                        <h3>Item List</h3>
                                                        <table className="itemOrderTable">
                                                            <tbody>
                                                                <tr>
                                                                    <th style={{width:"40%"}} className="ordertableHeador">Products</th>
                                                                    <th style={{width:"20%"}} className="ordertableHeador">Price</th>
                                                                    <th style={{width:"20%"}} className="ordertableHeador">Qty</th>
                                                                    <th style={{width:"20%"}} className="ordertableHeador">Total</th>
                                                                </tr>
                                                                {orderDetailInfo.productList.map((orderDetail)=>(
                                                                  <tr>
                                                                    <td style={{width:"40%"}} className="orderpadding">{orderDetail.name}</td>
                                                                    <td style={{width:"20%"}} className="orderpadding">$ {orderDetail.productPrice}	</td>
                                                                    <td style={{width:"20%"}} className="orderpadding">{orderDetail.quantity}</td>
                                                                    <td style={{width:"20%"}} className="orderpadding">$ {orderDetail.total}</td>
                                                                  </tr>
                                                                ))}
                                                            </tbody>

                                                        </table>

                                                    </div>
                                                    <div className="orderder-button-container">
                                                        <Link href="/account/orders">
                                                          <a>Back</a>
                                                        </Link>                                                        
                                                        <a className='orderDownloadInvoice' onClick={e =>generatePdf()}>Download Invoice</a>
                                                    </div>                                            
                                                </div>
                                                :<div className="ps-block__content">
                                                <center><img src="/static/img/spurtloader.gif" width="100px"/></center>
                                                    </div>}                                                
                                            </figure>
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

export default connect(mapStateToProps)(OrderDetailFunc);
