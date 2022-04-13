const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

const nextSettings = {
    exportTrailingSlash: true,
    exportPathMap: function() {
        return {
            '/': { page: '/' },
        };
    },
};

require("dotenv").config({ path: `${process.env.ENVIRONMENT}` });
const webpack = require('webpack')

const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {}

module.exports =withPlugins([[withSass(), withImages()]]),{
    rewrites: async () => nextI18NextRewrites(localeSubpaths),

    webpack: (config, {dev}) => {
        const env = process.env.ENV? process.env.ENV : "development";
        // console.log(dev)
        config.plugins.push(
            new webpack.EnvironmentPlugin(process.env)
          )
        // config.plugins.push(new webpack.EnvironmentPlugin(require('dotenv').config({ path: `./.env.${env}` }))
        // )
        return config
      }
    // publicRuntimeConfig: {
    //   localeSubpaths,
    // },
}

// const NextI18Next = require('next-i18next').default
// const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
// const path = require('path')

// module.exports = new NextI18Next({
//   otherLanguages: ['de'],
//   localeSubpaths,
//   localePath: path.resolve('./public/static/locales')
// })



// module.exports = 
// }