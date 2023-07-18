'use strict';
const testConfig = require('./webpack.config.base');
const { merge } = require('webpack-merge');
module.exports = merge(testConfig, {
});
