const { resolve } = require('./../utils')

module.exports = [
  {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
    include: resolve('src'),
  },
  {
    test: /\.(png|jpe?g|gif)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        },
      },
    ],
  },
]
