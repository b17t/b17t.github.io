const { src, dest, series, parallel, watch } = require('gulp');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const postcssVars = require('postcss-simple-vars');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const inject = require('gulp-inject');
const connect = require('gulp-connect');
const del = require('del');

const {
  DEV_BUILDS,
  GLOBAL_SOURCE,
  CSS_SOURCE,
  JS_SOURCE,
  HTML_SOURCE,
  CSS_BUILDS,
  JS_BUILDS,
  HTML_BUILDS,
} = require('./_filepaths');

const javascript = () =>
  src(JS_SOURCE)
  .pipe(babel({
    presets: ['@babel/env'],
  }))
  .pipe(dest(DEV_BUILDS))
  .pipe(connect.reload());

const styles = () =>
  src(CSS_SOURCE)
  .pipe(postcss([
    postcssVars(),
    autoprefixer({
      browsers: ['last 5 version'],
    }),
    cssnano(),
  ]))
  .pipe(dest(DEV_BUILDS))
  .pipe(connect.reload());

const copyHtml = () =>
  src(HTML_SOURCE)
  .pipe(dest(DEV_BUILDS));

const injectHtml = () =>
  src(HTML_BUILDS)
  .pipe(
    inject(
      src(
        [ JS_BUILDS, CSS_BUILDS ],
        { read: false },
      ),
      {
        relative: true,
        removeTags: true,
      },
    ),
  )
  .pipe(dest(DEV_BUILDS))
  .pipe(connect.reload());

const html = series(copyHtml, injectHtml);

const server = () => connect.server({
  root: DEV_BUILDS,
  livereload: true,
});

const watcher = () => {
  watch([CSS_SOURCE], styles);
  watch([JS_SOURCE], javascript);
  watch([HTML_SOURCE], html);
};

const cleanup = () => del(DEV_BUILDS);

exports.javascript = javascript;
exports.styles = styles;
exports.html = html;
exports.server = server;
exports.watcher = watcher;
exports.cleanup = cleanup;

exports.default = finishCb =>
  series(
    cleanup,
    parallel(javascript, styles),
    html,
    parallel(server, watcher)
  )(finishCb);
