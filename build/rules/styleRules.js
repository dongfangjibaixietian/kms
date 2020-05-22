const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { resolve } = require('./../utils')
const { NODE_ENV } = require('./../constants')
const { cacheLoader, threadLoader } = require('./../loader')

const getLoader = () => {
  if (NODE_ENV === 'development') {
    return 'style-loader'
  } else {
    return MiniCssExtractPlugin.loader
  }
}

/**
 * 开发环境不单独打包css，生产环境单独打包css
 */
const loader = getLoader()

module.exports = [
  {
    test: /\.scss$/,
    use: [
      loader,
      cacheLoader,
      threadLoader(),
      // 'css-modules-typescript-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[local]_[hash:base64:10]',
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [resolve('src/styles')],
        },
      },
    ],
  },
  // antd样式文件
  {
    test: /\.less$/,
    use: [
      loader,
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
  },
  {
    test: /\.css$/,
    include: [resolve('node_modules')],
    use: [loader, 'css-loader'],
  },
]
