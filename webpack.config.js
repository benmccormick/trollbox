const webpack = require('webpack');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

const config = {
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
        }, {
            test: /\.css\?global=true$/,
            loader: 'style!css-loader',
        }, {
            test: /\.css$/,
            loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        }]
    },
    output: {
        path: __dirname + '/dist',
        quiet: true,
        publicPath: 'http://localhost:3000/dist/',
        filename: '[name].bundle.js',
    },
    plugins: [
        new DashboardPlugin(dashboard.setData),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js'],
    },
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
