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
import { connect } from 'react-redux';

const FooterWidgets = ({footerDet,footerPage}) => (
    <div className="ps-footer__widgets">
        {console.log(footerPage)}
        <div className="row col-lg-12 col-md-12 col-sm-12">
        <div class="flex col-lg-6 col-md-6 col-sm-12">
        <aside className="widget widget_footer">
            <h4 className="widget-title ">Quick links</h4>
            <ul className="ps-list--link">
                {footerPage&&footerPage.map((page)=>(
                    <li>
                       <Link href="/page-detail/[pdid]" as={`/page-detail/${page.pageId}`} key={page.pageId}>
                          <a>{page.title}</a>
                       </Link>
                    </li>
                ))}
                {/* <li>
                    <Link href="/page/blank">
                        <a>Policy</a>
                    </Link>
                </li>

                <li>
                    <Link href="/page/blank">
                        <a>Term & Condition</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/blank">
                        <a>Term & Condition</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/blank">
                        <a>Shipping</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/blank">
                        <a>Return</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/faqs">
                        <a>FAQs</a>
                    </Link>
                </li> */}
            </ul>
        </aside>
        </div>
        <div class="flex col-lg-6 col-md-6 col-sm-12" style={{justifyContent:"flex-end"}}>
        <aside className="widget widget_footer widget_contact-us">
            <h4 className="widget-title1">Contact us</h4>
            <div className="widget_content">
                <p>Call us 24/7</p>
                <h3>{footerDet.storeTelephone}</h3>
                <p>
                    {footerDet.storeAddress} <br />
                    <a href={"mailto:"+footerDet.storeEmail} target="_blank">{footerDet.storeEmail}</a>
                </p>
                <ul className="ps-list--social">
                    <li>
                        <a className="facebook" href={footerDet.facebook} target="_blank">
                            <i className="fa fa-facebook"></i>
                        </a>
                    </li>
                    <li>
                        <a className="twitter" href={footerDet.twitter} target="_blank">
                            <i className="fa fa-twitter"></i>
                        </a>
                    </li>
                    {/* <li>
                        <a className="google-plus" href="#">
                            <i className="fa fa-google-plus"></i>
                        </a>
                    </li> */}
                    <li>
                        <a className="instagram" href={footerDet.instagram} target="_blank">
                            <i className="fa fa-instagram"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
        </div>
        </div>
        
    </div>
);

const mapStateToProps=state=>{
    return state=state.setting
} 

export default connect(mapStateToProps) (FooterWidgets);
