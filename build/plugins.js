/*
 * @Author       : charm
 * @Date         : 2020-06-28 16:15:01
 * @LastEditors  : charm
 * @LastEditTime : 2020-07-16 13:39:14
 * @FilePath     : \gworld-pc-share\build\plugins.js
 */ 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { NODE_ENV } = require('./constants')
const path = require('path')

module.exports = [
  new HtmlWebpackPlugin({
    template: 'build/tpl/index.html',
    inject: true,
    favicon: path.resolve('favicon.ico'),
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: NODE_ENV === 'development' ? 'css/[name].css' : 'css/[name].[contenthash].css',
    chunkFilename: NODE_ENV === 'development' ? 'css/[name].[id].css' : 'css/[name].[id].[contenthash].css',
  }),
]
