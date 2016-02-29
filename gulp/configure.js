import Fs from 'fs';
import Path from 'path';
import reglob from './Library/reglob';
import configuration from '../.gulprc';

export default configuration;
export const paths = reglob(configuration.paths);
