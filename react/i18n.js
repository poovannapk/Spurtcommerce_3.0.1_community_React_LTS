
// const NextI18Next = require('next-i18next').default;
// const path = require('path')


// const NextI18NextInstance = new NextI18Next({
// 	defaultLanguage: 'en',
//     otherLanguages: ['de', 'fr'],
//     // defaultNS: [],
//     // localeSubpaths,
//     localePath: path.resolve('./public/static/locales')
 
// });

// const {
// 	appWithTranslation,
// 	withTranslation,
// } = NextI18NextInstance;

// module.exports = {
// 	nextI18next: NextI18NextInstance,
// 	appWithTranslation,
// 	withTranslation,
// };


// const i18n=require('i18next');
// const locizeBackend=require('i18next-locize-backend').default;
// const LanguageDetector=require('i18n-browser-languagedetector');
// const locizeOptions=require('./locizeOptions.json')

// const options={
// 	fallbackLng:'en',
// 	load:'languageOnly',
// 	ns:['common'],
// 	defaultNS:'common',
// 	debug:true,
// 	saveMissing:true,

// 	interpolation:{
// 		escapeValue:false,
// 		formSeparator:',',
// 		format:(value,format,lng)=>{
// 			if(format==='uppercase') return value.toUpperCase();
// 			return value
// 		}
// 	},
// 	backend:locizeOptions
// };

// if(process.browser){
// 	i18n
// 	.use(locizeBackend)
// 	.use(LanguageDetector)
// }


// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
// // don't want to use this?
// // have a look at the Quick start guide 
// // for passing in lng and translations on init

// i18n
//   // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
//   // learn more: https://github.com/i18next/i18next-http-backend
//   .use(Backend)
//   // detect user language
//   // learn more: https://github.com/i18next/i18next-browser-languageDetector
//   .use(LanguageDetector)
//   // pass the i18n instance to react-i18next.
//   .use(initReactI18next)
//   // init i18next
//   // for all options read: https://www.i18next.com/overview/configuration-options
//   .init({
//     fallbackLng: 'en',
//     debug: true,

//     interpolation: {
//       escapeValue: false, // not needed for react as it escapes by default
//     }
//   });


// export default i18n;

const NextI18Next = require('next-i18next').default
// const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
const path = require('path')

module.exports = new NextI18Next({
  otherLanguages: ['de','fr'],
  // localeSubpaths,
  localePath: path.resolve('./public/static/locales')
})