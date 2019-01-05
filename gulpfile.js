const { src, dest, series, parallel } = require('gulp');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const postcssVars = require('postcss-simple-vars');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const inject = require('gulp-inject');

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

const copyHtml = () =>
  src('.src/index.html')
  .pipe(dest('.builds'));

const injectHtml = () =>
  src('.builds/index.html')
  .pipe(
    inject(
      src(
        ['.builds/*.js', '.builds/*.css'],
        { read: false },
      ),
      {
        relative: true,
        removeTags: true,
      },
    ),
  )
  .pipe(dest('.builds'));

const html = series(copyHtml, injectHtml);

exports.javascript = javascript;
exports.styles = styles;
exports.html = html;

exports.default = series(parallel(javascript, styles), html);
