/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { Component, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../../../store/auth/action';

import { Form, Input } from 'antd';
import { connect } from 'react-redux';
import { useState } from 'react';
import { UserRegister } from '../../../api';
import {EmailValidator} from '../../helper/emailValidator';

function Register(auth){

    const [name,setName]=useState("")
    const [mail,setMail]=useState("")
    const [pass,setpass]=useState("")
    const [cpass,setCpass]=useState("")
    const [number,setNumber]=useState("")
    const [nameError,setNameError]=useState("")
    const [mailError,setMailError]=useState("")
    const [passError,setPassError]=useState("")
    const [cpassError,setCpassError]=useState("")
    const [numError,setNumError]=useState("")
    const [submit,setSubmit]=useState(0)

    const handleSubmit = e => {
        // e.preventDefault();
        console.log(name)
        setSubmit(1)
        validate()
        if(nameError==="" && mailError==="" && passError==="" && cpassError==="" && numError==="") {
            UserRegister(name,mail,pass,cpass,number,Router)
        }
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         this.props.dispatch(login());
        //         Router.push('/account/login');
        //     } else {
        //     }
        // });
    };
    const validateMessages = {
        required: '${name} is required!',
        types: {
          email: 'Please enter a valid email',
        //   number: '${label} is not a validate number!',
        },
        // number: {
        //   range: '${label} must be between ${min} and ${max}',
        // },
      };

      const validatePassword = (rule, value, callback) => {
        console.log(value)

        if (value && value !== pass) {
          callback("Doesn't match with password");
        } else {
          callback();
        }
      };

      const validatePasswordMin=( rule,value, callback)=>{
          console.log(value)
        if (value&&value.length<5) {
            callback("Minimum 5 character is required");
          } else {
            callback();
          }

      }

      const validate = () =>{
          if(name===""){
            setNameError("Name is required!")
          }
          else {
              setNameError("")
          }

          if(mail===""){
            setMailError("Mail is required!")
          }
          else{
              if(EmailValidator(mail)){
                  setMailError("")
              }
              else {
                  setMailError("Invalid email")
              }
          }
          if(pass === ""){
              setPassError("Password is required!")
          }
          else if(pass.length < 5 ){
              setPassError("Minimum 5 characters is required")
          }
          else{
              setPassError("")
          }

          if(cpass === "") {
              setCpassError("Confirm password is required")
          }
          else if(cpass !== pass) {
              setCpassError("Doesn't match with password")
          }
          else{
              setCpassError("")
          }

          if(number === ""){
              setNumError("Number is required!")
          }
          else{
              setNumError("")
          }
      }

      useEffect(()=>{
          if(submit){
              validate()
          }
      },[name,mail,number,pass,cpass])



        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        validateMessages={validateMessages}
                        onFinish={handleSubmit}>

                        <ul className="ps-tab-list">
                            <li>
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li className="active">
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5>Register An Account</h5>
                                {/* <div className="form-group">
                                    <Form.Item
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Name is required!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Full name"
                                            value={name}
                                            onChange={e=>setName(e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
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
                                            value={pass}
                                            onChange={e=>setpass(e.target.value)}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="confirm password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input confirm password!',
                                            },{ validator: validatePassword }
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="Confirm Password..."
                                            value={cpass}
                                            onChange={e=>setCpass(e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="phone"
                                        rules={[
                                            {
                                                required: false,
                                                message:
                                                    'Please input your name!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="number"
                                            placeholder="Phone Number"
                                            value={number}
                                            onChange={e=>setNumber(e.target.value)}
                                        />
                                    </Form.Item>
                                </div> */}
                                <div className={"form-group"}>
                        {/* <label>
                            State <sup>*</sup>
                        </label> */}
                        <input type="text" placeholder="Full name" className="form-control" value={name} onChange={e=>setName(e.target.value)}/>
                        {nameError!==""?<span className="error-span">{nameError}</span>:""}
                    </div>
                    <div className={"form-group"}>
                        {/* <label>
                            State <sup>*</sup>
                        </label> */}
                        <input type="text" placeholder="Email address" className="form-control" value={mail} onChange={e=>setMail(e.target.value)}/>
                        {mailError!==""?<span className="error-span">{mailError}</span>:""}
                    </div>
                    <div className={"form-group"}>
                        {/* <label>
                            State <sup>*</sup>
                        </label> */}
                        <input type="password" placeholder="Password..." className="form-control" value={pass} onChange={e=>setpass(e.target.value)}/>
                        {passError!==""?<span className="error-span">{passError}</span>:""}
                    </div>
                    <div className={"form-group"}>
                        {/* <label>
                            State <sup>*</sup>
                        </label> */}
                        <input type="password" placeholder="Confirm Password..." className="form-control" value={cpass} onChange={e=>setCpass(e.target.value)}/>
                        {cpassError!==""?<span className="error-span">{cpassError}</span>:""}
                    </div>
                    <div className={"form-group"}>
                        {/* <label>
                            State <sup>*</sup>
                        </label> */}
                        <input type="number" placeholder="Phone Number" className="form-control" value={number} onChange={e =>e.target.value.length <= 15 && setNumber(e.target.value)}/>
                        {numError!==""?<span className="error-span">{numError}</span>:""}
                    </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Register
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
export default connect(mapStateToProps)(Register);
