'use strict';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const os = require('os');
const baseConfig = require('./webpack.config.base');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pwa = 'src/pwa';

function getHost() {
  if (os.platform() === 'win32') {
    return '127.0.0.1';
  }
  return '0.0.0.0';
}
const devConfig = merge(baseConfig, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist')
    },
    host: getHost(),
    port: 3003,
    hot: true,
    open: true,
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    https: false, // true for self-signed, object for cert authority
    client: {
      overlay: true
    }
  },
  devtool: 'eval-cheap-module-source-map',
  optimization: {
    splitChunks: {
      // 将多入口的公共部分单独打包
      minChunks: 2,
      cacheGroups: {
        defaultVendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true
        },
        default: false
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[id].css'
      // ignoreOrder: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        path.join(__dirname, '../src/version.json'),
        path.join(__dirname, '../src/config.json'),
        path.join(pwa, 'logo.png'),
        path.join(pwa, 'sw.js'),
        path.join(pwa, 'manifest.json'),
        path.join(__dirname, '../static/img/favicon.ico')
      ]
    })
  ]
});

if (module.hot) {
  console.log('========================='); // eslint-disable-line
  module.hot.accept();
}
module.exports = devConfig;
