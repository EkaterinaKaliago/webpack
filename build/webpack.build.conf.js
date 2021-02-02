const merge             = require('webpack-merge'),
    path              = require('path'),
    baseWebpackConfig = require('./webpack.base.config'),
    ImageminPlugin    = require('imagemin-webpack-plugin').default,
    imageminMozjpeg   = require('imagemin-mozjpeg');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
};

const buildWebpackConfig = merge.merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        filename: `js/[name].js`,
        path: PATHS.dist,
        publicPath: './'
    },
    plugins: [
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {quality: '50'},
            svgo: true,
            plugins: [imageminMozjpeg({quality: '50'})]
        })
    ]
});

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig);
});