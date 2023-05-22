const {defaults: tsjPreset} = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  verbose: true,
  silent: true,
  preset: 'react-native',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        babelConfig: true,
      },
    ],
  },
  moduleNameMapper: {
    '^\\@geekseat/technical-test/(.*)': '<rootDir>/src/$1',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/fileMock.js',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '\\.snap$'],
  cacheDirectory: '.jest/cache',
};
