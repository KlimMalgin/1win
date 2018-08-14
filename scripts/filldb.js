const mysql    = require('mysql2/promise');
const rc       = require('rc');

let cfg = rc('1win', {
    db : {
        'host'     : 'localhost',
        'user'     : 'root',
        'password' : '',
        'database' : '1win',
    },
});

// Сколько записей будет сгенерировано записей
const ROWS_COUNT = 100000;

const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];
const animals = ['Python', 'Elephant', 'Rabbit', 'Bear', 'Eagle', 'Tiger', 'Turtle'];

const authorName = ['Oleg', 'Igor', 'Andrey', 'Linda', 'Jonatan', 'Elizabet'];
const authorSurname = ['Brovchenko', 'Bori', 'Chan', 'Shefer', 'Robbins', 'Kovi'];

const loremIpsum = 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.';
const loremImage = 'https://loremflickr.com/310/460';



(async function main() {
    const connection = await mysql.createConnection(cfg.db);
    const result = await connection.execute(insertSql(ROWS_COUNT));

    console.log(result);

    connection.end();
})();


/**
 * Генерируем sql для вставки
 */
function insertSql(count) {
    let rows = '';

    for (let i = 0; i < count; i++) {
        rows += `('${getTitle()}', '${getDate()}', '${getAuthor()}', '${loremIpsum}', '${loremImage}')${i < count - 1 ? ',' : ''}`;
    }

    return `insert into books (title, date, author, description, image) values${rows}`;
}

/**
 * Вернет рандомное целое число из диапазона [min, max)
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Генерирует заголовок
 */
function getTitle() {
    return `${colors[getRandomInt(0, colors.length)]} ${animals[getRandomInt(0, animals.length)]}`;
}

/**
 * Генерирует дату
 */
function getDate() {
    return `${getRandomInt(1989, 2019)}-${getRandomInt(1, 13)}-${getRandomInt(1, 28)}`;
}

/**
 * Генерирует автора
 */
function getAuthor() {
    return `${authorName[getRandomInt(0, authorName.length)]} ${authorSurname[getRandomInt(0, authorSurname.length)]}`;
}
