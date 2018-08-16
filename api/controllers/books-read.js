
const Book = require('../models/book');
const getParams = require('../../scripts/get-params');

class BooksRead {

    static async getBooks(ctx) {
        const params = getParams(ctx.request.search);
        const [rows] = await Book.getItems(params.offset, params.count);

        ctx.body = rows;
        ctx.body = {
            success : true,
            data    : { rows },
        };

        ctx.status = 200;
    }

}

module.exports = BooksRead;
