const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    cache: true
                }
            },
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]

    }
}
