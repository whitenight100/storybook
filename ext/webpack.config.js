const fs = require('fs');
const path = require('path');

const entries = fs
  .readdirSync(path.resolve(__dirname, 'theme-webpack-entries'))
  .filter((entry) => entry.match(/\.js$|\.ts$/));

module.exports = {
  mode: 'production',
  target: 'web',
  entry: entries.reduce((acc, entry) => {
    const name = entry.split('.')[0];
    acc[name] = path.resolve(__dirname, 'theme-webpack-entries', entry);
    return acc;
  }, {}),
  output: {
    path: path.resolve(__dirname, 'theme-app-extension', 'assets'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
};
