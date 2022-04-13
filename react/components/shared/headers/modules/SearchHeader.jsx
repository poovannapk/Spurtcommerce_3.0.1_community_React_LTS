/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { useRef } from 'react';
import Router, { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from '../../../../i18n';

function SearchHeader(){
    const [keyword,setKeyword]=useState('')
    const router=useRouter()
    const inputRef = useRef(null);

    let reloadKey=router.query.keyword
    const { t } = useTranslation('common');


    const handleSubmit=(e)=> {
        e.preventDefault();
        const keywords = keyword;
        console.log(keywords)
        if(keywords !== "") {
            Router.push(`/shop?keyword=${keywords}`);
        }
    }

    useEffect(()=>{
        inputRef.current.selectionStart = inputRef.current.value.length;
        inputRef.current.selectionEnd = inputRef.current.value.length;
    },[])

        return (
            <form
                className="ps-form--quick-search"
                method="get"
                action="/"
                onSubmit={e=>handleSubmit(e)}>
                <input
                        ref={inputRef}

                    className="form-control"
                    autoFocus
                    type="text"
                    placeholder={t("search-placeholder")}
                    onChange={e=> setKeyword(e.target.value)}
                    defaultValue={reloadKey!==undefined?reloadKey:""}
                    
                />
                <button onClick={e=>handleSubmit(e)}>{t("search")}</button>
            </form>
        );
}

export default connect(state=> state.product)(SearchHeader);
