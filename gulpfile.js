const { src, dest, series, parallel } = require('gulp');
const babel = require('gulp-babel');

function transpile() {
  return src('.src/interactions.js', { sourcemaps: true })
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(dest('.builds', { sourcemaps: true }))
}

exports.transpile = transpile;
exports.default = parallel(transpile);
