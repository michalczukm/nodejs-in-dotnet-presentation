const Hapi = require('hapi');
const converter = require('./convert');

const server = Hapi.server({
    port: process.env.PORT || 8000
});

server.route({
    method: 'POST',
    path: '/',
    handler: ((request, h) =>
        converter(request.payload)
        .then(stream => h.response(stream)
            .type('application/pdf')
            .header('Content-type', 'application/pdf')
            .header('Content-length', stream.length))
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