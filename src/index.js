//reference:https://jjude.com/hapi-with-tsc/
/// <reference path="../typings/index.d.ts" />
"use strict";
exports.__esModule = true;
var hapi = require("hapi");
var server = new hapi.Server();
//const server:hapi.Server = new hapi.Server({ port: 3000, host: 'localhost' });
//const server:hapi.Server = new hapi.Server({ port: 3000, host: 'localhost' });
//server.connection({ port: 3000 });
server.connection({ port: 3000, host: 'localhost' });
server.route({
    method: "GET",
    path: "/",
    handler: function (request, reply) {
        reply("Hello World");
    }
});
server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log("server running at 3000");
});
