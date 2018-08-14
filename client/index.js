'use strict';

const Koa        = require('koa'); // koa framework
const serve      = require('koa-static'); // static file serving middleware

const app = new Koa(); // www app


// serve static files (html, css, js); allow browser to cache for 1 day (note css/js req'd before login)
const maxage = app.env == 'production' ? 1000 * 60 * 60 * 24 : 1000;

app.use(serve('public', { maxage: maxage }));


module.exports = app;
