/**
* CLI tools: Return the current version of the CLI
**/
import cli from '../../package.json';

const version = () => cli.version;

export default version;
