const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

let env = process.env.NODE_ENV;
let isProd = env=='production';
let rootPath = path.resolve(__dirname, '../');
let distPath = path.resolve(rootPath, './dist');
let srcPath = path.resolve(rootPath, './src');

module.exports = {
  mode: env,
  target:'web',
  entry: path.join(srcPath,'index.js'),
  devtool:isProd?'none':'source-map',
  output: {
    path: distPath,
    filename: 'js/[name].js',
    publicPath: './'
  },
  devServer: {
    contentBase: distPath,
    compress: true,
    host:'localhost',
    hot:true,
    port: 9000,
    progress:true,
    open: !isProd,
    // https: true,  //启用https服务器
    overlay: true,
    stats:{
      warnings: true,
      errors: true,
      errorDetails: true,
      colors: false,
      performance: true,  //当文件大小超过 `performance.maxAssetSize` 时显示性能提示
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: {"^/api" : ""},
        // secure: false //关闭安全验证，这样可以使用代理服务器不安全的https证书
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isProd?{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
              hmr: !isProd,   //启用热更新
            },
          }:'style-loader',
          'css-loader' 
        ]
      }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
      minify:isProd,
      hash:isProd,
      template:path.join(rootPath,'./public/index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};