const path = require('path');

const CSS_BLOB = '*.css';
const JS_BLOB = '*.js';
const HTML_BLOB = '*.html';

const DEV_BUILDS = path.resolve('_builds');
const GLOBAL_SOURCE = path.resolve('_src');
const GLOBAL_BUILDS = path.resolve('.');

const CSS_SOURCE = `${GLOBAL_SOURCE}/${CSS_BLOB}`;
const JS_SOURCE = `${GLOBAL_SOURCE}/${JS_BLOB}`;
const HTML_SOURCE = `${GLOBAL_SOURCE}/${HTML_BLOB}`;

const CSS_BUILDS = `${DEV_BUILDS}/${CSS_BLOB}`;
const JS_BUILDS = `${DEV_BUILDS}/${JS_BLOB}`;
const HTML_BUILDS = `${DEV_BUILDS}/${HTML_BLOB}`;

const CSS_PROD_BUILDS = `${GLOBAL_BUILDS}/${CSS_BLOB}`;
const JS_PROD_BUILDS = `${GLOBAL_BUILDS}/${JS_BLOB}`;
const HTML_PROD_BUILDS = `${GLOBAL_BUILDS}/${HTML_BLOB}`;

exports.DEV_BUILDS = DEV_BUILDS;
exports.GLOBAL_SOURCE = GLOBAL_SOURCE;
exports.GLOBAL_BUILDS = GLOBAL_BUILDS;
exports.CSS_SOURCE = CSS_SOURCE;
exports.JS_SOURCE = JS_SOURCE;
exports.HTML_SOURCE = HTML_SOURCE;
exports.CSS_BUILDS = CSS_BUILDS;
exports.JS_BUILDS = JS_BUILDS
exports.HTML_BUILDS = HTML_BUILDS;
exports.CSS_PROD_BUILDS = CSS_PROD_BUILDS;
exports.JS_PROD_BUILDS = JS_PROD_BUILDS
exports.HTML_PROD_BUILDS = HTML_PROD_BUILDS;
