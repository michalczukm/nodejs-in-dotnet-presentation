const Hapi = require('hapi');
const converter = require('./convert');
const quote = require('./quote');

const server = Hapi.server({
    port: process.env.PORT || 8000
});

server.route({
    method: 'POST',
    path: '/api/pdf',
    handler: ((request, h) =>
        converter(request.payload)
        .then(stream => h.response(stream)
            .type('application/pdf')
            .header('Content-type', 'application/pdf')
            .header('Content-length', stream.length))
    )
});

server.route({
    method: 'GET',
    path: '/api/quote',
    handler: ((request, h) => 
        h.response(quote(request.query['author']))
    )
});

(async () => {
    try {
        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
})();