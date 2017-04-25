var path = require('path');
var webpack = require('webpack');

module.exports = {
  // file to be loaded onto page
    entry: {
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
                test: /\.jsx?$/,
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
    devtool: 'source-map'
  };
