const path = require('path');
const { env } = require('process');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: 'development',
    entry: './src/client/index.js',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
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
                // STYLES : Sass Processor
                test: /\.s(a|c)ss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            },
            // {
            //   // html configuration
            //   test: /\.html$/,
            //   use: {
            //     loader: "html-loader"
            //   }
            // },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'img',
                            regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.(png|jpe?g|gif|svg)$/i,
                            name(file) {
                                if (module.exports.mode === 'development') {
                                  return '[folder]-[name].[ext]';
                                }

                                return '[contenthash].[ext]';
                            },
                            esModule: false
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            // Simulate the removal of files
            // dry: true,
            // Write Logs to Console
            verbose: true,

            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),

        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),

        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            scriptLoading: 'defer'
        }),
    ],
	resolve: {
		extensions: ['.js', '.jsx', '.scss']
	},
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    }
}
