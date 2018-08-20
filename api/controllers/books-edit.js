
const Book = require('../models/book');

class BooksEdit {

    static async updateBook(ctx) {
        const book = ctx.request.body;
        const [result] = await Book.editItem(book);

        ctx.body = result;
        ctx.status = 200;
    }

}

module.exports = BooksEdit;
