/**
* CLI tools: Command line tool
**/
import ci from './ci';
import live from './live';
import deploy from './deploy';
import karma from './karma';
import eslint from './linter';
import version from './version';
import webpack from './webpack';
import cliparse from 'cliparse';
import watchFiles from './watchFiles';

const cliParser = cliparse.cli({
  name: 'hackages|hack <command> [options]',
  description: 'hackages not hackage like Haskell',
  commands: [
    webpack,
    eslint,
    watchFiles,
    ci,
    karma,
    live,
    deploy,
  ],
  version: version(),
});

cliparse.parse(cliParser);

export default cliParser;
