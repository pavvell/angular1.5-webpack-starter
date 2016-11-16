'use strict';

var webpack = require('webpack'),
    precss = require('precss'),
    autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    sassLintPlugin = require('sasslint-webpack-plugin'),
    path = require('path'),
    node_modules_dir = path.resolve(__dirname, './node_modules'),
    dist_path = path.resolve(__dirname, './frontend/build'),
    src_path = path.resolve(__dirname, './frontend/src'),
    NODE_ENV = process.env.NODE_ENV || 'production';

var config = {
  context: src_path,
  entry: {
    project: [
      './js/app.js',
      './scss/styles.scss'
    ],
    vendor: [
      path.resolve(node_modules_dir, 'angular/angular.min.js'),
    ]
  },
  output: {
    path: dist_path,
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].bundle.js'
  },
  externals: {
    angular: 'angular',
  },
  module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: [require.resolve('babel-preset-es2015')]}
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract('style', 'css?-minimize!postcss!resolve-url!sass?sourceMap&includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib'), {publicPath: '../'})
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url?limit=10000&name=images/[name].[ext]',
            },
            {
                test: /\.(otf)$/i,
                loader: 'url?limit=10000&name=fonts/[name].[ext]',
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&minetype=application/font-woff',
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
            },
            {
                test: /\.s?html$/,
                loader: "ngtemplate?relativeTo=" + src_path + "/!html",
            },
        ],
    },
  plugins: [
      new ExtractTextPlugin('css/[name].css'),
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV)
      }),
    ],
  postcss: function () {
      return [precss, autoprefixer];
    },
  resolve: {
      root: [node_modules_dir],
    },
  resolveLoader: {root: [node_modules_dir]}
};

if (NODE_ENV === 'production') {
  // with that option turned on, do not remove '-minimize' from css loader, cause UglifyJsPlugin
  // affects css as well, at least in its current version
  // https://github.com/webpack/webpack/issues/2543
  // https://github.com/postcss/autoprefixer/issues/660
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      },
      sourceMap: false
    })
  )
}

module.exports = config;