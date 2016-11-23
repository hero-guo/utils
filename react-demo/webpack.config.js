/**
 * Created by Escape on 16/7/11.
 */
var webpack = require('webpack');
var path = require('path'); //用于处理目录的对象
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
  entry: {
    index: path.resolve(__dirname, 'index.js') //相当于不断的调用系统的cd命令
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.styl'],
    root: [
      path.join(__dirname, 'js'),
      path.join(__dirname, 'css')
    ],
    modulesDirectories: [
      'node_modules'
    ]
  },
};
