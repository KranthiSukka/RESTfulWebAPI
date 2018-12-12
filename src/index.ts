//reference:https://jjude.com/hapi-with-tsc/
/// <reference path="../typings/index.d.ts" />

 "use strict";

import * as hapi from "Hapi";
import * as CosmosClient from "@azure/cosmos";
import * as TaskList from "./tasklist";
import * as TaskDao from "./models/taskDao";
const config = require("./config");

const server:hapi.Server = new hapi.Server({ port: 3000, host: 'localhost' });
//Todo App:
const cosmosClient = new CosmosClient.CosmosClient({
    endpoint: config.host,
    auth: {
      masterKey: config.authKey
    }
  });
  const taskDao = new TaskDao.TaskDao(cosmosClient, config.databaseId, config.containerId);
  const taskList = new TaskList.TaskList(taskDao);
  taskDao.init()
    .catch(err => {
      console.error(err);
      console.error("Shutting down because there was an error settinig up the database.");
      process.exit(1);
    });
//get all tasks
server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        taskList.showTasks(request,h);
        //return 'Hello, world!';
    }
});
 
server.route({
    method: 'POST',
    path: '/addtask',
    handler: (request, h) => {
        var data;
        data = taskList.addTask(request,h);
        //return h.response(data).code(200);
        //return "";
        return h.response('created').code(201)
        //return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

server.route({
    method: 'POST',
    path: '/updatetask',
    handler: (request, h) => {
        var data;
        data = taskList.updateTask(request,h);
        return h.response('updated').code(201);
        //return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

server.route({
    method: 'POST',
    path: '/deletetask',
    handler: (request, h) => {
        taskList.updateTask(request,h);
        //return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();