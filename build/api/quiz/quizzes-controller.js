"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.index = index;
exports.update = update;
exports.remove = remove;
exports.show = show;

var _mongodb = require("mongodb");

//create quiz
async function create(req, res) {
  const quiz = req.body;
  const client = await _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.rlklw.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority` : 'mongodb://localhost:27017', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  const db = client.db(process.env.MONGO_DBNAME || 'pub-quiz');
  await db.collection('quizzes').insertOne(quiz);
  client.close();
  return res.status(200).json(quiz);
} //list quizzes


async function index(req, res) {
  const client = await _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.rlklw.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority` : 'mongodb://localhost:27017', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  const db = client.db(process.env.MONGO_DBNAME || 'pub-quiz');
  const quizzes = await db.collection('quizzes').find({}).toArray();
  client.close();
  return res.status(200).json(quizzes);
} //update quiz


async function update(req, res) {
  const quiz = req.body;
  const client = await _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.rlklw.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority` : 'mongodb://localhost:27017', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  const db = client.db(process.env.MONGO_DBNAME || 'pub-quiz');
  const quizId = await db.collection('quizzes').findOne({
    topic: quiz.topic
  });
  await db.collection('quizzes').updateOne({
    _id: (0, _mongodb.ObjectId)(quizId._id)
  }, {
    $set: quiz
  });
  client.close();
  return res.status(200).json(quiz);
} //remove quiz


async function remove(req, res) {
  const quizId = req.params.id;
  const client = await _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.rlklw.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority` : 'mongodb://localhost:27017', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  const db = client.db(process.env.MONGO_DBNAME || 'pub-quiz');
  await db.collection('quizzes').deleteOne({
    _id: (0, _mongodb.ObjectId)(quizId)
  });
  client.close();
  return res.status(200).json('Quiz successfully deleted');
} //read single quiz


async function show(req, res) {
  const quizId = req.params.id;
  console.log(quizId);
  console.log(req.params);
  const client = await _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.rlklw.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority` : 'mongodb://localhost:27017', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  const db = client.db(process.env.MONGO_DBNAME || 'pub-quiz');
  const quiz = await db.collection('quizzes').findOne({
    _id: (0, _mongodb.ObjectId)(quizId)
  });
  client.close();

  if (!quiz) {
    return res.status(404).json('Quiz could not be found');
  } else {
    return res.status(200).json(quiz);
  }
}