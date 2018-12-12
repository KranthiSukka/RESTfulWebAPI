//reference:https://jjude.com/hapi-with-tsc/
/// <reference path="../typings/index.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hapi = require("Hapi");
//const server: hapi.Server = new hapi.Server();
var server = new hapi.Server({ port: 3000, host: 'localhost' });
//const server:hapi.Server = new hapi.Server({ port: 3000, host: 'localhost' });
//server.connection({ port: 3000 });
//server.connection({ port: 3000, host: 'localhost' });
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
        return 'Hello, world!';
    }
});
server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, h) {
        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});
process.on('unhandledRejection', function (err) {
    console.log(err);
    process.exit(1);
});
server.start();
