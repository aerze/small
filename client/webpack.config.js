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
      path.resolve(__dirname, 'src/index.ts')
    ]
  },
  devtool: 'cheap-source-map',
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: './public/',
    filename: 'bundle.js'
  },
  watch: false,
  plugins: [
    definePlugin,
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      open: false,
      server: {
        baseDir: ['./client/public']
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
  ts: {
    configFileName: './tsconfig.json'
  },
  node: {
    fs: "empty"
  },
  externals: {
    'phaser': 'Phaser'
  }
};
