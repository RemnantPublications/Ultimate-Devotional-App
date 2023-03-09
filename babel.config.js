module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './src/Styles',
            rootPathPrefix: '@styles',
          },
          {
            rootPathSuffix: './src/utils',
            rootPathPrefix: '@utils',
          },
          {
            rootPathSuffix: './src/Components',
            rootPathPrefix: '@components',
          },
          {
            rootPathSuffix: './src/constants',
            rootPathPrefix: '@constants',
          },
          {
            rootPathSuffix: './src/theme',
            rootPathPrefix: '@theme',
          },
          {
            rootPathSuffix: './src/Navigation',
            rootPathPrefix: '@navigation',
          },
          {
            rootPathSuffix: './src/Screens',
            rootPathPrefix: '@screens',
          },
          {
            rootPathSuffix: './src/Redux/actions',
            rootPathPrefix: '@actions',
          },
        ],
      },
    ],
  ],
};
