/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _live = __webpack_require__(1);

	var _live2 = _interopRequireDefault(_live);

	var _karma = __webpack_require__(11);

	var _karma2 = _interopRequireDefault(_karma);

	var _version = __webpack_require__(17);

	var _version2 = _interopRequireDefault(_version);

	var _webpack = __webpack_require__(19);

	var _webpack2 = _interopRequireDefault(_webpack);

	var _cliparse = __webpack_require__(2);

	var _cliparse2 = _interopRequireDefault(_cliparse);

	var _watchFiles = __webpack_require__(24);

	var _watchFiles2 = _interopRequireDefault(_watchFiles);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import eslint from './linter';
	/**
	* CLI tools: Command line tool
	**/
	// import ci from './ci';


	var cliParser = _cliparse2.default.cli({
	  name: 'hackages|hack <command> [options]',
	  description: 'hackages not hackage like Haskell',
	  commands: [_live2.default, _webpack2.default, _watchFiles2.default, _karma2.default],
	  version: (0, _version2.default)()
	});
	// import deploy from './deploy';


	_cliparse2.default.parse(cliParser);

	exports.default = cliParser;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _cliparse = __webpack_require__(2);

	var _cliparse2 = _interopRequireDefault(_cliparse);

	var _exec = __webpack_require__(3);

	var _exec2 = _interopRequireDefault(_exec);

	var _configuration = __webpack_require__(5);

	var _configuration2 = _interopRequireDefault(_configuration);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var liveCMD = _cliparse2.default.command('live', {
	  description: 'Starting local server on port 8080'
	}, _exec2.default.bind(null, _configuration2.default.liveCMD)); /**
	                                                                 * CLI tools: Starting a live-server instance
	                                                                 **/


	exports.default = liveCMD;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("cliparse");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _child_process = __webpack_require__(4);

	var _configuration = __webpack_require__(5);

	var _configuration2 = _interopRequireDefault(_configuration);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	* CLI tools: execute native commands using child process
	**/


	var execCMD = function execCMD(command) {
	  return new Promise(function (resolve, reject) {
	    var options = {
	      cwd: _configuration2.default.context,
	      stdio: 'inherit',
	      stdin: 'inherit'
	    };

	    var cmd = (0, _child_process.spawn)('node', [command], options);

	    cmd.stdout.on('data', function (data) {
	      console.log(data);
	      resolve(data);
	    });

	    cmd.stderr.on('data', function (data) {
	      console.log(data);
	      resolve(data);
	    });

	    cmd.on('close', function (code) {
	      console.log('child process exited with code ' + code);
	      reject(code);
	    });
	  });
	};

	exports.default = execCMD;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("child_process");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _path = __webpack_require__(6);

	var _path2 = _interopRequireDefault(_path);

	var _utils = __webpack_require__(7);

	var _pathExists = __webpack_require__(9);

	var _pathExists2 = _interopRequireDefault(_pathExists);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var cwd = process.cwd();

	var config = {
	  outputDir: _path2.default.join(cwd, 'dist'),
	  mainEntry: (0, _utils.entry)(),
	  nodeModules: _path2.default.join(__dirname, '../../../node_modules'),
	  // nodeModules: path.join(__dirname, '../node_modules'),
	  context: cwd
	};

	// this fix the issue between global and local install
	if (!_pathExists2.default.sync(config.nodeModules)) {
	  config.nodeModules = _path2.default.join(config.context, 'node_modules');
	}

	config.npmCMD = config.nodeModules + '/npm/bin/npm-cli.js';
	config.liveCMD = config.nodeModules + '/live-server/live-server.js';
	config.deployCMD = config.nodeModules + '/surge/lib/cli.js';

	exports.default = config;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.entry = undefined;

	var _fs = __webpack_require__(8);

	var _fs2 = _interopRequireDefault(_fs);

	var _path = __webpack_require__(6);

	var _path2 = _interopRequireDefault(_path);

	var _pathExists = __webpack_require__(9);

	var _pathExists2 = _interopRequireDefault(_pathExists);

	var _shelljs = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var cwd = process.cwd();

	var getPath = function getPath(file) {
	  var content = _fs2.default.readFileSync(file, 'utf-8');
	  return JSON.parse(content).main;
	};

	// this use index.js by default but you can change that by defining
	// the entry point inside your package.json
	var entry = exports.entry = function entry() {
	  var main = _path2.default.resolve(cwd, 'package.json'); // entry defined inside package.json
	  var index = _path2.default.resolve(cwd, 'index.js');

	  if (_pathExists2.default.sync(index)) {
	    return index;
	  }

	  if (_pathExists2.default.sync(main)) {
	    return './' + getPath(main);
	  }

	  // Hey, we need an entry point!! Let's create one for you
	  (0, _shelljs.touch)('index.js');
	  return index;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("path-exists");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("shelljs");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _cliparse = __webpack_require__(2);

	var _cliparse2 = _interopRequireDefault(_cliparse);

	var _karmaRunner = __webpack_require__(12);

	var _karmaRunner2 = _interopRequireDefault(_karmaRunner);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * CLI tools: Testing with Karma
	 **/


	var testCMD = _cliparse2.default.command('test', {
	  description: 'Running unit tests with Karma',
	  options: [_cliparse2.default.flag('watch', {
	    aliases: ['w'],
	    description: 'Enable auto watch'
	  })]
	}, _karmaRunner2.default);

	exports.default = testCMD;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _path = __webpack_require__(6);

	var _path2 = _interopRequireDefault(_path);

	var _karma = __webpack_require__(13);

	var _karma2 = _interopRequireDefault(_karma);

	var _webpack = __webpack_require__(14);

	var _webpack2 = _interopRequireDefault(_webpack);

	var _karmaConf = __webpack_require__(16);

	var _karmaConf2 = _interopRequireDefault(_karmaConf);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var testRunner = function testRunner(params) {
	  return new Promise(function (resolve, reject) {
	    var _params$options = params.options;
	    var watch = _params$options.watch;
	    var ci = _params$options.ci;


	    var options = {
	      configFile: _path2.default.resolve(__dirname, '../config/karma.conf.js'),
	      webpack: _webpack2.default,
	      singleRun: !watch,
	      reporterOptionsOuput: _path2.default.resolve(process.cwd(), 'mocha.json')
	    };

	    if (ci) {
	      options = Object.assign(options, _karmaConf2.default);
	    }

	    // Start the server and run the tests
	    new _karma2.default.Server(options, function (exitCode) {
	      if (exitCode > 0) {
	        reject(new Error('Hey, something really bad happened with your tests'));
	      } else {
	        resolve();
	      }
	    }).start();

	    return resolve();
	  });
	};

	exports.default = testRunner;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("karma");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _path = __webpack_require__(6);

	var _path2 = _interopRequireDefault(_path);

	var _configuration = __webpack_require__(5);

	var _configuration2 = _interopRequireDefault(_configuration);

	var _imageminWebpackPlugin = __webpack_require__(15);

	var _imageminWebpackPlugin2 = _interopRequireDefault(_imageminWebpackPlugin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var exclude = ['node_modules', 'bower_components'];

	var webpackConfig = {
	  devtool: 'source-map',
	  entry: _configuration2.default.mainEntry,
	  output: {
	    filename: 'index.js',
	    path: _configuration2.default.outputDir
	  },
	  resolveLoader: {
	    fallback: _configuration2.default.nodeModules
	  },
	  resolve: {
	    extensions: ['', '.jsx', '.js', '.html', '.css']
	  },
	  stats: {
	    chunks: false, // removed noise made by webpack while transpiling
	    colors: true, // green color, yeah green is good
	    timings: true
	  },
	  module: {
	    loaders: [{
	      test: /\.(js|jsx)$/,
	      loader: 'babel',
	      exclude: /(node_modules|bower_components)/,
	      plugins: ['transform-async-to-generator'],
	      query: {
	        presets: [_path2.default.join(_configuration2.default.nodeModules, 'babel-preset-es2015'), _path2.default.join(_configuration2.default.nodeModules, 'babel-preset-react'), _path2.default.join(_configuration2.default.nodeModules, 'babel-preset-stage-0')]
	      }
	    }, {
	      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
	      loader: 'url?name=[path][name].[ext]'
	    }, {
	      test: /\.(ttf|eot)$/,
	      loader: 'file'
	    }, {
	      test: /\.json$/,
	      loader: 'json-loader'
	    }, {
	      test: /\.css$/,
	      loaders: ['style', 'css'],
	      exclude: exclude
	    }, { test: /\.styl$/,
	      loaders: ['style', 'css', 'stylus']
	    }, {
	      test: /\.html$/,
	      loader: 'html!html-minify',
	      exclude: exclude
	    }]
	  },
	  plugins: [new _imageminWebpackPlugin2.default({
	    disable: false,
	    optipng: {
	      optimizationLevel: 3
	    },
	    gifsicle: {
	      optimizationLevel: 1
	    },
	    jpegtran: {
	      progressive: false
	    },
	    svgo: {},
	    pngquant: null, // pngquant is not run unless you pass options here
	    plugins: []
	  })]
	};

	exports.default = webpackConfig;

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("imagemin-webpack-plugin");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _path = __webpack_require__(6);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var context = _path2.default.resolve(process.cwd(), 'report'); // Karma configuration for ci


	var configuration = {
	  coverageReporter: {
	    type: 'lcovonly',
	    dir: context,
	    subdir: '.',
	    file: 'lcov.dat'
	  },
	  reporters: ['progress', 'bamboo', 'coverage'],
	  browsers: ['PhantomJS'],
	  singleRun: false
	};

	exports.default = configuration;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _package = __webpack_require__(18);

	var _package2 = _interopRequireDefault(_package);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var version = function version() {
	  return _package2.default.version;
	}; /**
	   * CLI tools: Return the current version of the CLI
	   **/


	exports.default = version;

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = {
		"name": "hackages",
		"version": "0.0.9",
		"description": "cli tools to build fast and scalable applications",
		"main": "tools/parser/index.js",
		"scripts": {
			"pretest": "eslint tools",
			"preci": "rm -rf mocha.json && npm i",
			"ci": "mocha -R mocha-bamboo-reporter",
			"test": "mocha test -w",
			"codecov": "mocha -- -R -spec && codecov",
			"lint": "eslint tools",
			"precommit": "npm run lint",
			"build": "webpack --config webpack.config.js",
			"watch": "watchman tools/ 'npm run babel'",
			"babel": "babel tools/**/*.js -d dist/",
			"webpack": "webpack --config ./webpack.config.js -w",
			"start": "npm-run-all --parallel test watch",
			"predeploy": "npm run build",
			"deploy": "node publish.js"
		},
		"bin": {
			"hackages": "bin/index.js",
			"hack": "bin/index.js"
		},
		"keywords": [
			"angular",
			"react",
			"ampersand",
			"hackages",
			"javascript"
		],
		"author": "davy@hackages.io",
		"homepage": "https://github.com/hackages/hackages",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/hackages/hackages.git"
		},
		"license": "MIT",
		"dependencies": {
			"babel-cli": "^6.6.5",
			"babel-core": "^6.7.4",
			"babel-eslint": "^6.0.2",
			"babel-loader": "^6.2.4",
			"babel-plugin-transform-async-to-generator": "^6.7.4",
			"babel-plugin-transform-runtime": "^6.6.0",
			"babel-polyfill": "^6.7.4",
			"babel-preset-es2015": "^6.6.0",
			"babel-preset-react": "^6.5.0",
			"babel-preset-stage-0": "^6.5.0",
			"babel-register": "^6.7.2",
			"babel-runtime": "^6.6.1",
			"chai": "^3.5.0",
			"chalk": "^1.1.1",
			"cliparse": "^0.2.5",
			"commander": "^2.9.0",
			"css-loader": "^0.23.1",
			"eslint": "^2.5.3",
			"eslint-config-airbnb": "^6.2.0",
			"eslint-loader": "^1.3.0",
			"eslint-plugin-react": "^4.2.3",
			"estraverse": "^4.2.0",
			"estraverse-fb": "^1.3.1",
			"file-loader": "^0.8.5",
			"git-rev": "^0.2.1",
			"html-loader": "^0.4.3",
			"html-minify-loader": "^1.1.0",
			"husky": "^0.11.4",
			"imagemin-webpack-plugin": "^1.0.7",
			"jasmine-core": "^2.4.1",
			"jasmine-expect": "^2.0.2",
			"jasmine-promise-matchers": "^2.0.2",
			"json-loader": "^0.5.4",
			"karma": "^0.13.22",
			"karma-babel-preprocessor": "^6.0.1",
			"karma-bamboo-reporter": "^0.1.2",
			"karma-coverage": "^0.5.5",
			"karma-jasmine": "^0.3.8",
			"karma-mocha": "^0.2.2",
			"karma-mocha-reporter": "^2.0.0",
			"karma-phantomjs-launcher": "^1.0.0",
			"karma-sourcemap-loader": "^0.3.7",
			"karma-webpack": "^1.7.0",
			"live-server": "^0.9.2",
			"mocha": "^2.4.5",
			"mocha-bamboo-reporter": "^1.1.0",
			"npm": "^3.8.6",
			"npm-install-webpack-plugin": "^4.0.3",
			"npm-run-all": "^2.1.1",
			"path-exists": "^2.1.0",
			"phantomjs-prebuilt": "^2.1.6",
			"protractor": "^3.2.2",
			"raw-loader": "^0.5.1",
			"react": "^15.0.0",
			"react-dom": "^15.0.0",
			"shelljs": "^0.7.0",
			"style-loader": "^0.13.1",
			"surge": "^0.17.7",
			"url-loader": "^0.5.7",
			"watchman": "^0.1.8",
			"webpack": "^1.12.14",
			"webpack-node-externals": "^1.0.0"
		},
		"devDependencies": {
			"eslint-watch": "^2.1.11",
			"html-webpack-plugin": "^2.21.0",
			"style-ext-html-webpack-plugin": "^2.0.0-beta.3"
		}
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _cliparse = __webpack_require__(2);

	var _cliparse2 = _interopRequireDefault(_cliparse);

	var _webpackRunner = __webpack_require__(20);

	var _webpackRunner2 = _interopRequireDefault(_webpackRunner);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var buildCMD = _cliparse2.default.command('build', {
	  description: 'Build all your static assets using Webpack',
	  options: [_cliparse2.default.flag('watch', {
	    aliases: ['w'],
	    description: 'Enable auto watch of js files'
	  })]
	}, _webpackRunner2.default);

	exports.default = buildCMD;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _webpack = __webpack_require__(21);

	var _webpack2 = _interopRequireDefault(_webpack);

	var _webpack3 = __webpack_require__(23);

	var _webpack4 = _interopRequireDefault(_webpack3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var webpackRunner = function webpackRunner(params) {
	  return params.options.watch ? (0, _webpack2.default)() : (0, _webpack4.default)();
	};

	exports.default = webpackRunner;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _webpack = __webpack_require__(22);

	var _webpack2 = _interopRequireDefault(_webpack);

	var _webpack3 = __webpack_require__(14);

	var _webpack4 = _interopRequireDefault(_webpack3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	* Watch all the files
	**/
	var watch = function watch() {
	  return new Promise(function (resolve, reject) {
	    var handler = function handler(error, stats) {
	      if (error) {
	        return reject(error);
	      }
	      console.log(stats.toString(_webpack4.default.stats));
	      return resolve();
	    };
	    (0, _webpack2.default)(_webpack4.default).watch({}, handler);
	  });
	};

	exports.default = watch;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _webpack = __webpack_require__(22);

	var _webpack2 = _interopRequireDefault(_webpack);

	var _webpack3 = __webpack_require__(14);

	var _webpack4 = _interopRequireDefault(_webpack3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	* Create application bundles from the source file
	**/

	var bundle = function bundle() {
	  return new Promise(function (resolve, reject) {
	    var handler = function handler(error, stats) {
	      if (error) {
	        return reject(error);
	      }
	      console.log(stats.toString(_webpack4.default.stats));
	      return resolve();
	    };

	    (0, _webpack2.default)(_webpack4.default).run(handler);
	  });
	};

	exports.default = bundle;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _cliparse = __webpack_require__(2);

	var _cliparse2 = _interopRequireDefault(_cliparse);

	var _webpackRunner = __webpack_require__(20);

	var _webpackRunner2 = _interopRequireDefault(_webpackRunner);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var watchCMD = _cliparse2.default.command('watch', {
	  description: 'Watch files using webpack, babel, eslint'
	}, _webpackRunner2.default.bind(null, { options: { watch: true } }));

	exports.default = watchCMD;

/***/ }
/******/ ]);