import Fs from 'fs';
import Path from 'path';
import reglob from './Library/reglob';
import configuration from '../.gulprc';

configuration.paths = reglob(configuration.paths);

module.exports = configuration;