
const Book = require('../models/book');

class BooksCreate {

    static async addBook(ctx) {
        const bookInstance = JSON.parse(ctx.request.body);
        const [result] = await Book.insertItem(bookInstance);

        ctx.body = {
            success : true,
            data    : { id: result.insertId },
        };

        ctx.status = 201; // Created
    }

}

module.exports = BooksCreate;
