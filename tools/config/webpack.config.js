import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import config from './configuration';
import ImageminPlugin from 'imagemin-webpack-plugin';

const exclude = ['node_modules', 'bower_components'];

const webpackConfig = {
  devtool: 'source-map',
  entry: config.mainEntry,
  output: {
    filename: 'index.js',
    path: config.outputDir,
  },
  resolveLoader: {
    fallback: config.nodeModules,
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.html', '.css'],
  },
  stats: {
    chunks: false, // removed noise made by webpack while transpiling
    colors: true,  // green color, yeah green is good
    timings: true,
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        plugins: ['transform-async-to-generator'],
        query: {
          presets: [
            path.join(config.nodeModules, 'babel-preset-es2015'),
            path.join(config.nodeModules, 'babel-preset-react'),
            path.join(config.nodeModules, 'babel-preset-stage-0'),
          ],
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url?name=[path][name].[ext]',
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        exclude,
      },
      { test: /\.styl$/,
        loaders: ['style', 'css', 'stylus'],
      },
      {
        test: /\.html$/,
        loader: 'html!html-minify',
        exclude,
      },
    ],
  },
  plugins: [
    new ImageminPlugin({
      disable: false,
      optipng: {
        optimizationLevel: 3,
      },
      gifsicle: {
        optimizationLevel: 1,
      },
      jpegtran: {
        progressive: false,
      },
      svgo: {
      },
      pngquant: null, // pngquant is not run unless you pass options here
      plugins: [],
    }),
  ],
};

export default webpackConfig;
