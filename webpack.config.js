'use strict';

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = [
{
  //context: path.resolve(__dirname),
  entry:  path.join(__dirname, 'src/client.js'),
  output: {
    path: path.join(__dirname, 'public/js'),
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
      }
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
  //context: path.resolve(__dirname),
  entry:  path.join(__dirname, 'src/server.js'),
  output: {
    path: __dirname,
    filename: 'server.bundle.js',
    //libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ["latest", { "modules": false }],
              "stage-0"
            ]
          }
        }],
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/)
  ],
  //externals: [nodeExternals()]
},
];
