const path = require('path');
const commonConfig = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge.default(commonConfig, {
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'img/[name][hash][ext]',
        clean: false,
    },
});
