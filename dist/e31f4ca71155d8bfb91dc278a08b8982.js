'use strict';

// Karma configuration file;
var path = require('path');
var context = process.cwd();
var nodeModules = path.resolve(__dirname, '../node_modules');

var localDeps = ['jasmine-expect/dist/jasmine-matchers.js', 'jasmine-promise-matchers/dist/jasmine-promise-matchers.js'].map(function (file) {
  return path.join(nodeModules, file);
});

var externaleDeps = ['test/**/*.spec.js'].map(function (file) {
  return path.join(context, file);
});

var files = localDeps.concat(externaleDeps);
var reporters = ['mocha', 'coverage'];

// preprocessors configuration
var testsFiles = path.resolve(context, 'test/**/*.spec.js');
var scriptsFiles = path.resolve(context, 'scripts/**/test/**/*.spec.js');

// Preprocessors and plugins: webpack and coverage
var preprocessors = {};
var plugins = ['webpack', 'sourcemap'];
preprocessors[testsFiles] = plugins;
preprocessors[scriptsFiles] = plugins;

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: files,
    preprocessors: preprocessors,
    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true
      }
    },
    reporters: reporters,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  });
};