
const Koa      = require('koa');
const body     = require('koa-body');
const compose  = require('koa-compose');
const mysql    = require('mysql2');
const cfg      = require('./config');

const app = new Koa();

// -------------

app.use(async function responseTime(ctx, next) {
    const t1 = Date.now();

    await next();
    const t2 = Date.now();

    ctx.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms');
});

app.use(body({ multipart: true }));

// ------------

app.use(async function composeSubapp(ctx) {

    await compose(require('./client/index.js').middleware)(ctx);

});


global.connectionPool = mysql.createPool(cfg.db);

const promisePool = global.connectionPool.promise();

(async function() {

    try {
        const [rows] = await promisePool.query('select * from test;');

        console.log('rows: \n', rows);
    }
    catch (e) {
        throw new Error(e);
    }

})();


app.listen(3006);
