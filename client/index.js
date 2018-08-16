'use strict';

const Koa   = require('koa');
const serve = require('koa-static');
const app   = new Koa();

app.use(serve('public'));

module.exports = app;
