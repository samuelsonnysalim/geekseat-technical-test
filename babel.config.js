module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@geekseat/technical-test': './src',
        },
      },
    ],
  ],
};
