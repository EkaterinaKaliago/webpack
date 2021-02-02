const webpack           = require('webpack'),
    path              = require('path'),
    merge             = require('webpack-merge'),
    baseWebpackConfig = require('./webpack.base.config');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
};

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        filename: `js/[name].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,
        port: 8081,
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
});