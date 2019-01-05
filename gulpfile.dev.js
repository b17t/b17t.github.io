const { src, dest, series, parallel, watch } = require('gulp');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const postcssVars = require('postcss-simple-vars');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const inject = require('gulp-inject');
const connect = require('gulp-connect');

const javascript = () =>
  src('.src/interactions.js')
  .pipe(babel({
    presets: ['@babel/env'],
  }))
  .pipe(dest('.builds'))
  .pipe(connect.reload());

const styles = () =>
  src('.src/styling.css')
  .pipe(postcss([
    postcssVars(),
    autoprefixer({
      browsers: ['last 5 version'],
    }),
    cssnano(),
  ]))
  .pipe(dest('.builds'))
  .pipe(connect.reload());

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
  .pipe(dest('.builds'))
  .pipe(connect.reload());

const html = series(copyHtml, injectHtml);

const server = () => connect.server({
  root: '.builds',
  livereload: true,
});

const watcher = () => {
  watch(['.src/*.css'], styles);
  watch(['.src/*.js'], javascript);
  watch(['.src/*.html'], html);
};

exports.javascript = javascript;
exports.styles = styles;
exports.html = html;
exports.server = server;
exports.watcher = watcher;

exports.default = finishCb =>
  series(parallel(javascript, styles), html, parallel(server, watcher))(finishCb);
