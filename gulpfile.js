const { src, dest, series, parallel } = require('gulp');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const postcssVars = require('postcss-simple-vars');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const javascript = () =>
  src('.src/interactions.js')
  .pipe(babel({
    presets: ['@babel/env'],
  }))
  .pipe(dest('.builds'));

const styles = () =>
  src('.src/styling.css')
  .pipe(postcss([
    postcssVars(),
    autoprefixer({
      browsers: ['last 5 version'],
    }),
    cssnano(),
  ]))
  .pipe(dest('.builds'));

exports.javascript = javascript;
exports.styles = styles;

exports.default = parallel(javascript, styles);
