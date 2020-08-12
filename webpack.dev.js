const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = () => {
	const check = process.env.NODE_ENV === 'development';
	console.log(check);
	return check;
};

console.log(isDevelopment());

module.exports = {
	entry: './src/client/index.js',
	mode: 'development',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist/assets/')
	},
	cache: false,
	devtool: 'source-map',
	devServer: {
		// writeToDisk: true
	},
	module: {
		rules: [
			{
				test: '/\.js$/',
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.s(a|c)ss$/,
				use: [
					isDevelopment() ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isDevelopment()
						}
					}
				]
				// exclude: /\.module.(s(a|c)ss)$/,
			//     loader: [
			//         isDevelopment() ? 'style-loader' : MiniCssExtractPlugin.loader,
			//         'css-loader',
			//         {
			//             loader: 'sass-loader',
			//             options: {
			//                 sourceMap: isDevelopment()
			//             }
			//         }
			//     ]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin({
			// Simulate the removal of files
			dry: false,
			// Write Logs to Console
			verbose: true,
			// Automatically remove all unused webpack assets on rebuild
			cleanStaleWebpackAssets: true,
			protectWebpackAssets: false
		}),
		new BundleAnalyzerPlugin({
			excludeAssets: './node_modules'
		}),
		new MiniCssExtractPlugin({
			filename: isDevelopment() ? '[name].css' : '[name].min.css',
			chunkFilename: isDevelopment() ? '[id].css' : '[id].min.css'
		}),
		new HtmlWebPackPlugin({
			template: "./src/client/views/index.html",
			filename: "./index.html",
		})
	],
	resolve: {
		extensions: ['.js', '.jsx', '.scss']
	}
}
