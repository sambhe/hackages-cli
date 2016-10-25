import path from 'path';
import karma from 'karma';
import webpackConfig from './config/webpack.config';
import karmaConfigCI from './config/karma.conf.ci';

const testRunner = (params) => new Promise((resolve, reject) => {
  const { watch, ci } = params.options;

  let options = {
    configFile: path.resolve(__dirname, '../config/karma.conf.js'),
    webpack: webpackConfig,
    singleRun: !watch,
    reporterOptionsOuput: path.resolve(process.cwd(), 'mocha.json'),
  };

  if (ci) {
    options = Object.assign(options, karmaConfigCI);
  }

  // Start the server and run the tests
  new karma.Server(options, (exitCode) => {
    if (exitCode > 0) {
      reject(new Error('Hey, something really bad happened with your tests'));
    } else {
      resolve();
    }
  }).start();

  return resolve();
});

export default testRunner;
