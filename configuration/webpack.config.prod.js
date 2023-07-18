'use strict';
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const pwa = 'src/pwa';
const seen = new Set();
const nameLength = 4;

/**
 * 将window反斜杠路径转为正斜杠路径
 * @date 2022-01-21
 * @param {any} path
 * @return {any}
 */
function slash(path) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);
  const hasNonAscii = /[^\u0000-\u0080]+/.test(path);

  if (isExtendedLengthPath || hasNonAscii) {
    return path;
  }

  return path.replace(/\\/g, '/');
}

const prodConfig = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].js',
    path: path.resolve(process.cwd(), 'dist'),
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          // cacheGroupKey here is `commons` as the key of the cacheGroup
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = slash(module.identifier())
              .split('/')
              .reduceRight(item => item);
            // const allChunksNames = chunks.map(item => item.name).join('~');
            // return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
            return `${cacheGroupKey}-${moduleFileName}`;
          },
          chunks: 'initial'
        }
      }
    },
    minimize: true,
    minimizer: [
      // new TerserPlugin({
      //   terserOptions: {
      //     mangle: true,
      //     keep_classnames: true,
      //     keep_fnames: true,
      //     format: {
      //       comments: false
      //     },
      //     compress: {
      //       // drop_console: true,
      //       // drop_debugger: true
      //     }
      //   }
      // }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      })
      /*new UglifyJsWebpackPlugin({
        uglifyOptions: {
          cache: true,
          ecma: 8,
          parallel: os.cpus().length,
          sourceMap: false,
          warnings: false,
          mangle: {
            keep_classnames: true,
            keep_fnames: true
          },
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})*/
    ]
  },
  resolve: {
    alias: { vue$: 'vue/dist/vue.runtime.esm.js' }
  },
  performance: {
    hints: false
  },
  plugins: [
    // new webpack.NamedChunksPlugin(chunk => {
    //   if (chunk.name) {
    //     return chunk.name;
    //   }
    //   const modules = Array.from(chunk.modulesIterable);
    //   if (modules.length > 1) {
    //     const hash = require('hash-sum');
    //     const joinedHash = hash(modules.map(m => m.id).join(''));
    //     let len = nameLength;
    //     while (seen.has(joinedHash.substr(0, len))) len++;
    //     seen.add(joinedHash.substr(0, len));
    //     return `chunk-${joinedHash.substr(0, len)}`;
    //   } else {
    //     return modules[0].id;
    //   }
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[id].[contenthash:8].css',
      ignoreOrder: true
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
    }),
    new SpeedMeasureWebpackPlugin()
  ]
});

module.exports = prodConfig;
