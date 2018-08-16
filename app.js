
const Koa     = require('koa');
const body    = require('koa-body');
const compose = require('koa-compose');

const app = new Koa();

app.use(body({ multipart: true }));

app.use(async function composeSubapp(ctx) {
    const url = ctx.request.url.split('?')[0] || '';
    const target = url.split('/')[1] || '';

    switch (target) {
    case 'api': await compose(require('./api/index.js').middleware)(ctx); break;
    case '': await compose(require('./client/index.js').middleware)(ctx); break;
    }

});

app.listen(3006);
