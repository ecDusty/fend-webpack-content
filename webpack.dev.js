const path = require('path');
const { env } = require('process');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './src/client/index.js',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            outputPath: 'js',
                        }
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            cache: true
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'img',
                            regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/i,
                            name(file) {
                                if (module.exports.mode === 'development') {
                                  return '[folder]-[name].[ext]';
                                }

                                return '[contenthash].[ext]';
                            }
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            file: './index.html',
            // publicPath: '/media',
            scriptLoading: 'defer'
        }),

        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}
