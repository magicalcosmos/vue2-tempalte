/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ['.'],
  testEnvironment: 'jsdom',
  transform: {
    // process *.vue files with vue-jest
    '.*\\.(vue)$': '@vue/vue2-jest',
    // process TypeScript files
    '^.+\\.(ts|tsx)$': 'ts-jest',
    // process TypeScript files
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleFileExtensions: ["js", "jsx", "json", "vue", "ts", "tsx", "node"],
  moduleNameMapper: {
    '^d3$': '<rootDir>/node_modules/d3/dist/d3.min.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@mixins/(.*)$': '<rootDir>/src/views/components/mixins/$1',
    '^@v/(.*)$': '<rootDir>/src/views/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@img/(.*)$': '<rootDir>/static/img/$1',
    '^@font/(.*)$': '<rootDir>/static/fonts/$1',
    '^@env/(.*)$': '<rootDir>/env/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)(\\?inline)?$': 'jest-transform-stub'
  },
  testMatch: [
    "**/?(*.)+(test).[tj]s?(x)"
  ],
  // serializer for snapshots
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  collectCoverageFrom: [
    'src/components/*.{js,vue,ts,tsx}',
    'src/views/components/*.{js,vue,ts,tsx}',
    'src/utils/*.{js,vue,ts,tsx}',
    '!**/node_modules/**'
  ],
  moduleDirectories: ['node_modules'],
  testURL: 'http://localhost/',
  transformIgnorePatterns: [
    //'/node_modules/(?!d3.*|internmap|delaunator|robust-predicates)'
    '<rootDir>/node_modules/(?!internmap|delaunator|robust-predicates)'
  ],
  testPathIgnorePatterns: ['node_modules', '.history', 'configuration'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
