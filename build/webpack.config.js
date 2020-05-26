const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

let env = process.env.NODE_ENV;
let isProd = env=='production';
let rootPath = path.resolve(__dirname, '../');
let distPath = path.resolve(rootPath, 'dist');
let srcPath = path.resolve(rootPath, 'src');

module.exports = {
  mode: env,
  target:'web',
  entry: path.join(srcPath,'index.js'),
  devtool:isProd?'none':'source-map',
  output: {
    path: distPath,
    filename: 'js/[name].js',
    // publicPath: './'
  },
  devServer: {
    contentBase: './',  //默认是项目根目录，服务器开启目录即index.html所在目录
    // publicPath:'./dist',
    progress:true,
    compress: isProd,
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      minify:isProd,
      hash:isProd,
      template:path.join(rootPath,'public/index.html')
    }),
    new CopyWebpackPlugin({
      patterns:[
        {from:path.resolve(rootPath,'public'),to:distPath}
      ],
      options:{}
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};