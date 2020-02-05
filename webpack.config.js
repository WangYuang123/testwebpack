// webpack 是node写出来的， 需要使用node写法
let path = require('path') // node内置模块
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css插件
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css文件
let UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩js文件
module.exports = {
 devServer: { // 开发服务器的配置
  port: 3000, // 端口号
  progress: true, // 显示进度条
  contentBase: './dist' // 运行目录
 },
 optimization: {
  minimizer: [
   new OptimizeCSSAssetsPlugin({}),
   new UglifyJsPlugin({})
  ],
},
 mode: 'development', // 模式 production(生产) development(开发)
 entry: './src/index.js', // 入口
 output: {
  filename: 'boundle.js', // 打包后文件名 boundle.[hash:8].js
  path: path.resolve(__dirname, 'dist') // 打包后文件的路径，必须是一个绝对路径, path.resolve()会把相对路径解析成绝对路径
 },
 plugins: [ // 数组，放着所有webpack插件
  new HtmlWebpackPlugin({
   template: './src/index.html',
   filename: 'index.html',
   // minify: { // 压缩
   //  removeAttributeQuotes: true, // 去掉双引号
   //  collapseWhitespace: true, //变成一行
   // },
   hash: true, // 引入文件哈希戳
  }),
  new MiniCssExtractPlugin({
   filename: 'main.css'
  })
 ],
 module: { // 模块
  rules: [ // 规则 css-loader 解析 @import 这种语法
   // style-loader 是把css插入到head标签中
   // loader 特点希望单一
   // loader 的用法 字符串只用一个loader
   //  多个loader 需要 []
   // loader 顺序 默认是从右向左, 从下到上执行
   // loader 还可以写成 对象方式
  // { // 校验eslint 
  //   test: /\.js$/,
  //   use: {
  //     loader: 'eslint-loader',
  //     options: {
  //       enforce: 'pre' // 先检验
  //     }
  //   }
  // },
  {
   test: /\.js$/,
   use: {
    loader: 'babel-loader',
    options: { // es6转换成es5,
     presets: [ // 大插件的集合
      '@babel/preset-env'
     ],
     plugins: [ // 需要用到的小插件
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-runtime'
     ]
    }
   },
   include: path.resolve(__dirname, 'src'), //找src下的js
   exclude: /node_modules/ // 排除 node_modules 下的js
  },
  {
   test: /\.css$/,
   use: [
    // {
    //  loader: 'style-loader'
    // },
    MiniCssExtractPlugin.loader, // 解析完css创建link标签，链接到html中
    'css-loader',
    'postcss-loader' // css 样式添加浏览器前缀
   ]
  },
  {
   test: /\.less$/, // scss stylus 同理   node-sass sass-loader
   // stylus stylus-loader
   use: [
    // {
    //  loader: 'style-loader'
    // },
    MiniCssExtractPlugin.loader, // 解析完css创建link标签，链接到html中
    'css-loader',
    'postcss-loader',
    'less-loader'
   ]
  }

  ]
 }

}