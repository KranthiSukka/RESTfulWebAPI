//reference:https://jjude.com/hapi-with-tsc/
/// <reference path="../typings/index.d.ts" />

 "use strict";

 import * as hapi from "Hapi";
 
 //const server: hapi.Server = new hapi.Server();
 const server:hapi.Server = new hapi.Server({ port: 3000, host: 'localhost' });
 //const server:hapi.Server = new hapi.Server({ port: 3000, host: 'localhost' });
 //server.connection({ port: 3000 });
//server.connection({ port: 3000, host: 'localhost' });

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello, world!';
    }
});
 
server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

server.start();