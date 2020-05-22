const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { NODE_ENV } = require('./constants')

module.exports = [
  new HtmlWebpackPlugin({
    template: 'build/tpl/index.html',
    inject: true,
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: NODE_ENV === 'development' ? 'css/[name].css' : 'css/[name].[contenthash].css',
    chunkFilename: NODE_ENV === 'development' ? 'css/[name].[id].css' : 'css/[name].[id].[contenthash].css',
  }),
]
