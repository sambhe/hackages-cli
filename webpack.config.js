const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const config = {
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  entry: './tools/typescript/index.ts',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.json']
  },
  plugins: [
    new NpmInstallPlugin({
      save: true,
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel', 'eslint'],
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loaders: ['ts'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json',
      }
    ]
  }
};

config.externals = fs.readdirSync("node_modules")
  .reduce((acc, mod) => {
    if (mod === ".bin") {
      return acc
    }

    acc[mod] = "commonjs " + mod
    return acc
  }, {});

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin);
  config.plugins.push(new webpack.optimize.UglifyJsPlugin);
}

module.exports = config;
