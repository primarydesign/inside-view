import direque from 'require-dir';
/**
 * PEFORMATIVE ROLES
 * * importing
 * * aliasing
 * * interpolating
 * * transforming
 * * optimizing
 */
import imports from 'postcss-import';
/* aliasing */
import media_custom from "postcss-custom-media";
import selectors from 'postcss-custom-selectors';
import easings from 'postcss-easings';
import magician from 'postcss-font-magician';
import media_minmax from 'postcss-media-minmax';
import size from 'postcss-short-size';
import spacing from 'postcss-short-spacing';
/* interpolating */
import mixins from 'postcss-sassy-mixins';
import variables from 'postcss-simple-vars';
import nested from 'postcss-nested';
import extend from 'postcss-extend';
import lookup from 'postcss-property-lookup';
import root from 'postcss-atroot';
/* transforming */
import hexrgba from 'postcss-hexrgba';
import color_alpha from 'postcss-color-alpha';
import color_mix from 'postcss-color-mix';
import time_machine from 'postcss-time-machine';
/* optimizing */
import doiuse from 'doiuse';
import focus from 'postcss-focus';
import matches from "postcss-selector-matches";
import not from "postcss-selector-not";
import autoprefixer from 'autoprefixer';
import mqpacker from "css-mqpacker";
/* logistic */
import reporter from 'postcss-reporter';

module.exports = [
  imports({
    glob: true
  }),
  media_custom,
  selectors,
  time_machine,
  easings,
  magician,
  media_minmax,
  size,
  spacing,
  mixins,
  variables,
  nested,
  extend,
  lookup,
  root,
  matches,
  not,
  hexrgba,
  color_alpha,
  color_mix,
  autoprefixer({browsers: ['ie >= 9', 'last 4 versions']}),
  mqpacker,
  reporter({clearMessages: true})
];

// postcss-import postcss-custom-media postcss-custom-selectors postcss-easings postcss-font-magician postcss-media-minmax postcss-short-size postcss-short-spacing postcss-sassy-mixins postcss-simple-vars postcss-nested postcss-extend postcss-property-lookup postcss-atroot postcss-hexrgba postcss-color-alpha postcss-color-mix postcss-time-machine doiuse postcss-focus postcss-selector-matches postcss-selector-not autoprefixer css-mqpacker postcss-reporter