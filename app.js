
const Koa      = require('koa'); // Koa framework
const body     = require('koa-body'); // body parser
const compose  = require('koa-compose'); // middleware composer
const session  = require('koa-session'); // session for flash messages
const mysql    = require('mysql2/promise'); // fast mysql driver
const debug    = require('debug')('app'); // small debugging utility
const IO = require( 'koa-socket' );

// require('dotenv').config(); // loads environment variables from .env file (if available - eg dev env)

const dbConnection = process.env.DB_CONNECTION || '';

const app = new Koa();
const io = new IO();


io.attach( app );

// -------------


app.use(async function responseTime(ctx, next) {
    const t1 = Date.now();

    await next();
    const t2 = Date.now();

    ctx.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms');
});

// parse request body into ctx.request.body
// - multipart allows parsing of enctype=multipart/form-data
app.use(body({ multipart: true }));

// ------------

app._io.on( 'connection', sock => {
    console.log('кто-то подключился');
});

app.use(async function composeSubapp(ctx) { // note no 'next' after composed subapp

    await compose(require('./app/www/index.js').middleware)(ctx);

    /* switch (ctx.state.subapp) {
    case 'admin': await compose(require('./app-admin/app-admin.js').middleware)(ctx); break;
    case 'api': await compose(require('./app-api/app-api.js').middleware)(ctx); break;
    case 'www': await compose(require('./app-www/app-www.js').middleware)(ctx); break;
    default: // no (recognised) subdomain? canonicalise host to www.host
        // note switch must include all registered subdomains to avoid potential redirect loop
        ctx.redirect(ctx.protocol + '://' + 'www.' + ctx.host + ctx.path + ctx.search);
        break;
    } */
});

// MySQL connection pool (set up on app initialisation)
/*
const dbConfigKeyVal = dbConnection.split(';').map(v => v.trim().split('='));
const dbConfig = dbConfigKeyVal.reduce((config, v) => {
    config[v[0].toLowerCase()] = v[1];

    return config;
}, {});

global.connectionPool = mysql.createPool(dbConfig); // put in global to pass to sub-apps
*/



// module.exports = app;

app.listen(3006);
