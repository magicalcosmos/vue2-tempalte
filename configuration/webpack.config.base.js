'use strict';
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const postcssPresetEnv = require('postcss-preset-env');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = (process.env.RUN_ENV || '').indexOf('prod') !== -1;

let run_env = {};
if (process.env.RUN_ENV) {
  run_env = require(`./env/${process.env.RUN_ENV}.env.js`);
}

// 根目录
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
// 打包根目录
function assetsPath(dir) {
  return './' + dir;
}
const baseConfig = {
  mode: 'development',
  stats: {
    entrypoints: false,
    children: false
  },
  entry: ['./src/main.ts'],
  output: {
    globalObject: 'this',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              transformToRequire: {
                video: ['src', 'poster'],
                source: 'src',
                img: 'src',
                image: ['xlink:href', 'href'],
                use: ['xlink:href', 'href']
              }
            }
          }
        ]
      },
      {
        oneOf: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
            exclude: /node_modules/
          },
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  // This is a feature of `babel-loader` for webpack (not Babel itself).
                  // It enables caching results in ./node_modules/.cache/babel-loader/
                  // directory for faster rebuilds.
                  cacheDirectory: true,
                  // set it to false -- your project may benefit from this if it transpiles thousands of files.
                  cacheCompression: false
                }
              },
              {
                loader: 'ts-loader',
                options: {
                  // following recommended approach from here:
                  // https://github.com/TypeStrong/ts-loader/tree/master/examples/fast-incremental-builds
                  appendTsxSuffixTo: ['\\.vue$'], // tsx
                  transpileOnly: true,
                  experimentalWatchApi: true
                }
              }
            ]
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              {
                loader: !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
                options: !isProduction
                  ? {}
                  : {
                    // if hmr does not work, this is a forceful method.
                    publicPath: (resourcePath, context) => {
                      // publicPath is the relative path of the resource to the context
                      // e.g. for ./css/admin/main.css the publicPath will be ../../
                      // while for ./css/main.css the publicPath will be ../
                      return path.relative(path.dirname(resourcePath), context) + '/';
                    }
                  }
              },
              {
                loader: 'css-loader'
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [postcssPresetEnv]
                  },
                  sourceMap: true
                }
              },
              'sass-loader',
              {
                loader: 'sass-resources-loader',
                options: {
                  //需要一个全局路径
                  resources: [
                    resolve('src/styles/variables.scss'),
                    resolve('src/styles/function.scss'),
                    resolve('src/theme/default/variables.scss')
                  ]
                }
              }
            ]
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: 'svg-sprite-loader'
                // options: {
                //   symbolId: 'icon-[name]'
                // }
              }
            ],
            include: [resolve('src/icons')]
          },
          {
            test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
            type: 'asset',
            parser: {
              // 转base64的条件
              dataUrlCondition: {
                maxSize: 10 * 1024 // 小于10kb图片资源转为base64
              }
            },
            exclude: [resolve('src/icons')],
            generator: {
              filename: 'static/img/[name].[contenthash:7].[ext]'
            }
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            type: 'asset',
            generator: {
              filename: 'static/media/[name].[contenthash:7].[ext]'
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            type: 'asset',
            generator: {
              filename: 'static/fonts/[name].[contenthash:7].[ext]'
            },
            include: [resolve('static/fonts')]
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.vue', '.json', '.js', '.jsx', '.ts', '.tsx', 'scss'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@v': resolve('src/views'),
      '@styles': resolve('src/styles'),
      '@theme': resolve('src/theme'),
      '@mixins': resolve('src/views/components/mixins'),
      '@img': resolve('static/img'),
      '@font': resolve('static/fonts'),
      '@env': resolve('env')
    },
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify')
    }
  },
  performance: {
    hints: 'warning', // enum
    maxAssetSize: 90000000, // int (in bytes),
    maxEntrypointSize: 90000000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': run_env,
      'process.env.VUE_APP_TEST_ENV': process.env.RUN_ENV === 'unittest' ? true : false
    }),
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'auto'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'static/help/*.*',
          to: './'
        }
      ]
    })
  ]
};
// baseConfig.externals = process.env.NODE_ENV === 'test' ? [require('webpack-node-externals')()] : false;
// baseConfig.devtool = process.env.NODE_ENV === 'test' ? 'inline-cheap-module-source-map' : false;
module.exports = baseConfig;
