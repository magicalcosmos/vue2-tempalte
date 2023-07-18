'use strict';
const merge = require('webpack-merge');
const devConfig = require('./webpack.config.dev');

const localConfig = merge(devConfig, {
  devServer: {
    port: 8003
  }
});

module.exports = localConfig;
