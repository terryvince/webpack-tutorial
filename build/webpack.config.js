const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  resolve: {
    extensions: ['.js'], // 解析扩展。（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
    alias: {
        '@': srcPath // 在项目中使用@符号代替src路径，导入文件路径更方便
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',  //默认是项目根目录，服务器开启目录即index.html所在目录
    // publicPath:'./dist',
    progress:true,
    compress: isProd,
    host:'localhost',
    hot:true,
    hotOnly:true,
    port: 9000,
    progress:true,
    open: !isProd,
    // https: true,  //启用https服务器
    overlay: true,
    stats:{
      warnings: true,
      errors: true,
      errorDetails: true,
      colors: true,
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
          // isProd?{
          //   loader: MiniCssExtractPlugin.loader,   //生产环境启用css提取
          //   options: {
          //     publicPath: './',
          //     hmr: !isProd,   //启用热更新
          //   },
          // }:
          'style-loader',
          'css-loader' 
        ]
      }
    ]
  },
  plugins:[
    // new CleanWebpackPlugin(),    //编译前清除文件，防止文件冗余
    // new MiniCssExtractPlugin({   //生产环境提取css
    //   filename: 'css/[name].css',
    //   chunkFilename: '[id].css',
    // }),
    new HtmlWebpackPlugin({
      // minify:isProd,
      // hash:isProd,
      template:path.join(rootPath,'public/index.html')
    }),
    new CopyWebpackPlugin({
      patterns:[
        {from:path.resolve(rootPath,'public'),to:distPath}
      ],
      options:{}
    }),
  ]
};