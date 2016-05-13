var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var config = {
  entry: [
    './src/index',
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
    }]
  },
  output: {
    path: __dirname + '/dist',
    //publicPath: 'http://localhost:9000/dist/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js'],
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  // ]
};

config.target = webpackTargetElectronRenderer(config);

module.exports = config;
