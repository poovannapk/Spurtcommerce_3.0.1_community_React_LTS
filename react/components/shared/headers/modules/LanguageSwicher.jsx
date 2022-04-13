/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React, { Component, useState } from 'react';
import { notification } from 'antd';
// import {useTranslation} from 'react-i18next';
import { withTranslation } from '../../../../i18n'
import { useEffect } from 'react';

function LanguageSwicher({t,i18n}){
    const [currentLang,setCurrentLang]=useState("") 
    const [countryFlag,setCountryFlag]=useState('')


    useEffect(()=>{
        if(localStorage.getItem("language-spurt")!==null){
            if(localStorage.getItem("language-spurt")==='en'){
                setCurrentLang('english')
                setCountryFlag('/static/img/flag/en.png')
                i18n.changeLanguage('en')


            }
            if(localStorage.getItem("language-spurt")==='de'){
                setCurrentLang('german')
                setCountryFlag('/static/img/flag/germany.png')
                i18n.changeLanguage('de')



            }
            if(localStorage.getItem("language-spurt")==='fr'){
                setCurrentLang('french')
                setCountryFlag('/static/img/flag/fr.png')
                i18n.changeLanguage('fr')



            }
        }
        else{
            setCurrentLang('english')
            setCountryFlag('/static/img/flag/en.png')
            i18n.changeLanguage('en')


        }

    },[])

// }
// class LanguageSwicher extends Component {
//     constructor(props) {
//         super(props);
//     }

    // handleFeatureWillUpdate(e) {
    //     e.preventDefault();
    //     notification.open({
    //         message: 'Opp! Something went wrong.',
    //         description: 'This feature has been updated later!',
    //         duration: 500,
    //     });
    // }

    // render() {
        // const {t, i18n} = useTranslation('common');

	const onChangeLanguage = (language,e,current) => {
        console.log(language)
        e.preventDefault();
        setCurrentLang(current)
        i18n.changeLanguage(language);
        localStorage.setItem("language-spurt",language)

        if(language==='en'){
            // setCurrentLang('english')
            setCountryFlag('/static/img/flag/en.png')
            

        }
        if(language==='de'){
            // setCurrentLang('german')
            setCountryFlag('/static/img/flag/germany.png')


        }
        if(language==='fr'){
            // setCurrentLang('french')
            setCountryFlag('/static/img/flag/fr.png')


        }
    };

    const showLang=(language)=>{
        i18n.changeLanguage(language);

    }
     
        return (
            <div className="ps-dropdown language">
                {/* {console.log(localStorage.getItem("language-spurt"))} */}
                <a href="#" onClick={(e) =>e.preventDefault()}>
                    <img src={countryFlag} alt="martfury" />
                    {t(currentLang)}
                </a>
                <ul className="ps-dropdown-menu">
                <li>
                        <a
                            href="#"
                            onClick={(e) => onChangeLanguage('en',e,'english')}>
                            <img src="/static/img/flag/en.png" alt="martfury" />
                            {t('english')}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => onChangeLanguage('de',e,'german')}>
                            <img src="/static/img/flag/germany.png" alt="martfury" />
                            {t('german')}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => onChangeLanguage('fr',e,'french')}>
                            <img src="/static/img/flag/fr.png" alt="martfury" />
                            {t('french')}
                        </a>
                    </li>
                </ul>
            </div>
        );
    
}

export default withTranslation("common")(LanguageSwicher);

LanguageSwicher.getInitialProps = async () => ({
	namespacesRequired: ['common'],
});
