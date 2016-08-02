let webpack = require('webpack');
let {merge} = require('lodash');
let baseConfig = require('./webpack.config');

const config = merge(baseConfig, {

    devtool: 'cheap-module-source-map',

    entry: {
        index: './app/index',
        auth: './app/auth',
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            }
        }),
    ],
});

module.exports = config;
