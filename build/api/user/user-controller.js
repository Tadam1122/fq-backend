"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;

var _mongodb = require("mongodb");

async function index(req, res) {
  const client = await _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.rlklw.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority` : 'mongodb://localhost:27017', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  const db = client.db(process.env.MONGO_DBNAME || 'pub-quiz');
  const users = await db.collection('users').find({}).toArray();
  client.close();
  return res.status(204).json(users);
}