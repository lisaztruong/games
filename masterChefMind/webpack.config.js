var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		// file to be loaded onto the page
		game: './game.js'
	},
	output: {
		// compiled js file lives
		path: path.resolve(__dirname, './build'),
		// name of compiled js file
		filename: 'app.bundle.js'
	},
	module: {
		loaders: [
			{
				// translate and compile ES6 with JSX into ES5
				test: /\.js$/,
				loader: 'babel-loader',
				// query config passed to loader
				query: {
					presets: ['react', 'es2015']
				},
				exclude: /node_modules/,
			}
		]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map'
};
