import path from 'path';
import { entry } from './utils';
import pathExists from 'path-exists';

const cwd = process.cwd();

const config = {
  outputDir: path.join(cwd, 'dist'),
  mainEntry: entry(),
  nodeModules: path.join(__dirname, '../../../node_modules'),
  // nodeModules: path.join(__dirname, '../node_modules'),
  context: cwd,
};

// this fix the issue between global and local install
if (!pathExists.sync(config.nodeModules)) {
  config.nodeModules = path.join(config.context, 'node_modules');
}

config.npmCMD = `${config.nodeModules}/npm/bin/npm-cli.js`;
config.liveCMD = `${config.nodeModules}/live-server/live-server.js`;
config.deployCMD = `${config.nodeModules}/surge/lib/cli.js`;

export default config;
