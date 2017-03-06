'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = [
{
  context: path.resolve(__dirname),
  entry:  './src/client.js',
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: 'client.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
        }],
        exclude: [/node_modules/],
      },

      // Loaders for other file types can go here
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
},

{
  target: 'node',
  context: path.resolve(__dirname),
  entry:  './src/server.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'server.bundle.js',
    //libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
        }],
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/)
  ]
},
];
