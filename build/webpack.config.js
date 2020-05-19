const { resolve } = require('./utils')
const jsRules = require('./rules/jsRules')
const styleRules = require('./rules/styleRules')
const plugins = require('./plugins')
const { FILE_EXTENSIONS } = require('./constants')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    entry: {
        app: resolve('src/index.tsx'),
    },
    output: {
        path: resolve('dist/static'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
    },
    resolve: {
        extensions: FILE_EXTENSIONS,
        alias: {
            '@views': resolve('src/containers/views'),
            '@shared': resolve('src/containers/shared'),
            '@constants': resolve('src/constants'),
            '@services': resolve('src/services'),
            '@store': resolve('src/store'),
            '@utils': resolve('src/utils'),
        },
    },
    module: {
        rules: [...jsRules, ...styleRules],
    },
    plugins: [...plugins],
}
