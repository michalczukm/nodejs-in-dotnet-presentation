const randomQuotes = require('random-quotes');

const getQuote = (author) => author
    ? randomQuotes.byAuthor(author)
    : randomQuotes.default();

module.exports = {
    quote: (callback, author) => callback(null, getQuote(author))
}