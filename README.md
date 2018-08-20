# 1win

## Установка

```
// Клонируем
git clone https://github.com/KlimMalgin/1win.git
cd 1win

// Подгружаем сабмодуль с фронтом
git submodule init
git submodule update

// node модули
yarn    // или npm i
```

## Подключение к БД и тестовые данные

Конфиг лежит [здесь](https://github.com/KlimMalgin/1win/blob/master/config.js), правим его. Либо еще можно положить в корень проекта файл `.1winrc` с содержимым ниже и отредактировать параметры:

```
{
    "db" : {
        "host"     : "localhost",
        "user"     : "root",
        "password" : "<your pass>",
        "database" : "1win"
    }
}
```

Ожидается, что в БД `1win` есть одна таблица `books`. [Sql для создания](https://github.com/KlimMalgin/1win/blob/master/sql/books.sql) таблицы.

Когда таблица создана, заполняем ее тестовыми данными:

```
node ./scripts/filldb.js
```

## Запуск 

Теперь нужно запустить команду
```
yarn start    // или npm run start
```
И открыть проект по адресу http://localhost:3006/

