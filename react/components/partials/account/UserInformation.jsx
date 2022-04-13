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
import { Form, Input, Radio, DatePicker } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import UserForm from './userForm';
import { editProfileApi } from '../../../api';
import  Router  from 'next/router';
import { EmailValidator } from '../../helper/emailValidator';
import { changePasswordApi } from '../../../api';
import { imageUrl } from '../../../api/url';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../store/auth/action';
import { useTranslation } from '../../../i18n'
import { colorThemeShow } from '../../helper/colorTheme';



function UserInformation(){
    const [userDetail,setUserDetail]=useState("")
    const [fname,setFname]=useState("")
    const [lname,setLname]=useState("")
    const [email,setEmail]=useState("")
    const [num,setNum]=useState("")
    const [mailValid,setMailValid]=useState("")
    const [submit,setSubmit]=useState(0)
    const [fnameError,setFnameError]=useState("")
    const [numError,setNumError]=useState("")
    const [oldPass,setOldPass]=useState("")
    const [newPass,setNewPass]=useState("")
    const [newPassError,setNewPassError]=useState("")
    const [oldPassError,setOldPassError]=useState("")
    const [passSubmit,setPassSubmit]=useState(0)
    const [newDp,setNewDp]=useState("")
    const [buttonLoader,setButtonLoader]=useState(false)
    const [passButtonLoader,setPassButtonLoader]=useState(false)
    const dispatch=useDispatch()
    const { t } = useTranslation('common');
    let currentColor=useSelector(s=>s.palette.currentColor)
    let currentValidColor = currentColor === null ? "normal" : currentColor

    useEffect(()=>{
        if(localStorage.getItem("spurtUser")){
            setUserDetail(JSON.parse(localStorage.getItem("spurtUser"))) 
            setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName)
            setLname(JSON.parse(localStorage.getItem("spurtUser")).lastName)
            setEmail(JSON.parse(localStorage.getItem("spurtUser")).email)
            setNum(JSON.parse(localStorage.getItem("spurtUser")).mobileNumber)

        }
        
    },[])

    const onChangeHandler=(name,value)=>{
        console.log(name,value)
        // switch (name) {
            //login form validators
            if(name==='fname')
                {
                    if(value===""){
                        setFnameError("*first name is required")
                        setFname(value) 

                    }
                    else{
                      setFname(value) 
                      setFnameError("")
                    }
                }

            if(name==='lname')
                {
                    setLname(value)
                }
            if(name==='num')
                {
                    setNum(value)
                    setNumError("")
                } 
            if(name==='email')
                {
                    if(EmailValidator(value)){
                        setEmail(value)
                        setMailValid("")

                        console.log("hey")
                    }
                    else{ 
                        setEmail(value)
                        setMailValid("*Please enter a valid email")
                    }
                }
}

    const handleLoginSubmit=()=>{
        setSubmit(1)
        if(fname===""||email===""||num===""){
            if(fname===""){
                setFnameError("*"+t('fname-req'))
            }
            if(num===""){
                setNumError("*"+t('phone-req'))
            }
        }
        else{
            setButtonLoader(true)
            editProfileApi(fname,lname!==undefined?lname:"",email,num,Router,newDp,setButtonLoader)
        }
        

    }

    const changeHandlerPassword=(name,value)=>{
        if(name==="oldPass"){
            if(value===""){
                setOldPassError("*Current password is required")
                setOldPass(value)
            }
            else{
                setOldPass(value)
                setOldPassError("")
            }
        }
        if(name==="newPass"){
            if(value===""){
                setNewPassError("*New password is required")
                setNewPass(value)

            }
            else{
                setNewPass(value)
                setNewPassError("")
            }
        }
    }

    const handlePassSubmit=()=>{
        setPassSubmit(1)
        if(newPass===""||newPass.length<5||oldPass===""||oldPass.length<5){
            if(newPass===""){
                setNewPassError("*New password is required")
            }
            if(newPass.length<5){
                setNewPassError("*Minimum 5 characters is required")
            }
            if(oldPass===""){
                setOldPassError("*Current password is required")
            }
            if(oldPass.length<5){
                setOldPassError("*Minimum 5 characters is required")
            }
        }
        else{
            setPassButtonLoader(true)
            changePasswordApi(oldPass,newPass,setPassButtonLoader)
        }
    } 

    const changeDP = (e) => {
		// setImageUrl(URL.createObjectURL(e.target.files[0]))
        const { files } = e.target;
        let reader = new FileReader()
		reader.readAsDataURL(files[0])
		// console.log(reader.readAsDataURL(files[0]))
        reader.onloadend = () => setNewDp(reader.result)

    }

    const handleLogout=(e)=>{
        e.preventDefault()
        localStorage.clear()
        dispatch(logOut())
        Router.push("/account/login")
    }

        const accountLinks = [
            {
                text: 'Account Information',
                url: '/account/user-information',
                icon: 'icon-user',
                active: true,
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
                                                {/* <Link href="/account/my-account"> */}
                                                    <a onClick={e=>handleLogout(e)} href="">
                                                        <i className="icon-power-switch"></i>
                                                        Logout
                                                    </a>
                                                {/* </Link> */}
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-page__content">
                                {/* <Form
                                    className="ps-form--account-setting"
                                    onFinish={e=>handleLoginSubmit()}> */}
                                    <div className="ps-form__header">
                                        <h3>{t('account-info')}</h3>
                                    </div>
                                    {/* {userDetail!==""? */}
                                    <aside className="ps-widget--custom-container">

                                    <div className="ps-widget__header-custom">
                                    {newDp==="" && userDetail && userDetail.avatarPath ? <img src={imageUrl+"?path="+userDetail.avatarPath+"&name="+userDetail.avatar} />: newDp===""&& userDetail && !userDetail.avatarPath&& <img src="/static/img/no-image-new.png" />}
                                        {newDp != "" && <img src={newDp} /> }
                                        <input type="file" onChange={changeDP}/>

                                    </div>
                                    </aside>
                                    {/* :<aside className="ps-widget--custom-container">

                                        <div className="ps-widget__header-custom">
                                            <img src={newDp === "" ? "/static/img/users/3.jpg" : newDp} />
                                            <input type="file" onChange={changeDP} />

                                        </div>
                                    </aside>} */}
                                    
                                    <div className="ps-form__content">
        <div className="form-group">
            {/* <Form.Item
                label="First Name"
                name="fname"
                rules={[
                    {
                        required: true,
                        message:
                            'Please input your first name!',
                    },
                ]}> */}
                <label>*{t('first-name')}:</label>
                <input
                    name="fname"
                    className="form-control"
                    type="text"
                    placeholder={t('enter-fname')}
                    onChange={e=>onChangeHandler(e.target.name,e.target.value)}
                    value={fname}
                />
               {submit===1&&fnameError!==""?<span className="error-span">{fnameError}</span>:""} 
            {/* </Form.Item> */}
        </div>
        <div className="form-group">
            {/* <Form.Item
                label="Last Name"
                name="lname"
                rules={[
                    {
                        required: false,
                        message:
                            'Please input your last name!',
                    },
                ]}> */}
                <label>{t('last-name')}:</label>
                <input
                    name="lname"
                    className="form-control"
                    type="text"
                    placeholder={t('enter-lname')}
                    onChange={e=>onChangeHandler(e.target.name,e.target.value)}
                    value={lname!==undefined?lname:""}
                />
            {/* </Form.Item> */}
        </div>
        <div className="row">
            <div className="col-sm-12">
                <div className="form-group">
                    {/* <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please input your number!',
                            },
                        ]}> */}
                        <label>*{t('phone-num')}:</label>
                        <input
                            name="num"
                            className="form-control"
                            type="number"
                            placeholder={t('enter-num')}
                            onChange={e=> e.target.value.length <= 15 && onChangeHandler(e.target.name,e.target.value)}
                            value={num}
                        />
                        {submit===1&&numError!==""?<span className="error-span">{numError}</span>:""}
                        
                    {/* </Form.Item> */}
                </div>
            </div>
            <div className="col-sm-12">
                <div className="form-group">
                    {/* <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please input your email!',
                            },
                        ]}> */}
                        <label>*{t('email-address')}:</label>
                        <input
                            className="form-control"
                            name="email"
                            type="email"
                            placeholder={t('enter-mail')}
                            onChange={e=>onChangeHandler(e.target.name,e.target.value)}
                            value={email}
                          
                        />
                        {submit===1&&mailValid!==""?<span className="error-span">{mailValid}</span>:""}
                    {/* </Form.Item>  */}
                </div> 

            </div>
        </div>
        {/* <div className="row">
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Birthday</label>
                    <DatePicker />
                </div>
            </div> */}
            {/* <div className="col-sm-6">
                <div className="form-group">
                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[
                            {
                                required: false,
                                message:
                                    'Please input your username!',
                            },
                        ]}>
                        <Radio.Group>
                            <Radio value="male">
                                Male
                            </Radio>
                            <Radio value="female">
                                Female
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
            </div> */}
        {/* </div> */}
        <div className="form-group submit">
            <button className={`ps-btn ${currentColor}`} onClick={e=>handleLoginSubmit()} disabled={buttonLoader===true?"disabled":""}>
                {t('update')}
                {buttonLoader===true && <img  src="/static/img/buttonLoaders.gif" alt="" style={{height:"30px",width:"30px",verticalAlign:"middle"}}/>}

            </button>
        </div>
        <div className="ps-form__header">
            <h3>Change Password</h3>
        </div>
        <div className="col-sm-12">
                <div className="form-group">
                    <label>*{t('current-password')} :</label>
                    <input className="form-control" type="password" name="oldPass" value={oldPass} onChange={e=>changeHandlerPassword(e.target.name,e.target.value)}/>
                    {passSubmit===1&&oldPassError!==""?<span className="error-span">{oldPassError}</span>:""}
                </div>
                <div className="form-group">
                    <label>*{t('new-password')} :</label>
                    <input className="form-control" name="newPass" type="password" value={newPass} onChange={e=>changeHandlerPassword(e.target.name,e.target.value)}/>
                    {passSubmit===1&&newPassError!==""?<span className="error-span">{newPassError}</span>:""}
                </div>
                <div className="form-group">
                 <button className={`ps-btn ${currentColor}`} type="button" onClick={e=>handlePassSubmit()} disabled={passButtonLoader===true?"disabled":""}>
                {t('update')}  
                {passButtonLoader===true && <img  src="/static/img/buttonLoaders.gif" alt="" style={{height:"30px",width:"30px",verticalAlign:"middle"}}/>}

            </button>
        </div>
        </div>
    </div>                                   
                                {/* </Form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    // }
}

export default (UserInformation)
