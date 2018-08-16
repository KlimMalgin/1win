
const Book = require('../models/book');

class BooksEdit {

    static async updateBook(ctx) {
        let book = JSON.parse(ctx.request.body);

        /* {
            id          : 1,
            title       : 'my new title',
            date        : '2018-04-20',
            author      : 'Klim Malkovich',
            description : 'new descript',
            image       : 'this is image!',
        }; */

        const [result] = await Book.editItem(book);

        ctx.body = result;
        ctx.status = 200;
    }

}

module.exports = BooksEdit;
