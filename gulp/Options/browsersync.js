import $ from '../configure.js';
import { argv } from 'yargs';

module.exports = {
  server: false,
  proxy: 'http://localhost:8888/inside-view/web/',
  ghostMode: false,
  open: Boolean(argv.u)
    ? 'ui'
    : Boolean(argv.o)
      ? 'local'
      : false,
  browser: Boolean(argv.cross)
    ? ['google chrome', 'firefox', 'safari']
    : 'default',
  notify: false
};
