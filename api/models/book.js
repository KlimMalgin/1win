
class Book {

    /**
     * Запрос списка книг
     *
     */
    static async getItems(pos, count) {
        return await global.db.query(`select * from books limit ${pos},${count};`);
    }

    /**
     * Добавляет запись о книге в БД
     */
    static async insertItem({ title, author, date, description, image }) {
        return await global.db.query(`insert into books (title, date, author, description, image) values('${title}', '${date}', '${author}', '${description}', '${image}');`);
    }

    /**
     * Редактирует запись о книге
     */
    static async editItem({ id, title, author, date, description, image }) {
        return await global.db.query(`update books set title='${title}', date='${date}', author='${author}', description='${description}', image='${image}' where id=${id};`);
    }

}

module.exports = Book;
