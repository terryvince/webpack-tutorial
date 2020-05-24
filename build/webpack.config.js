const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: '../src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'my-first-webpack.bundle.js',
    publicPath: 'assets'
  }
};