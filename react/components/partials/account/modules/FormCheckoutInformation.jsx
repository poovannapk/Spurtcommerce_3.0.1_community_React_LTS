/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { Component, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input } from 'antd';
import { useState } from 'react';
import {notification } from 'antd';
import { useTranslation } from '../../../../i18n'
import { colorThemeShow } from '../../../helper/colorTheme';
import OptionNameDisplay from '../../../shared/headers/modules/optionNamePar';
import { countryListApi } from '../../../../api/account/country';
import Select from 'react-select';
import {EmailValidator} from '../../../helper/emailValidator';
import {checkOutApi} from '../../../../api';

function FormCheckoutInformation({cartItems,amount,productDetail,addressData,isLoggedIn}){
    const [fname,setFname]=useState("")
    const [lname,setLname]=useState("")
    const [email,setEmail]=useState("")
    const [address,setAddress]=useState("")
    const [address1,setAddress1]=useState("")
    const [city,setCity]=useState("")
    const [postCode,setPostCode]=useState("")
    const [num,setNum]=useState("")
    const [addressCheck,setAddressCheck]=useState(0)
    const { t } = useTranslation('common');
    let currentColor=useSelector(s=>s.palette.currentColor)
    const [countryId,setCountryId]=useState("")
    const [countryData,setCountryData]=useState([])
    const [countryName,setCountryName] = useState("")
    const [countryIdError,setCountryIdError]=useState("")
    const [fields, setFields] = useState([
        {
          name: ['fname'],
          value: 'Ant Design',
        },
      ]);
    const [fnameError,setFnameError] =useState("")
    const [numError,setNumError]=useState("")
    const [emailError,setEmailError] = useState("")
    const [addressError,setAddressError] =useState("")
    const [cityError,setCityError] =useState("")
    const [postalError,setPostalError]=useState("")
    const [countryError,setCountryError]=useState("")
    const [submit,setSubmit]=useState(0)
    let arrayComp=[]
   
        if(countryData!==[]){
            var len = countryData.length;
            for (var i = 0; i < len; i++) {
                arrayComp.push({
                    value: countryData[i].countryId,
                    label: countryData[i].name,
                });
            }
        }

    useEffect(()=>{
        apiCallFunc()
        if(localStorage.getItem("spurtUser")){
                setFname(JSON.parse(localStorage.getItem("spurtUser")).firstName),
                setEmail(JSON.parse(localStorage.getItem("spurtUser")).email),
                setNum(JSON.parse(localStorage.getItem("spurtUser")).mobileNumber)
                setLname(JSON.parse(localStorage.getItem("spurtUser")).lastName)
        }
        if(localStorage.getItem("contact")){
            setAddress(JSON.parse(localStorage.getItem("contact")).address)
            setCity(JSON.parse(localStorage.getItem("contact")).city)
            setPostCode(JSON.parse(localStorage.getItem("contact")).postCode)
            setCountryId(JSON.parse(localStorage.getItem("contact")).countryId)
            setCountryName(JSON.parse(localStorage.getItem("contact")).countryName)
        }
    },[])

    useEffect(()=>{
        if(submit) {
            validate()
        }    
    },[fname,email,num,address,city,countryName,postCode])

    const apiCallFunc=()=>{
        countryListApi(setCountryData)
    }

    const colourStyles = {
        control: (styles,state) => ({ ...styles, backgroundColor: state.isFocused ?'#fff':'transparent', color: "#495057",
        // border: "1px solid",
        borderRadius: "0",height: "50px",
        boxShadow: state.isFocused ? 0 : 0,
        borderColor: state.isFocused
        ? "#fcb800"
        : "#ced4da",
        '&:hover': { borderColor: 'none' }
    }),
}

    const addressSelect=(address)=>{
        setAddressCheck(1)
        setAddress(address.address1+","+address.address2)
        setCity(address.city)
        setPostCode(address.postcode)
    }


    const handleLoginSubmit = () => {
        if(!isLoggedIn) {
            Router.push('/account/login');
        }
        else {
            setSubmit(1)
            validate()
            if(fnameError === "" && cityError==="" && addressError==="" && postalError ==="" && emailError==="" && numError==="" && fname !== "" && num!=="" && address !=="" && city !== "" && postCode!=="" && countryError === "" && countryId!=="") {
               checkOutApi(fname,lname,address,num,city,postCode,email,productDetail,address1)
            }
        }
    };

    const modalWarning = (type) => {
        notification[type]({
            message: 'Address is required',
            description: 'Enter the address for shipping purpose',
            duration: 3,
        });
    };

    const validate = () => {
        if(submit){
            if(fname === ""){
                setFnameError("Name is required")
            } else {
                setFnameError("")
            }

            if(email===""){
                setMailError("Mail is required!")
              }
              else{
                  if(EmailValidator(email)){
                      setEmailError("")
                  }
                  else {
                      setEmailError("Invalid email")
                  }
              }
            }

            if(num === "") {
                setNumError("Number is required")
            }
            else{
                setNumError("")
            }

            if(address===""){
                setAddressError("Address is required")
            }
            else {
                setAddressError("")
            }

            if(city === "") {
                setCityError("City is required")
            }
            else {
                setCityError("")
            }

            if(countryName === "") {
                setCountryError("Country is required")
            }
            else {
                setCountryError("")
            }

            if(postCode === "") {
                setPostalError("Post code is required")
            }
            else {
                setPostalError("")
            }
    }
    
        return (
            <Form
                className="ps-form--checkout"
                initialValues={{["fname"]:"ddaniel"}}
                fields={fields}>
                    {console.log(countryId)}
                <div className="ps-form__content">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="ps-form__billing-info">
                                <h3 className="ps-form__heading">
                                    {t("contact-info")}
                                </h3>
                                <div className="row">
                                <div className="col-sm-6">
                                  <div className={"form-group"}>
                                    <input type="text" placeholder="First name *" className="form-control" value={fname} onChange={e=>setFname(e.target.value)}/>
                                    {fnameError!==""?<span className="error-span">{fnameError}</span>:""}
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className={"form-group"}>
                                    <input type="text" placeholder="Last name" className="form-control" value={lname} onChange={e=>setLname(e.target.value)}/>
                                  </div>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-sm-6">
                                  <div className={"form-group"}>
                                    <input type="text" placeholder="Email *" className="form-control" value={email} onChange={e=>setEmail(e.target.value)}/>
                                    {emailError!==""?<span className="error-span">{emailError}</span>:""}
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className={"form-group"}>
                                    <input type="number" placeholder="Phone number *" className="form-control" value={num} onChange={e=>e.target.value.length <= 15 && setNum(e.target.value)}/>
                                    {numError!==""?<span className="error-span">{numError}</span>:""}
                                  </div>
                                </div>
                                </div>

                                <h3 className="ps-form__heading">
                                    Shipping address
                                </h3>
                                {addressData&&addressData.length===0?<div>
                                <div className={"form-group"}>
                                    <input type="text" placeholder="Address *" className="form-control" onChange={e=>setAddress(e.target.value)} value={address}/>
                                    {addressError!==""?<span className="error-span">{addressError}</span>:""}
                                  </div>
                                  <div className={"form-group"}>
                                    <input type="text" placeholder="Apartment,suite, etc.(optional)" className="form-control" onChange={e=>setAddress1(e.target.value)} value={address1}/>
                                  </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                    <div className={"form-group"}>
                                    <input type="text" placeholder="City *" className="form-control" onChange={e=>setCity(e.target.value)} value={city}/>
                                    {cityError!==""?<span className="error-span">{cityError}</span>:""}
                                  </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className={"form-group"}>
                                    <input type="number" placeholder="Zip code *" className="form-control" value={postCode} onChange={e=>JSON.stringify(e.target.value).length< 9 && setPostCode(e.target.value)}/>
                                    {postalError!==""?<span className="error-span">{postalError}</span>:""}
                                  </div>
                                    </div>
                                </div>
                                <div className="form-group">
                        <Select
        placeholder="Country *"
          onChange={e=>{setCountryId(e.value);setCountryName(e.label)}}
          isSearchable={true}
          options={arrayComp}
          styles={colourStyles}

        />
         {countryError!==""?<span className="error-span">{countryError}</span>:""}
                    </div>
                                </div>:
                                <div>
                                    {addressData&&addressData.map((address,index)=>{
                                        return(
                                            <div className="address-container" key={index}>
                                       <input type="radio" id={address.addressId} name="drone" onClick={e=>addressSelect(address)} value={address}  className="addr-input"/>
                                       <label for={address.addressId} className="address-custom-label">{address.addressType===0?"Home":"Work"}</label>
                                        <p className="address-paragraph">{address&&address.address1},{address.address2},{address.city},{address.state+":"+address.postcode}</p>
                                    </div>

                                        )
                                    })}

                                    {/* <div className="address-container">
                                       <input type="radio" id="louie" name="drone" value="louie" className="addr-input"/>
                                       <label for="louie">Louie</label>
                                    </div> */}
                                </div>}
                                <div className="ps-form__submit">
                                    <Link href="/account/shopping-cart">
                                        <a>
                                            <i className="icon-arrow-left mr-2"></i>
                                            {t('continue-to-shopcart')}
                                        </a>
                                    </Link>
                                    <div className="ps-block__footer">
                                        <button className={`ps-btn ${currentColor}`} onClick={e=>handleLoginSubmit()}>
                                            Place Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                            <div className="ps-form__orders">
                                <h3>{t('your-order')}</h3>
                                <div className="ps-block--checkout-order">
                                    <div className="ps-block__content">
                                        <figure>
                                            <figcaption>
                                                <strong>{t('product')}</strong>
                                                <strong>{t('total')}</strong>
                                            </figcaption>
                                        </figure>
                                        <figure className="ps-block__items">
                                            {cartItems &&
                                            cartItems.map(product => (
                                                <Link
                                                    href="/"
                                                    key={product.productSlug}>
                                                    <a>
                                                        <strong style={{width:"60%"}}>
                                                            {product.name}
                                                            <span>
                                                                    x
                                                                {
                                                                    product.quantity
                                                                }
                                                                </span>
                                                                <OptionNameDisplay optionName={JSON.parse(product&&product.optionName)}/>
                                                        </strong>
                                                        <small>
                                                        {'$ '}
                                                            {product.quantity *
                                                            product.initialPrice}
                                                        </small>
                                                        
                                                    </a>
                                                </Link>
                                                
                                            ))}
                                        </figure>
                                        <figure>
                                            <figcaption>
                                                <strong>{t('subtotal')}</strong>
                                                <small>{'$ '}{amount}</small>
                                            </figcaption>
                                        </figure>
                                        {/* <figure className="ps-block__shipping">
                                            <h3>Shipping</h3>
                                            <p>Calculated at next step</p>
                                        </figure> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    
}

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps) (FormCheckoutInformation);
