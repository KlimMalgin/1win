const rc = require('rc');

// Конфигурация берется из .1winrc, либо текущая дефолтная
module.exports = rc('1win', {
    db : {
        'host'     : 'localhost',
        'user'     : 'root',
        'password' : '',
        'database' : '1win',
    },
});
