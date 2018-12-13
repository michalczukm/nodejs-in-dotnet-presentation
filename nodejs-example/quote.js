const randomQuotes = require('random-quotes');

module.exports = (author = undefined) => 
    author
        ? randomQuotes.byAuthor(author) 
        : randomQuotes.default()