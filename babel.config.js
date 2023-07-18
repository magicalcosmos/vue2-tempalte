const dev = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: ['last 2 versions', 'ie >= 9']
        },
        useBuiltIns: 'usage',
        corejs: { version: 3 }
      }
    ],
    '@babel/preset-typescript'
  ],
  assumptions: {
    setPublicClassFields: true
  },
  plugins: [
    ['@babel/plugin-transform-runtime', { corejs: false, helpers: true, regenerator: false }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    'transform-vue-jsx',
    [
      '@babel/plugin-transform-modules-commonjs',
      {
        allowTopLevelThis: true
      }
    ]
  ],
  ignore: ['node_modules/**']
};

const test = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        loose: true,
        targets: {
          browsers: ['last 2 versions', 'ie >= 9']
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  assumptions: {
    setPublicClassFields: true
  },
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-object-rest-spread',
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    ['@babel/plugin-proposal-private-methods', { loose: false }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: false }],
    //'@babel/plugin-proposal-class-properties',
    'styled-components',
    'transform-vue-jsx'
  ],
  ignore: ['node_modules/**']
};

module.exports = process && process.env && process.env.RUN_ENV ? dev : test;
