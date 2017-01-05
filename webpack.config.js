'use strict';

var path = require('path')
var webpack = require('webpack')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
})

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, 'client/src/index.ts')
    ]
  },
  devtool: 'cheap-source-map',
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'client/dist'),
    publicPath: './client/dist/',
    filename: 'bundle.js'
  },
  watch: true,
  plugins: [
    definePlugin,
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      open: false,
      server: {
        baseDir: ['./client', './build']
      }
    }),

  ],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  node: {
    fs: "empty"
  },
  externals: {
    'phaser': 'Phaser'
  }
};
