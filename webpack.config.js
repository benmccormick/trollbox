var path = require('path');
var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var config = {
    devtool: 'eval',
    entry: {
        devClient: 'webpack-dev-server/client?http://localhost:3000',
        devServer: 'webpack/hot/only-dev-server',
        index: './app/index',
        auth: './app/auth',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/,
        },{
            test: /\.css$/,
            loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        }]
    },
    output: {
        path: __dirname + '/dist',
        publicPath: 'http://localhost:3000/dist/',
        filename: '[name].bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js'],
    },
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
