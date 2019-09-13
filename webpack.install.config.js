const path = require('path');

const webpack = require('webpack');

// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'development', // production
	entry: './src/independent_components/install/AppInstallConfig.js',
	output: {
		filename: 'install/app.bundle.js',
		path: path.resolve(__dirname, 'public'),
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it uses publicPath in webpackOptions.output
							publicPath: '../',
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					'css-loader',
				],
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					'file-loader',
				],
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: [':data-src']
					}
				}
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			}
		],
	},
	plugins: [
		// new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/independent_components/install/install.html',
			filename: 'install/install.html',
			inject: 'head'
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: 'install/[name].css',
			chunkFilename: 'install/[id].css',
		}),
		new CopyWebpackPlugin([
			{
				from: './src/independent_components/install/*.php',
				to: './install/[name].php',
				toType: 'template'
			}
		]),
		new WebpackBar(),
		// new BundleAnalyzerPlugin(),
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	}
};