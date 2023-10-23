"use strict";
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb+srv://assignment:edviron@cluster1.focovdw.mongodb.net/';
let dbInstance = null;
module.exports.get = async function () {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }
  const db = await MongoClient.connect(MONGODB_URI);
  dbInstance = db.db("test");
  return dbInstance;
}