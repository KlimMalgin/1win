
const Koa   = require('koa');
const mysql = require('mysql2');
const cfg   = require('../config');

const app = new Koa();


app.use(async function handleErrors(ctx, next) {
    try {
        await next();
    }
    catch (err) {
        ctx.status = err.status || 500;
        switch (ctx.status) {
        case 204: // No Content
            break;
        case 403: // Forbidden
        case 404: // Not Found
        case 406: // Not Acceptable
        case 409: // Conflict
            ctx.body = {
                message : err.message,
                root    : 'error',
            };
            break;
        case 500: // Internal Server Error
        default:
            console.error(ctx.status, err.message);
            ctx.body = {
                message : err.message,
                root    : 'error',
            };
            break;
        }
    }
});

app.use(async function mysqlConnection(ctx, next) {
    const connectionPool = mysql.createPool(cfg.db);

    try {
        ctx.state.db = global.db = connectionPool.promise();

        await next();

        connectionPool.end();
    }
    catch (e) {
        if (connectionPool) {
            connectionPool.end();
        }
        throw e;
    }
});

app.use(require('./routes.js'));


module.exports = app;
