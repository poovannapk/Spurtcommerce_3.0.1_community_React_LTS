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
import Router from 'next/router';
import { Form, Input } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserLogin } from '../../../api';



function Login(props){
    const dispatch=useDispatch()
    const [mail,setMail]=useState("")
    const [password,setPassword]=useState("")
    const [loginError,setLoginError]=useState("")
    const [loginType,setLoginType]=useState("normal")



    useEffect(()=>{
        if (props.isLoggedIn === true) {
            Router.push('/');
        }
    },[props])

  
 
    const handleLoginSubmit = e => {
        UserLogin(mail,password,loginType,Router,setLoginError,dispatch)
       
    };

      const validateMessages = {
        required: '${name} is required!',
        types: {
          email: 'Please enter a valid email',
        },
      };


      const validatePasswordMin=( rule,value, callback)=>{
        console.log(value)
      if (value&&value.length<5) {
          callback("Minimum 5 character is required");
        } else {
          callback();
        }

    }

        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        validateMessages={validateMessages}
                        onFinish={handleLoginSubmit}>
                        <ul className="ps-tab-list">
                            <li className="active">
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="sign-in">
                         {loginError!==""?<center><p style={{color:"red"}}>*{loginError}</p></center>:""}
                            <div className="ps-form__content">
                                <h5>Log In Your Account</h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="Email"
                                        rules={[
                                            {
                                                required: true,
                                                type:"email",
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
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your password!',
                                            },{ validator: validatePasswordMin }
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="Password..."
                                            value={password}
                                            onChange={e=>setPassword(e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <div className="ps-checkbox">
                                        <Link href="/account/forgot-password">
                                           <a>Forgot password</a>
                                        </Link>

                                    </div>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Login
                                    </button>
                                </div>
                            </div>
                            <div className="ps-form__footer">
                                
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );   
}
const mapStateToProps = state => {
    return state.auth;
};
export default connect(mapStateToProps)(Login);
