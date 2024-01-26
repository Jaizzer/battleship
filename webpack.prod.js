const path = require('path');
const commonConfig = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge.default(commonConfig, {
    mode: 'production',
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'img/[name][hash][ext]',
        clean: true,
    },
});
