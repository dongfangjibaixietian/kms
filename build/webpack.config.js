const {
  resolve
} = require('./utils')
const jsRules = require('./rules/jsRules')
const styleRules = require('./rules/styleRules')
const fileRules = require('./rules/fileRules')
const plugins = require('./plugins')
const {
  FILE_EXTENSIONS,
  NODE_ENV
} = require('./constants')
const optimization = require('./optimization')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: NODE_ENV,
  entry: {
    app: resolve('src/index.jsx'),
  },
  output: {
    path: resolve('dist'),
    filename: NODE_ENV === 'development' ? 'js/[name].js' : `js/[name].[chunkhash].js`,
    chunkFilename: NODE_ENV === 'development' ? 'js/[name].js' : `js/[name].[id].[chunkhash].js`,
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: FILE_EXTENSIONS,
    modules: [resolve('src'), resolve('node_modules')],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [...jsRules, ...styleRules, ...fileRules],
  },
  optimization,
  plugins: [...plugins],
  devtool: 'source-map',
}