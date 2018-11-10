/**
 * Default dev server configuration
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');

class WebpackDevConfig extends WebpackBaseConfig {
	constructor() {
		super();
		this.config = {
			devtool: 'cheap-module-source-map',
			entry: [
				'webpack-dev-server/client?http://0.0.0.0:8080/',
				'webpack/hot/only-dev-server',
				'react-hot-loader/patch',
				'babel-polyfill',
				'./index.js',
			],
		};

		this.config.plugins = this.config.plugins.concat([
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin(),
		]);

		this.config.module.rules = this.config.module.rules.concat([
			{
				test: /^.((?!cssmodule).)*\.css$/,
				loader: 'style-loader!css-loader!resolve-url-loader',
			},
			{
				test: /^.((?!cssmodule).)*\.(scss|sass)$/,
				loader: 'style-loader!css-loader!resolve-url-loader!sass-loader',
			},
		]);
	}
}

module.exports = WebpackDevConfig;
