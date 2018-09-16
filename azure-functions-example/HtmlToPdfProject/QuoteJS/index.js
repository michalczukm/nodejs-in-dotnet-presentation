const randomQuotes = require('random-quotes');

module.exports = async function (context, req) {
    const quote = req.query.author ? randomQuotes.byAuthor(req.query.author) : randomQuotes.default()

    context.res = {
        body: quote,
        headers: {
            'Content-type': 'application/json'
        }
    };
};