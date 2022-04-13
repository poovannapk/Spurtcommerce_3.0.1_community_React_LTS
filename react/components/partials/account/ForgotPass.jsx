/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import { Form, Input } from 'antd';
import { useState } from 'react';
import {forgotApi} from '../../../api/auth/forgotPassword'
import  Router  from "next/router";


function ForgotPassword(){
    const [mail,setMail]=useState("")

    const validateMessages = {
        // required: '${name} is required!',
        // types: {
        //   email: 'Please enter a valid email',
        // },
      };

    const handleSubmit=()=>{    
        forgotApi(mail,Router)

    }

    return(
        <div className="ps-order-tracking">
        <div className="container">
            <div className="ps-section__header">
                <h3>Forgot Password</h3>
                <p>
                    Please enter the mail that you used sign in.
                </p>
            </div>
            
            <div className="ps-section__content">
            <Form className="ps-form--account"

            
                        validateMessages={validateMessages}
                        onFinish={handleSubmit}
                        >
                    {/* <div className="form-group">
                        <label>Order ID</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Found in your order confimation email"
                        />
                    </div> */}
                    <div className="form-group">
                    <label>Email</label>
                                    <Form.Item
                                        name="Email"
                                        rules={[
                                            {
                                                required: true,
                                                type:"email",
                                                // message:
                                                //     'Please input your email!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="email"    
                                            placeholder="Email address"
                                            value={mail}
                                            onChange={e=>setMail(e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                    {/* <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" type="text" placeholder="" />
                    </div> */}
                    <div className="form-group submit">
                        <button className="ps-btn ps-btn--fullwidth"  type="submit">Submit</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
    )
}

export default ForgotPassword;
