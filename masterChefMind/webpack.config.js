var path = require('path');
var webpack = require('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
   template: __dirname + '/reactApp/index.html',
   filename: 'index.html',
   inject: 'body'
});

module.exports = {
  // file to be loaded onto page
    entry: './game.js',
    output: {
      // compiled js file lives
        path: path.resolve(__dirname, 'build'),
        // name of compiled js file
        filename: 'game.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                  presets: ['react', 'es2015']
                },
                exclude: '/node_modules/'
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    plugins: [HTMLWebpackPluginConfig]
};
