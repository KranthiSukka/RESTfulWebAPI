// @ts-check
//const CosmosClient = require("@azure/cosmos").CosmosClient;
//const debug = require("debug")("todo:taskDao");

import * as CosmosClient from "@azure/cosmos";

class TaskDao {
  /**
   * Manages reading, adding, and updating Tasks in Cosmos DB
   * @param {CosmosClient} cosmosClient
   * @param {string} databaseId
   * @param {string} containerId
   */
  client: CosmosClient.CosmosClient;
  databaseId: string;
  collectionId: string;
  database: CosmosClient.Database;
  container: CosmosClient.Container;

  constructor(cosmosClient:CosmosClient.CosmosClient,databaseId:string, containerId:string) {
    this.client = cosmosClient;
    this.databaseId = databaseId;
    this.collectionId = containerId;

    this.database = null;
    this.container = null;
  }

  async init() {
    //debug("Setting up the database...");
    const dbResponse = await this.client.databases.createIfNotExists({
      id: this.databaseId
    });
    this.database = dbResponse.database;
    //debug("Setting up the database...done!");
    //debug("Setting up the container...");
    const coResponse = await this.database.containers.createIfNotExists({
      id: this.collectionId
    });
    this.container = coResponse.container;
    //debug("Setting up the container...done!");
  }

  async find(querySpec:any) {
    //debug("Querying for items from the database");
    if (!this.container) {
      throw new Error("Collection is not initialized.");
    }
    const { result: results } = await this.container.items
     .query(querySpec)
     .toArray();
   return results;
 }

 async addItem(item:any) {
   //debug("Adding an item to the database");
   item.date = Date.now();
   item.completed = false;
   const { body: doc } = await this.container.items.create(item);
   return doc;
 }

 async updateItem(itemId:any) {
   //debug("Update an item in the database");
   const doc = await this.getItem(itemId);
   doc.completed = true;

   const { body: replaced } = await this.container.item(itemId).replace(doc);
   return replaced;
 }

 async getItem(itemId:any) {
   //debug("Getting an item from the database");
   const { body } = await this.container.item(itemId).read();
   return body;
 }
}

export {TaskDao};
//module.exports = TaskDao;