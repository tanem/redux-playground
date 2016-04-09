'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {

  devServer: {
    host: 'localhost',
    port: 3000,
    publicPath: '/static/',
    stats: {
      colors: true,
      hash: false,
      version: false,
      assets: true,
      chunks: false
    }
  },

  devtool: 'cheap-module-eval-source-map',

  entry: {
    simple: './examples/simple/index.js',
    thunk: './examples/thunk/index.js',
    'thunk-promise': './examples/thunk-promise/index.js',
    'optimist': './examples/optimist/index.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },

  output: {
    path: path.resolve('examples'),
    filename: '[name].bundle.js',
    publicPath: '/static/'
  }

};