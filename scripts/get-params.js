
// Парсит get параметры из url
module.exports = function(query) {
    const params = query.replace('?', '');
    let paramValues = {};

    if (params.length) {
        const pairs = params.split('&');

        pairs.forEach(item => {
            let temp = item.split('=');

            paramValues = {
                [temp[0]] : temp[1],
                ...paramValues,
            };
        });
    }

    return paramValues;
};
