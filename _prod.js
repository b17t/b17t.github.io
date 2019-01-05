const { src, dest, series, parallel } = require('gulp');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const postcssVars = require('postcss-simple-vars');
const autoprefixer = require('autoprefixer');
const inject = require('gulp-inject');
const del = require('del');
const uglify = require('gulp-uglify');
const cssnano = require('cssnano');
const hash = require('gulp-hash-filename');
var git = require('gulp-git');

const {
  GLOBAL_BUILDS,
  CSS_SOURCE,
  JS_SOURCE,
  HTML_SOURCE,
  CSS_PROD_BUILDS,
  JS_PROD_BUILDS,
  HTML_PROD_BUILDS,
} = require('./_filepaths');

const HASHING_OPTIONS = {
	format: '{name}.{hash}{ext}'
};

const javascript = () =>
  src(JS_SOURCE)
  .pipe(babel({
    presets: ['@babel/env'],
  }))
  .pipe(uglify())
  .pipe(hash(HASHING_OPTIONS))
  .pipe(dest(GLOBAL_BUILDS));

const styles = () =>
  src(CSS_SOURCE)
  .pipe(postcss([
    postcssVars(),
    autoprefixer({
      browsers: ['last 5 version'],
    }),
    cssnano(),
  ]))
  .pipe(hash(HASHING_OPTIONS))
  .pipe(dest(GLOBAL_BUILDS));

const copyHtml = () =>
  src(HTML_SOURCE)
  .pipe(dest(GLOBAL_BUILDS));

const injectHtml = () =>
  src(HTML_PROD_BUILDS)
  .pipe(
    inject(
      src(
        [
          CSS_PROD_BUILDS,
          JS_PROD_BUILDS,
          `!${GLOBAL_BUILDS}/_*.js`,
        ],
        { read: false },
      ),
      {
        relative: true,
        removeTags: true,
      },
    ),
  )
  .pipe(dest(GLOBAL_BUILDS))

const html = series(copyHtml, injectHtml);

const removeAssets = () => del([
  CSS_PROD_BUILDS,
  JS_PROD_BUILDS,
  `!${GLOBAL_BUILDS}/_*.js`,
]);

const checkoutFiles = () => src(HTML_PROD_BUILDS).pipe(git.checkoutFiles());

const cleanup = finishCb => series(removeAssets, checkoutFiles)(finishCb);

exports.javascript = javascript;
exports.styles = styles;
exports.html = html;
exports.cleanup = cleanup;

exports.default = series(
  cleanup,
  parallel(javascript, styles),
  html,
);
