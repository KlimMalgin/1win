
const router = require('koa-router')();

const BooksCreate = require('./controllers/books-create');
const BooksRead = require('./controllers/books-read');
const BooksEdit = require('./controllers/books-edit');

router.get('/api', function getRoot(ctx) {
    const resources = { books: { _uri: '/books' } };

    ctx.body = {
        resources : resources,
        root      : 'api',
    };
});

router.get('/api/books', BooksRead.getBooks);
router.get('/api/books/count', BooksRead.getBooksCount);
router.post('/api/books', BooksCreate.addBook);
router.put('/api/books', BooksEdit.updateBook);


module.exports = router.middleware();
